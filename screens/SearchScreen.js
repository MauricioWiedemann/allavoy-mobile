import { useState, useEffect } from 'react';
import {Platform, StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, TextInput, Keyboard, Alert, Linking, ScrollView } from 'react-native'; // <-- agrega ScrollView
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from 'expo-checkbox';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { BASE_URL } from "../config";
import { useNotification } from '../context/NotificationContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

  export function SearchBus() {
    const { expoPushToken, notification, error } = useNotification();
    const navigation = useNavigation();
    const [isChecked, setChecked] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [form, setForm] = useState({
      origen: '',
      destino: '',
      fecha: '',
      cantidad: 1,
      idaVuelta: false,
      fechaRegreso: '',
    });

    // origen
    const [origenOpen, setOrigenOpen] = useState(false);
    const [origenItems, setOrigenItems] = useState([]);
    const [origenValue, setOrigenValue] = useState(null);
    const [loadingOrigen, setLoadingOrigen] = useState(false);
    // destino
    const [destinoOpen, setDestinoOpen] = useState(false);
    const [destinoItems, setDestinoItems] = useState([]);
    const [destinoValue, setDestinoValue] = useState(null);
    const [loadingDestino, setLoadingDestino] = useState(false);
    
    // llamada api para obtener localidades en el dropdown
    useEffect(() => {
      setLoadingOrigen(true);
      setLoadingDestino(true);
      axios.get(`${BASE_URL}/localidad/obtener`)
          .then(res => {
            // Filtra valores vacíos y asegura unicidad
            const localidades = res.data.map((element) => ({ value: `${element.idLocalidad}`, label: `${element.nombre}`.concat(", ").concat((`${element.departamento}`).replace("_", " ")) }));

            setOrigenItems(localidades);
            setDestinoItems(localidades);
            setLoadingOrigen(false);
            setLoadingDestino(false);
          })
          .catch(() => {
            setLoadingOrigen(false);
            setLoadingDestino(false);
          });
      }, []);

    const handleBuscar = () => {
      if (form.origen === '' || form.destino === '' || form.fecha === '' || form.cantidad === '' || (form.idaVuelta && form.fechaRegreso === '')){
        Alert.alert("Error", "Complete todos los campos.");
      } else {
        navigation.navigate('TripListScreen', {
          origen: form.origen,
          destino: form.destino,
          fecha: form.fecha.concat("T00:00"),
          cantidad: form.cantidad,
          idaVuelta: form.idaVuelta,
          fechaRegreso: form.fechaRegreso.concat("T00:00")
      });
      }
    };

    //Ver si el teclado esta abierto o no
        const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
        useEffect(() => {
          const keyboardOpenListener = Keyboard.addListener("keyboardDidShow", () =>
              setIsKeyboardOpen(true)
          );
          const keyboardCloseListener = Keyboard.addListener("keyboardDidHide", () =>
              setIsKeyboardOpen(false)
          );
        })

    const handleWhatsApp = () => {
      const phone = '59893312683';
      const message = 'Hola, necesito ayuda con la app';
      const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;
      Linking.openURL(url).catch(() => {
        alert('No se pudo abrir WhatsApp');
      });
    };

    const findByValue = (key) => {
      for (let pair of origenItems) {
          if(pair.value === key)
            return pair;
      }
    }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={30}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              alt="App Logo"
              resizeMode="contain"
              style={styles.headerImg}
              source={require('./../assets/logo.png')}/>
            <Text style={styles.title}>
              Buscador de viajes
            </Text>
          </View>
          <View style={styles.form}>            
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Origen</Text>
              <DropDownPicker
                open={origenOpen}
                value={origenValue}
                items={origenItems}
                setOpen={setOrigenOpen}
                setValue={val => {
                  setOrigenValue(val());
                  setForm({ ...form, origen: findByValue(val()) });
                }}
                setItems={setOrigenItems}
                searchable={true}
                loading={loadingOrigen}
                placeholder="Selecciona una localidad de origen"
                zIndex={1000}
                style={{marginBottom: origenOpen ? 120 : 10}}
                listMode="SCROLLVIEW"
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Destino</Text>
              <DropDownPicker
                open={destinoOpen}
                value={destinoValue}
                items={destinoItems}
                setOpen={setDestinoOpen}
                setValue={val => {
                  setDestinoValue(val());
                  setForm({ ...form, destino: findByValue(val()) });
                }}
                setItems={setDestinoItems}
                searchable={true}
                loading={loadingDestino}
                placeholder="Selecciona una localidad de destino"
                zIndexInverse={1000}
                zIndex={900}
                style={{marginBottom: destinoOpen ? 120 : 10}}
                listMode="SCROLLVIEW"
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Fecha</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker('ida')}
                style={[styles.inputControl, { justifyContent: 'center' }]}
              >
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={{ color: form.fecha ? '#222' : '#6b7280', fontSize: 15, textAlignVertical: 'center' }}>
                    {form.fecha ? form.fecha.split('T')[0] : 'Seleccionar fecha'}
                  </Text>
                </View>
              </TouchableOpacity>
              {showDatePicker === 'ida' && (
                <DateTimePicker
                  value={form.fecha ? new Date(form.fecha) : new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate >= new Date()){
                      if (selectedDate) {
                        const day = selectedDate.getDate().toString().padStart(2, '0');
                        const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
                        const year = selectedDate.getFullYear();
                        setForm({ ...form, fecha: `${year}-${month}-${day}`, fechaRegreso: `` });
                      }
                    } else {
                      Alert.alert("Error", "La fecha no puede ser menor a la actual.");
                    }
                  }}
                />
              )}
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Cantidad de pasajeros</Text>
              <View style={styles.cantidadRow}>
                <TouchableOpacity
                  style={styles.cantidadBtn}
                  onPress={() => setForm({ ...form, cantidad: Math.max(1, Number(form.cantidad) - 1) })}>
                  <Text style={styles.cantidadBtnText}>-</Text>
                </TouchableOpacity>
                <TextInput
                  autoCapitalize="none"
                  keyboardType="numeric"
                  maxLength={2}
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={cantidad => setForm({ ...form, cantidad })}
                  placeholder="Cantidad de asientos"
                  placeholderTextColor="#6b7280"
                  style={[styles.inputControl, { flex: 1, textAlign: 'center', marginHorizontal: 8 }]}
                  value={String(form.cantidad)}
                />
                <TouchableOpacity
                  style={styles.cantidadBtn}
                  onPress={() => setForm({ ...form, cantidad: Math.min(99, Number(form.cantidad) + 1) })}>
                  <Text style={styles.cantidadBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel} >
                Comprar ida y vuelta
              </Text>
              <CheckBox 
                style={styles.checkbox}
                value={form.idaVuelta || false}
                onValueChange={value => setForm({ ...form, idaVuelta: value })}
                color={form.idaVuelta ? '#4630EB' : undefined}
              />          
            </View>

            {form.idaVuelta && (
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Fecha de regreso</Text>
                <TouchableOpacity
                  onPress={() => setShowDatePicker('regreso')}
                  style={[styles.inputControl, { justifyContent: 'center' }]}
                >
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ color: form.fechaRegreso ? '#222' : '#6b7280', fontSize: 15, textAlignVertical: 'center' }}>
                      {form.fechaRegreso ? form.fechaRegreso.split('T')[0] : 'Seleccionar fecha de regreso'}
                    </Text>
                  </View>
                </TouchableOpacity>
                {showDatePicker === 'regreso' && (
                  <DateTimePicker
                    value={form.fechaRegreso ? new Date(form.fechaRegreso) : new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate > new Date(form.fecha)){
                        if (selectedDate) {
                          const day = selectedDate.getDate().toString().padStart(2, '0');
                          const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
                          const year = selectedDate.getFullYear();
                          setForm({ ...form, fechaRegreso: `${year}-${month}-${day}` });
                        }
                      } else {
                        Alert.alert("Error", "La fecha no puede ser menor a la de ida.");
                      }
                    }}
                  />
                )}
              </View>
            )}

            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleBuscar}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Buscar</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.whatsappButtonTop}
          onPress={handleWhatsApp}
          activeOpacity={0.8}
        >
          <Image
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png' }}
            style={styles.whatsappIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      padding: 24,
    },
    title: {
      fontSize: 35,
      fontWeight: '700',
      color: '#1D2A32',
      marginBottom: 3,
    },
    subtitle: {
      fontSize: 15,
      fontWeight: '500',
      color: '#929292',
    },
    header: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 30,
    },
    headerImg: {
      width: 250,
      height: 180,
      alignSelf: 'center',
      marginBottom: 10,
    },
    form: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
    },
    formAction: {
      marginTop: 5,
      marginBottom: 15,
    },
    input: {
      marginBottom: 10,
    },
    inputLabel: {
      fontSize: 15,
      fontWeight: '600',
      color: '#222',
      marginBottom: 0,
    },
    inputControl: {
      height: 50,
      backgroundColor: '#fff',
      paddingHorizontal: 16,
      borderRadius: 12,
      fontSize: 15,
      color: '#222',
      borderWidth: 2,
      borderColor: '#C9D3DB',
      borderStyle: 'solid',
    },
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderWidth: 1,
      backgroundColor: '#075eec',
      borderColor: '#075eec',
      marginTop: 25
    },
    btnText: {
      fontSize: 25,
      lineHeight: 26,
      fontWeight: '1000',
      color: '#fff',
    },
    checkbox: {
      alignItems: 'center',
  },
    cantidadRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cantidadBtn: {
    backgroundColor: '#e0e7ef',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cantidadBtnText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#075eec',
  },
  whatsappButtonTop: {
    position: 'absolute',
    top: 50, 
    right: 20, 
    backgroundColor: '#25D366',
    borderRadius: 35,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 999,
  },
  whatsappIcon: {
    width: 38,
    height: 38,
  },
  });

export default SearchBus;