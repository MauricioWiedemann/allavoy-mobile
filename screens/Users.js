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

export default function App() {
  const [data, setData] = useState([]);
  const [page, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getdata = () => {
    setIsLoading(true);
    axios
      .get("https://randomuser.me/api/?page=${page}&results=10")
      .then((res) => {
        setData([...data, ...res.data.results]);
      });
    setIsLoading(false);
  };

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
          >{`${item.name.title} ${item.name.first} ${item.name.last}`}</Text>
          <Text style={styles.txtEmailStyle}>{item.email}</Text>
        </View>
      </View>
    );
  };

  const renderLoader = () => {
    return (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  const loadMoreItem = () => {
    setPages(page + 1);
  };

  useEffect(() => {
    getdata();
  }, [page]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.email}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
      <View style={styles.container} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemWrapperStyle: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
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
    fontSize: 16,
  },
  txtEmailStyle: {
    color: "#777",
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
