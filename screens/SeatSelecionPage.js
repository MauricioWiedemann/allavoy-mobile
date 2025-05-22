import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

export function SeatSelecionPage({ route }) {
  const { trip } = route.params;
  const [seatMap, setSeatMap] = useState([
    { fila: 1, asientos: [1, 2, 3, 4] },
    { fila: 2, asientos: [5, 6, 7, 8] },
    { fila: 3, asientos: [9, 10, 11, 12] },
    { fila: 4, asientos: [13, 14, 15, 16] },
    { fila: 5, asientos: [17, 18, 19, 20] },
    { fila: 6, asientos: [21, 22, 23, 24] },
    { fila: 7, asientos: [25, 26, 27, 28] },
    { fila: 8, asientos: [29, 30, 31, 32] },
    { fila: 9, asientos: [33, 34, 35, 36] },
    { fila: 10, asientos: [37, 38, 39, 40] }
]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  /*
  useEffect(() => {
    // Reemplaza la URL por la de tu API real
    axios.get('https://tu-api.com/asientos?tripId=' + trip.id)
      .then(res => setSeatMap(res.data))
      .catch(() => setSeatMap([]));
  }, [trip]);
    */
  const toggleSeat = (seatNumber) => {
    setSelectedSeats(prev =>
      prev.includes(seatNumber)
        ? prev.filter(n => n !== seatNumber)
        : [...prev, seatNumber]
    );
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
        <Text style={styles.title}>Selecciona tus asientos</Text>
        <View style={{ 
            marginVertical: 20, 
            backgroundColor: '#69a2ff', 
            borderRadius: 8, 
            padding: 10}}>
          {seatMap.map((fila, i) => (
            <View key={i} style={styles.seatRow}>
              {fila.asientos.map((num, i) => (
                <View key={num} style={i === 2 ? { marginLeft: 20 } : null}>
                  <TouchableOpacity
                    style={[
                      styles.seat,
                      selectedSeats.includes(num) && styles.seatSelected
                    ]}
                    onPress={() => toggleSeat(num)}
                  >
                    <Text style={styles.seatText}>{num}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'left', marginTop: 0 }}>
            <View style={[styles.seat, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e0e7ef' }]}/>
            <View style={[styles.seat, { backgroundColor: '#6dc276', marginRight: 30 }]}/>
            <View style={[styles.seat, { backgroundColor: '#b0b0b0', marginLeft: 50 }]}/> 
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
            <Text style={[styles.seatLegend, { textAlign: 'center' }]}>Disponible</Text>
            <Text style={[styles.seatLegend, { textAlign: 'center', marginLeft: 16 }]}>Seleccionado</Text>
            <Text style={[styles.seatLegend, { textAlign: 'center', marginLeft: 16 }]}>Ocupado</Text>
        </View>
        <View style={styles.formAction}>
            <TouchableOpacity 
            onPress={() => {login(form.email,form.password)}}>
            <View style={styles.btn}>
                <Text style={styles.btnText}>Comprar asientos</Text>
            </View>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
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
});

export default SeatSelecionPage;