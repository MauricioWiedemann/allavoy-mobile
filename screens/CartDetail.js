import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

export function CartDetail({ route }) {
  const { trip, selectedSeats } = route.params;

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
        <Text style={styles.label}>Viaje seleccionado:</Text>
        
        <Text style={styles.label}>Asientos seleccionados:</Text>
        <Text style={styles.label}>{selectedSeats.join(', ')}</Text>
        <View style={styles.formAction}>
            <TouchableOpacity 
            onPress={() => {login(form.email,form.password)}}>
            <View style={styles.btn}>
                <Text style={styles.btnText}>Comprar con Paypal</Text>
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
    textAlign: 'center',
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
    formAction: {
      marginTop: 25,
      marginBottom: 16,
    },
});

export default CartDetail;