import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from "../config";
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';


export default function CompraExitosa({ route }) {
  const navigation = useNavigation();
  const {idPasajes} = route.params;

  const handleDescargarPDF = async () => {

    if (!idPasajes || idPasajes.length === 0) {
      Alert.alert("Error", "No hay pasajes para descargar.");
      return;
    }

    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if(!permissions.granted){
      Alert.alert("Error", "Se tienen que dar permisos")
      return;
    }

    for (const id of idPasajes) {
      try {
        const filename = `detalle_pasaje_${id}.pdf`;
        const response = await FileSystem.downloadAsync(
          `${BASE_URL}/pasajes/descargar-pdf/${id}`,
          FileSystem.documentDirectory + filename,
        );
        save(response.uri, filename, permissions);
      } catch (error) {
        console.error("Error al descargar PDF:", error);
      }
    } 
  };

  const save = async (uri, filename, permissions) => {
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

    await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, 'application/pdf')
      .then(async (uri) => {
        await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
      })
      .catch(e => console.log(e));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>¡Compra Exitosa!</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('./../assets/success-icon.png')}
            resizeMode="contain"
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>Se le envio un correo con los boletos.</Text>
        </View>
        <View style={styles.formAction}>
          <TouchableOpacity onPress={() => navigation.navigate('AppTabs')}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Volver al inicio</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.formAction}>
          <TouchableOpacity onPress={handleDescargarPDF}>
            <View style={styles.btnCancel}>
              <Text style={styles.btnTextCancel}>Descargar PDF</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginVertical: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#292929',
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 6,
    color: '#292929',
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  image: {
    width: 200,
    height: 200,
    opacity: 0.4,
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
    marginTop: 15,
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