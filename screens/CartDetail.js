import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

import { AuthContext } from '../context/AuthContext';
import { NavigationContainer, createStaticNavigation, useNavigation } from '@react-navigation/native';


export function CartDetail({ route }) {
  const { trip, selectedSeats } = route.params;
  
  const navigation = useNavigation();
  const {login} = useContext(AuthContext);

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
          {trip.origen} Montevideo 
        </Text>
        <Text style={styles.txtDetail}>
          <Text style={{fontWeight: 'bold'}}>Destino: </Text>
          {trip.destino} Canelones
          </Text>
        <Text style={styles.txtDetail}>
          <Text style={{fontWeight: 'bold'}}>Salida: </Text>
          {trip.fecha_salida} 12/7/2025 18:20hs
          </Text>
        <Text style={styles.txtDetail}>
          <Text style={{fontWeight: 'bold'}}>Llegada: </Text>
          {trip.fecha_llegada} 12/7/2025 19:30hs
          </Text>
        <Text style={styles.txtDetail}>
          <Text style={{fontWeight: 'bold'}}>Omnibus: </Text>
          {trip.omnibus} 409
          </Text>        
        <Text style={styles.txtDetail}>
          <Text style={{fontWeight: 'bold'}}>Asientos seleccionados: </Text>
          {selectedSeats.join(', ')}
        </Text>



        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: '50%', marginTop: 50, marginBottom: 0 }}>
          <Text style={[styles.txtDetail, { width: 130 }]}>
            <Text style={{fontWeight: 'bold'}}>SubTotal: </Text>
          </Text>
          <Text style={styles.txtDetail}>
            ${trip.origen} 1500 
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: '50%', marginTop: 0, marginBottom: 10 }}>
          <Text style={[styles.txtDetail, { width: 130 }]}>
            <Text style={{fontWeight: 'bold'}}>Descuentos: </Text>
          </Text>
          <Text style={styles.txtDetail}>
            ${trip.origen} 50 
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
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start',marginLeft: '50%', marginTop: 0, marginBottom: 100 }}>
          <Text style={[styles.txtDetail, { width: 130 }]}>
            <Text style={{fontWeight: 'bold'}}>Total:</Text>
          </Text>
          <Text style={styles.txtDetail}>
            $1450
          </Text>
        </View>

        <View style={styles.formAction}>
          <TouchableOpacity 
            onPress={() => {forgotPass(form.email)}}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Comprar con Paypal</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.formAction}>
          <TouchableOpacity
              onPress={() => navigation.navigate('SearchScreen')}>
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
  },
});

export default CartDetail;