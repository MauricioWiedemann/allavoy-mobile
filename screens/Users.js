import { StatusBar } from "expo-status-bar";

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import axios from "axios";

export default function Users() {
  // definicion de variables y sus sets
  const [data, setData] = useState([]);
  const [page, setPages] = useState(1);

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
      <View style={styles.itemWrapperStyle}>
        <Image
          style={styles.itemImageStyle}
          source={{ uri: item.picture.large }}
        />
        <View style={styles.contentWrapperStyle}>
          <Text
            style={styles.txtNameStyle}
          >{`${item.name.first} ${item.name.last}`}</Text>
          <Text style={styles.txtCountryStyle}>
            {item.location.city}, {item.location.country}
          </Text>
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
    console.log(page);
  };

  //llamar a la funcion getdata() cada vez que cambia page
  useEffect(() => {
    getdata();
  }, [page]);

  //flatlist donde se muestran todos los usuarios
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.login.uuid}
        ListFooterComponent={renderLoadingWheel}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
      <View style={styles.container} />
    </SafeAreaView>
  );
}

//estilos
const styles = StyleSheet.create({
  itemWrapperStyle: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#fff",
  },
  itemImageStyle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: "space-around",
  },
  txtNameStyle: {
    fontSize: 18,
    marginTop: 6,
  },
  txtCountryStyle: {
    color: "#777",
    marginBottom: 6,
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e8ecf4",
  },
});
