import { useEffect, useState } from 'react';
import { BASE_URL } from "../config";
import {FlatList, ActivityIndicator, StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, TextInput, Keyboard,} from 'react-native';
import axios from "axios";



export default function TripHistory() {
  const [data, setData] = useState([]);
  const [page, setPages] = useState(1);


//funcion para obtener los usuarios de la api
    const getdata = () => {
        axios
        .get("https://randomuser.me/api/?page=${page}&results=15")
        .then((res) => {
            setData([...data, ...res.data.results]);
        });
    };

const renderItem = ({ item: h }) => {
  return (
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
          {h.fechaSalida}
        </Text>
        <Text style={styles.tripDetail}>
          <Text style={{ fontWeight: 'bold' }}>Llegada: </Text>
          {h.fechaLlegada}
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
          <Text style={styles.title}>Historial de Viajes</Text>
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