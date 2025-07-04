import { useEffect, useState, useContext } from 'react';
import { BASE_URL } from "../config";
import { RefreshControl, FlatList, StyleSheet, SafeAreaView, View, Image, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { AuthContext } from '../context/AuthContext';

export default function TripHistory() {
  const [data, setData] = useState([]);
  const { login } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);

  //api viajes
  const history = async () => {
    setRefreshing(true);
    let userInfoStorage = JSON.parse( await AsyncStorage.getItem('userInfo') );
    await axios
      .post(`${BASE_URL}/pasajes/historicocompra`, {
        email: userInfoStorage.email
      })
      .then((res) => {
        setData(res.data);
      })
      .catch(() => setData([]));
      setRefreshing(false);
  };

  useEffect(() => {
    history();
  }, []);

  const renderItem = ({ item: h }) => (
    <View style={styles.itemBox}>
      <View style={styles.contentWrapperStyle}>
        <Text style={styles.tripDetail}>
          <Text style={{ fontWeight: 'bold' }}>Origen: </Text>
          {h.origen?.nombre}, {h.origen?.departamento}
        </Text>
        <Text style={styles.tripDetail}>
          <Text style={{ fontWeight: 'bold' }}>Destino: </Text>
          {h.destino?.nombre}, {h.destino?.departamento}
        </Text>
        <Text style={styles.tripDetail}>
          <Text style={{ fontWeight: 'bold' }}>Salida: </Text>
          {h.fechaSalida.replace("T", " ")}
        </Text>
        <Text style={styles.tripDetail}>
          <Text style={{ fontWeight: 'bold' }}>Llegada: </Text>
          {h.fechaLlegada.replace("T", " ")}
        </Text>
        <Text style={styles.tripDetail}>
          <Text style={{ fontWeight: 'bold' }}>Asiento: </Text>
          {h.asiento}
        </Text>
        <Text style={styles.tripDetail}>
          <Text style={{ fontWeight: 'bold' }}>Precio: </Text>
          {h.precio}
        </Text>
        <Text style={styles.tripDetail}>
          <Text style={{ fontWeight: 'bold' }}>Descuento: </Text>
          {h.descuento} %
        </Text>
        <Text style={styles.tripDetail}>
          <Text style={{ fontWeight: 'bold' }}>Monto pagado: </Text>
          {h.monto}
        </Text>
        <Text style={styles.tripDetail}>
          <Text style={{ fontWeight: 'bold' }}>Devuelto: </Text>
          {h.devuelto ? 'Si' : 'No'}
        </Text>
        {h.devuelto && h.fechaDevolucion && (
          <Text style={styles.tripDetail}>
            <Text style={{ fontWeight: 'bold' }}>Fecha devolucion: </Text>
            {h.fechaDevolucion}
          </Text>
        )}
      </View>
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
        </View>
        <Text style={styles.title}>Historial de Viajes</Text>
        <View style={styles.form}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(_, idx) => idx.toString()}
            refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={history} /> }
          />
        </View>
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
    justifyContent: 'center',
    marginVertical: 30,
  },
  headerImg: {
    width: 150,
    height: 80,
    alignSelf: 'center',
    marginBottom: 0,
  },
  title: {
    fontSize: 35,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 0,
    textAlign: 'center',
  },
  form: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  tripDetail: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 2,
  },
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
  contentWrapperStyle: {
    flex: 1,
  },
});