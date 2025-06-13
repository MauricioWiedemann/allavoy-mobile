import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL } from "../config";

import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export function CartDetail({ route }) {
  const {
    idViajeIda,
    idViajeVuelta,
    selectedSeatsIda,
    selectedSeats,
    origen,
    destino,
    fechaIda,
    fechaRegreso,
    idaVuelta,
    precio
  } = route.params;
  
  const navigation = useNavigation();
  const {login} = useContext(AuthContext);
  const origenOk = idaVuelta ? destino : origen;
  const destinoOk = idaVuelta ? origen : destino;

  // Estados para hora salida/llegada de ida y vuelta
  const [horaSalidaIda, setHoraSalidaIda] = useState('');
  const [horaLlegadaIda, setHoraLlegadaIda] = useState('');
  const [horaSalidaVuelta, setHoraSalidaVuelta] = useState('');
  const [horaLlegadaVuelta, setHoraLlegadaVuelta] = useState('');

  //hora salida/llegada para ida
  useEffect(() => {
    axios
      .get(`${BASE_URL}/viaje/${idViajeIda}`)
      .then((res) => {
        const viaje = res.data;
        setHoraSalidaIda(viaje.fechaSalida ? viaje.fechaSalida.split('T')[1]?.substring(0, 5) : '');
        setHoraLlegadaIda(viaje.fechaLlegada ? viaje.fechaLlegada.split('T')[1]?.substring(0, 5) : '');
      })
      .catch(() => {
        setHoraSalidaIda('');
        setHoraLlegadaIda('');
      });
  }, [idViajeIda]);

  //hora salida/llegada para vuelta
  useEffect(() => {
    if (!idaVuelta || !idViajeVuelta) return;
    axios
      .get(`${BASE_URL}/viaje/${idViajeVuelta}`)
      .then((res) => {
        const viaje = res.data;
        setHoraSalidaVuelta(viaje.fechaSalida ? viaje.fechaSalida.split('T')[1]?.substring(0, 5) : '');
        setHoraLlegadaVuelta(viaje.fechaLlegada ? viaje.fechaLlegada.split('T')[1]?.substring(0, 5) : '');
      })
      .catch(() => {
        setHoraSalidaVuelta('');
        setHoraLlegadaVuelta('');
      });
  }, [idaVuelta, idViajeVuelta]);

  const handlePayment = async () => {
    try {
      // compra asientos ida
      if (selectedSeatsIda && Array.isArray(selectedSeatsIda)) {
        for (const asiento of selectedSeatsIda) {
          await axios.post(`${BASE_URL}/confirmar-compra`, { 
            numeroAsiento: asiento, 
            idUsuario: login.id, 
            idViaje: idViajeIda, 
            emailComprador: login.email, 
            idPago: "ejemplo12345"
          });
        }
      }

      //compra asientos vuelta
      if (idaVuelta && selectedSeats && Array.isArray(selectedSeats)) {
        for (const asiento of selectedSeats) {
          await axios.post(`${BASE_URL}/confirmar-compra`, { 
            numeroAsiento: asiento, 
            idUsuario: login.id, 
            idViaje: idViajeVuelta, 
            emailComprador: login.email, 
            idPago: "ejemplo12345"
          });
        }
      }

      alert('Exito, compra realizada correctamente');
      navigation.navigate('CompraExitosaScreen');
    } catch (error) {
      Alert.alert('Error', 'No se pudo realizar la compra.');
      //volvemos a la pantalla de inicio?
      //navigation.navigate('SearchScreen');
    }
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
        <Text style={styles.title}>Detalle de Compra</Text>
        <Text style={styles.txtDetail}>
          <Text style={{fontWeight: 'bold'}}>Origen: </Text>
          {origenOk}
          <Text style={{fontWeight: 'bold'}}> {'-'} Destino: </Text>  
          {destinoOk} 
        </Text>
        <Text style={styles.txtDetail}>
          <Text style={{fontWeight: 'bold'}}>Salida: </Text>
          {fechaIda} {horaSalidaIda && `${horaSalidaIda}hs`}
        </Text>
        <Text style={styles.txtDetail}>
          <Text style={{fontWeight: 'bold'}}>Llegada: </Text>
          {fechaIda} {horaLlegadaIda && `${horaLlegadaIda}hs`}
          </Text>
        <Text style={styles.txtDetail}>
          <Text style={{fontWeight: 'bold'}}>Omnibus: </Text>
          {tripIda?.omnibus} 409
          </Text>        
        <Text style={styles.txtDetail}>
          <Text style={{fontWeight: 'bold'}}>Asientos seleccionados: </Text>
          {(idaVuelta
            ? (selectedSeatsIda? selectedSeatsIda.join(', ') : '-')
            : (selectedSeats? selectedSeats.join(', ') : '-')
          )}
        </Text>

        {idaVuelta && (
          <>
            <Text style={[styles.txtDetail, { marginTop: 20 }]}>
              <Text style={{fontWeight: 'bold'}}>Origen: </Text>
              {destinoOk}
              <Text style={{fontWeight: 'bold'}}> {'-'} Destino: </Text>  
              {origenOk}
            </Text>
            <Text style={styles.txtDetail}>
              <Text style={{fontWeight: 'bold'}}>Salida: </Text>
              {fechaRegreso} {horaSalidaVuelta && `${horaSalidaVuelta}hs`}
            </Text>
            <Text style={styles.txtDetail}>
              <Text style={{fontWeight: 'bold'}}>Llegada: </Text>
              {fechaRegreso} {horaLlegadaVuelta && `${horaLlegadaVuelta}hs`}
            </Text>
            <Text style={styles.txtDetail}>
              <Text style={{fontWeight: 'bold'}}>Omnibus: </Text>
              {tripVuelta?.omnibus || '708'}
            </Text>
            <Text style={styles.txtDetail}>
              <Text style={{fontWeight: 'bold'}}>Asientos seleccionados: </Text>
              {selectedSeats && Array.isArray(selectedSeats) ? selectedSeats.join(', ') : '-'}
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
            $50 
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
            ${precio-50}
          </Text>
        </View>

        <View style={styles.formAction}>
          <TouchableOpacity onPress={handlePayment}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Comprar con Paypal</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => navigation.navigate('AppTabs')}>
            <View style={styles.btnCancel} >
              <Text style={styles.btnTextCancel}>Cancelar</Text>
            </View>
          </TouchableOpacity>
        </View>
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
});

export default CartDetail;