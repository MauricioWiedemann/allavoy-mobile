import { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { BASE_URL } from "../config";

const MOCK_TRIPS = [
  {
    id: '1',
    origen: 'Montevideo',
    destino: 'Canelones',
    fecha_salida: '12/7/2025 18:20hs',
    fecha_llegada: '12/7/2025 19:30hs',
    omnibus: '409',
    asientos: [12, 13],
  },
  {
    id: '2',
    origen: 'Canelones',
    destino: 'Montevideo',
    fecha_salida: '15/7/2025 09:00hs',
    fecha_llegada: '15/7/2025 10:10hs',
    omnibus: '410',
    asientos: [5, 6],
  },
];

export default function TripHistory() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    setTrips(MOCK_TRIPS);
  }, []);

  const renderTrip = ({ item }) => (
    <View style={styles.tripCard}>
      <Text style={styles.tripTitle}>{item.origen} → {item.destino}</Text>
      <Text style={styles.tripDetail}>Salida: {item.fecha_salida}</Text>
      <Text style={styles.tripDetail}>Llegada: {item.fecha_llegada}</Text>
      <Text style={styles.tripDetail}>Ómnibus: {item.omnibus}</Text>
      <Text style={styles.tripDetail}>Asientos: {item.asientos.join(', ')}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={require('./../assets/logo.png')}
          />
          <Text style={styles.title}>Historial de Viajes</Text>
        </View>
        <FlatList
          data={trips}
          keyExtractor={item => item.id}
          renderItem={renderTrip}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No tienes viajes comprados.</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
    marginVertical: 30,
  },
  headerImg: {
    width: 150,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#075eec',
    marginBottom: 8,
    textAlign: 'center',
  },
  tripCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tripTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#075eec',
    marginBottom: 4,
  },
  tripDetail: {
    fontSize: 15,
    color: '#222',
    marginBottom: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 16,
  },
});