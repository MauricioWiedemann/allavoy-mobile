import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { BASE_URL } from "../config";
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import PayPal from 'expo-paypal';

export function CartDetail({ route }) {
  const {
    idViajeIda,
    idViajeVuelta,
    selectedSeatsIda,
    selectedSeatsVuelta,
    origen,
    destino,
    fechaIda,
    fechaRegreso,
    idaVuelta,
    precio,
    omnibusIda,
    omnibusVuelta
  } = route.params;
  
  const navigation = useNavigation();
  const {login} = useContext(AuthContext);

  // Estados para hora salida/llegada de ida y vuelta
  const [viajeIda, setViajeIda] = useState([]);
  const [viajeVuelta, setViajeVuelta] = useState([]);
  const [viajesCargados, setViajesCargados] = useState(false);
  const [descuento, setDescuento] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  //info de viaje ida
  useEffect(() => {
    const onRender = async () => {
      axios
        .post(`${BASE_URL}/viaje/id/${idViajeIda}`)
        .then((res) => {
          setViajeIda(res.data);
        })
        .catch((e) => {
          console.log(e.response.data);
        });
      let userInfoStorage = JSON.parse(await AsyncStorage.getItem('userInfo') );
      axios
        .get(`${BASE_URL}/usuario/descuento?email=${userInfoStorage.email}`)
        .then((res) => {
          if (res.data.tipoDescuento !== "NA")
            setDescuento(0.2);
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    };
    onRender();
  }, []);

  useEffect(() => {
    if (!idaVuelta && viajeIda.length != 0 || idViajeIda && (viajeIda.length != 0 && viajeVuelta.length != 0)){
      setViajesCargados(true);
    }
  }, [viajeIda, viajeVuelta]);

  //info de  viaje vuelta
  useEffect(() => {
    if (!idaVuelta || !idViajeVuelta) return;
    axios
      .post(`${BASE_URL}/viaje/id/${idViajeVuelta}`)
      .then((res) => {
        setViajeVuelta(res.data);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  }, []);

  const sendPayment = async (startProcess) => {
    startProcess()
  };

  const handlePayment = async (idPago) => {
    setIsLoading(true);
    let userInfoStorage = JSON.parse( await AsyncStorage.getItem('userInfo') );
    const idPasajes = [];
    try {
      // compra asientos ida
      if (selectedSeatsIda && Array.isArray(selectedSeatsIda)) {
        for (const asiento of selectedSeatsIda) {
          await axios.post(`${BASE_URL}/pasajes/confirmar-compra`, { 
            numeroAsiento: asiento, 
            idUsuario: userInfoStorage.id, 
            idViaje: idViajeIda, 
            emailComprador: userInfoStorage.email, 
            idPago: idPago
          }).then(response => {
            const data = response.data;
            idPasajes.push(data.idPasaje);
          });
        }
      }

      //compra asientos vuelta
      if (idaVuelta && selectedSeatsVuelta && Array.isArray(selectedSeatsVuelta)) {
        for (const asiento of selectedSeatsVuelta) {
          await axios.post(`${BASE_URL}/pasajes/confirmar-compra`, { 
            numeroAsiento: asiento, 
            idUsuario: userInfoStorage.id, 
            idViaje: idViajeVuelta, 
            emailComprador: userInfoStorage.email, 
            idPago: idPago
          }).then(response => {
            const data = response.data;
            idPasajes.push(data.idPasaje);
          });
        }
      }
      //alert('Exito, compra realizada correctamente');
      navigation.navigate('CompraExitosaScreen', {
        idPasajes: idPasajes
      });
    } catch (error) {
      console.log(error.response.data);
      Alert.alert('Error', 'No se pudo realizar la compra.');
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={require('./../assets/logo.png')}
          />
        </View>
        {viajesCargados && (
        <>
          <Text style={styles.title}>Detalle de Compra</Text>
          <Text style={styles.txtDetail}>
            <Text style={{fontWeight: 'bold'}}>Origen: </Text>
            {viajeIda.origen.nombre}
            <Text style={{fontWeight: 'bold'}}> {'-'} Destino: </Text>  
            {viajeIda.destino.nombre} 
          </Text>
          <Text style={styles.txtDetail}>
            <Text style={{fontWeight: 'bold'}}>Salida: </Text>
            {viajeIda.salida.replace("T", " ")}
          </Text>
          <Text style={styles.txtDetail}>
            <Text style={{fontWeight: 'bold'}}>Llegada: </Text>
            {viajeIda.llegada.replace("T", " ")} 
            </Text>
          <Text style={styles.txtDetail}>
            <Text style={{fontWeight: 'bold'}}>Omnibus: </Text>
            {omnibusIda}
            </Text>        
          <Text style={styles.txtDetail}>
            <Text style={{fontWeight: 'bold'}}>Asientos seleccionados: </Text>
            {(idaVuelta
              ? (selectedSeatsIda? selectedSeatsIda.join(', ') : '-')
              : (selectedSeatsIda? selectedSeatsIda.join(', ') : '-')
            )}
          </Text>
        </>
        )}

        {idaVuelta && viajesCargados && (
          <>
            <Text style={[styles.txtDetail, { marginTop: 20 }]}>
              <Text style={{fontWeight: 'bold'}}>Origen: </Text>
              {viajeVuelta.origen.nombre}
              <Text style={{fontWeight: 'bold'}}> {'-'} Destino: </Text>  
              {viajeVuelta.destino.nombre}
            </Text>
            <Text style={styles.txtDetail}>
              <Text style={{fontWeight: 'bold'}}>Salida: </Text>
              {viajeVuelta.salida.replace("T", " ")}
            </Text>
            <Text style={styles.txtDetail}>
              <Text style={{fontWeight: 'bold'}}>Llegada: </Text>
              {viajeVuelta.llegada.replace("T", " ")}
            </Text>
            <Text style={styles.txtDetail}>
              <Text style={{fontWeight: 'bold'}}>Omnibus: </Text>
              {omnibusVuelta}
            </Text>
            <Text style={styles.txtDetail}>
              <Text style={{fontWeight: 'bold'}}>Asientos seleccionados: </Text>
              {selectedSeatsVuelta && Array.isArray(selectedSeatsVuelta) ? selectedSeatsVuelta.join(', ') : '-'}
            </Text>
          </>
        )}

        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: '50%', marginTop: 50, marginBottom: 0 }}>
          <Text style={[styles.txtDetail, { width: 130 }]}>
            <Text style={{fontWeight: 'bold'}}>SubTotal: </Text>
          </Text>
          <Text style={styles.txtDetail}>
            ${precio}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: '50%', marginTop: 0, marginBottom: 10 }}>
          <Text style={[styles.txtDetail, { width: 130 }]}>
            <Text style={{fontWeight: 'bold'}}>Descuentos: </Text>
          </Text>
          <Text style={styles.txtDetail}>
            ${(precio*descuento)}
          </Text>
        </View>
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'flex-start', 
          marginLeft: '50%', 
          marginTop: 0, 
          marginBottom: 0, 
          borderBottomColor: '#b0b0b0',
          borderWidth: 1,
        }}>

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start',marginLeft: '50%', marginTop: 0, marginBottom: 20 }}>
          <Text style={[styles.txtDetail, { width: 130 }]}>
            <Text style={{fontWeight: 'bold'}}>Total:</Text>
          </Text>
          <Text style={styles.txtDetail}>
            ${precio-(precio*descuento)}
          </Text>
        </View>

        <View style={styles.formAction}>
          <PayPal
            popupContainerStyle={{ height: 500 }}
            onPress={(startProcess) => sendPayment(startProcess)}
            title="Comprar"
            buttonStyles={styles?.btn}
            btnTextStyles={styles?.btnText}
            amount={Number(((precio-(precio*descuento))/40).toFixed(2))}
            success={(a) => { handlePayment(a.orderID); }}
            failed={(a) => { Alert("Error", "Algo ha salido mal.") }}
          />
          <TouchableOpacity
              onPress={() => navigation.navigate('AppTabs')}>
            <View style={styles.btnCancel} >
              <Text style={styles.btnTextCancel}>Cancelar</Text>
            </View>
          </TouchableOpacity>
        </View>
        {isLoading && (
          <>
            <ActivityIndicator size="150" color="#075eec" style={styles.indicator} />
            <View style={styles.loading} />
          </>
        )}
      </ScrollView>
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
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  headerImg: {
    width: 150,
    height: 80,
    alignSelf: 'center',
    marginBottom: -20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#292929',
    textAlign: 'center',
  },
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 6,
  },
  seat: {
    width: 40,
    height: 40,
    backgroundColor: '#e0e7ef',
    borderRadius: 8,
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatSelected: {
    backgroundColor: '#6dc276',
  },
  seatText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    color: '#222',
    textAlign: 'left',
  },
  txtDetail: {
    fontSize: 20,
    marginTop: 10,
    textAlign: 'left',
    color: '#222',
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
    width: '100%'
  },
  btnText: {
    fontSize: 25,
    lineHeight: 26,
    fontWeight: '1000',
    color: '#fff',
  },
  btnCancel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#075eec',
  },
  btnTextCancel: {
    fontSize: 25,
    lineHeight: 25,
    fontWeight: '1000',
    color: '#000000',
  },
  formAction: {
    marginTop: 15,
    marginBottom: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 30,
    gap: 10,
    paddingHorizontal: 20,
  },
  loading: {
    position: 'absolute',
    height: '120%',
    width: '120%',
    backgroundColor: 'black',
    opacity: 0.33,
  },
  indicator: {
    zIndex: 1,
    position: 'absolute',
    left: '36%',
    marginTop: 350,
  },
});

export default CartDetail;