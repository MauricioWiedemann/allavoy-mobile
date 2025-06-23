import React, { useState,useContext, useEffect } from 'react';
import {FlatList, ActivityIndicator, StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, TextInput, Keyboard, Alert } from 'react-native';
import { NavigationContainer, createStaticNavigation, useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { AuthContext } from '../context/AuthContext';
import axios from "axios";
import { BASE_URL } from "../config";

  export default function TripList({ route }) {
  const {
    origen,
    destino,
    fecha,
    cantidad,
    idaVuelta,
    fechaRegreso,
    selectedSeatsIda,
    selectedSeatsVuelta,
    precio,
    idViajeIda,
    fechaIda,
    omnibusIda,
    omnibusVuelta
  } = route.params;

    const navigation = useNavigation();
    const {login} = useContext(AuthContext);

    const [data, setData] = useState([]);
    const [page, setPages] = useState(1);
    const fechaViaje = fecha;
    const localidadOrigen = origen;
    const localidadDestino = destino;

    useEffect(() => {
      getdata();
    }, [fechaViaje]);

    //api viajes
    const getdata = () => {
      axios.post(`${BASE_URL}/viaje/buscar`, {
        origen: localidadOrigen,
        destino: localidadDestino,
        fecha: fechaViaje,
        cantidad: cantidad,
      }).then((res) => {
        setData(res.data);
      }).catch(e => {
        Alert.alert('Error', e.response.data.message);
      });
    };

    const renderItem = ({ item }) => {

    const horaSalida = item.fechaSalida ? item.fechaSalida.split('T')[1]?.substring(0, 5) : '';
    const horaLlegada = item.fechaLlegada ? item.fechaLlegada.split('T')[1]?.substring(0, 5) : '';
    const asientosDisponibles = item.cantidad - item.cantidadOcupados;

    return (
      <TouchableOpacity
        style={styles.itemBox}
        onPress={() => {
          // elegir viaje de ida cuando idaVuelta es true
          if (idaVuelta && !selectedSeatsIda) {
            let precioIda = cantidad * item.precio;
            navigation.navigate('SeatSelecionPage', {
              idViajeIda: item.idViaje,
              asientosOcupados: item.asientosOcupados,
              origen: localidadOrigen,
              destino: localidadDestino,
              fechaIda: fechaViaje,
              cantidad,
              idaVuelta,
              fechaRegreso: fechaRegreso,
              selectedSeatsIda,
              selectedSeatsVuelta,
              precio: precioIda,
              capacidadOmnibus: item.omnibus.capacidad,
              omnibusIda: item.omnibus.matricula,
              omnibusVuelta,
            });
          }
          //elegir asientos vuelta
          else if (idaVuelta && selectedSeatsIda) {
            let precioVuelta = precio + (cantidad * item.precio);
            navigation.navigate('SeatSelecionPage', {
              idViajeIda: idViajeIda,
              idViajeVuelta: item.idViaje,
              asientosOcupados: item.asientosOcupados,
              origen,
              destino,
              fechaIda,
              cantidad,
              idaVuelta,
              fechaRegreso: fechaRegreso,
              selectedSeatsIda,
              selectedSeatsVuelta,
              precio: precioVuelta,
              capacidadOmnibus: item.omnibus.capacidad,
              omnibusIda,
              omnibusVuelta: item.omnibus.matricula
            });
          }
          //solo ida
          else {
            let precioIda = cantidad * item.precio;
            navigation.navigate('SeatSelecionPage', {
              idViajeIda: item.idViaje,
              asientosOcupados: item.asientosOcupados,
              origen: localidadOrigen,
              destino: localidadDestino,
              fechaIda: fechaViaje,
              cantidad,
              idaVuelta,
              fechaRegreso,
              selectedSeatsIda,
              precio: precioIda,
              capacidadOmnibus: item.omnibus.capacidad,
              omnibusIda: item.omnibus.matricula
            });
          }
        }}
      >
        <View style={styles.contentWrapperStyle}>
          <Text style={styles.txtNameStyle}>
            Hora Salida: {horaSalida}
          </Text>
          <Text style={styles.txtNameStyle}>
            Hora Llegada: {horaLlegada}
          </Text>
          <Text style={styles.txtNameStyle}>
            Asientos Disponibles: {asientosDisponibles}
          </Text>
          <Text style={styles.txtNameStyle}>
            Precio por pasaje: ${item.precio}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

    //funcion que muestra la rueda de carga mientras se buscan los datos
    const renderLoadingWheel = () => {
        return (
        <View style={styles.loaderStyle}>
            <ActivityIndicator size="large" />
        </View>
        );
    };

    //funacion que carga un nuevo item
    const loadMoreItem = () => {
        setPages(page + 1);
    };

    //llamar a la funcion getdata() cada vez que cambia page
    useEffect(() => {
        getdata();
    }, [page]);

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


    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              alt="App Logo"
              resizeMode="contain"
              style={styles.headerImg}
              source={require('./../assets/logo.png')}/>
          </View>
          <Text style={styles.title}>Resultados de Viajes</Text>
            <View style={styles.formAction}>
                <Text style={styles.subtitle}>
                    <Text style={{ fontSize: 20 }}>Origen: {localidadOrigen} -{'>'} Destino: {localidadDestino}</Text>
                </Text>
                <Text style={styles.subtitle}>
                    <Text style={{ fontSize: 20 }}>Fecha: {fechaViaje.replace("T", " ")}</Text>
                </Text>
            </View>
          <View style={styles.form}>
                <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.idViaje}
                onEndReached={loadMoreItem}
                onEndReachedThreshold={0}
                />
          </View>
        </View>
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
      marginBottom: 0,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 15,
      fontWeight: '500',
      color: '#929292',
    },
    /** Header */
    header: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 30,
    },
    headerImg: {
      width: 150,
      height: 80,
      alignSelf: 'center',
      marginBottom: 0,
    },
    /** Form */
    form: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
    },
    formAction: {
      marginTop: 10,
      marginBottom: 10,
    },
    formLink: {
      fontSize: 16,
      fontWeight: '600',
      color: '#075eec',
      textAlign: 'center',
    },
    formFooter: {
      paddingVertical: 24,
      fontSize: 15,
      fontWeight: '600',
      color: '#222',
      textAlign: 'center',
      letterSpacing: 0.15,
    },
    /** Input */
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
      fontWeight: '500',
      color: '#222',
      borderWidth: 1,
      borderColor: '#C9D3DB',
      borderStyle: 'solid',
    },
    /** Button */
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
    },
    btnText: {
      fontSize: 25,
      lineHeight: 26,
      fontWeight: '1000',
      color: '#fff',
    },
    /** Item Box */
    itemBox: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 0,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemImageStyle: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 16,
    },
    contentWrapperStyle: {
      flex: 1,
    },
    txtNameStyle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#222',
    },
    txtCountryStyle: {
      fontSize: 15,
      color: '#666',
    },
  });