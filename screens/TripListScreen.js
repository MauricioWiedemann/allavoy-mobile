import React, { useState,useContext, useEffect } from 'react';
import {FlatList, ActivityIndicator, StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, TextInput, Keyboard,} from 'react-native';
import { NavigationContainer, createStaticNavigation, useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { AuthContext } from '../context/AuthContext';
import axios from "axios";

  export function TripList() {
    const navigation = useNavigation();
    const {login} = useContext(AuthContext);

    const [data, setData] = useState([]);
    const [page, setPages] = useState(1);
    const fechaViaje = '22-05-2025';
    const localidadOrigen = 'Montevideo';
    const localidadDestino = 'Colonia';

    //funciona para obtener los usuarios de la api
    const getdata = () => {
        axios
        .get("https://randomuser.me/api/?page=${page}&results=15")
        .then((res) => {
            setData([...data, ...res.data.results]);
        });
    };

    //funcion que crea la View con los datos de un usuario
    const renderItem = ({ item }) => {
        return (
        <TouchableOpacity
          style={styles.itemBox}
          onPress={() => navigation.navigate('SeatSelecionPage', { trip: item })}
        >
            <View style={styles.contentWrapperStyle}>
                <Text style={styles.txtNameStyle}>
                    Hora Salida: {item.location.city}
                </Text>
                <Text style={styles.txtNameStyle}>
                    Hora Llegada: {item.location.country}
                </Text>
                <Text style={styles.txtNameStyle}>
                    Asientos Disponibles: {item.location.country}
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
                    <Text style={{ fontSize: 20 }}>Origen: {localidadOrigen} -> Destino: {localidadDestino}</Text>
                </Text>
                <Text style={styles.subtitle}>
                    <Text style={{ fontSize: 20 }}>Fecha: {fechaViaje}</Text>
                </Text>
            </View>
          <View style={styles.form}>
                <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.login.uuid}
                onEndReached={loadMoreItem}
                onEndReachedThreshold={0}
                ListFooterComponent={renderLoadingWheel}
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

export default TripList;