import AsyncStorage from "@react-native-async-storage/async-storage";
import {createContext, useState, useEffect} from "react";
import axios from 'axios';
import { BASE_URL } from "../config";
import { jwtDecode } from 'jwt-decode';
import { Alert } from "react-native";
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const login = async (username, password) => {
        setIsLoading(true);
        axios.post(`${BASE_URL}/auth/login`, {
            email: username,
            password: password,
            tipoToken: "SESION_MOBILE"
        })
        .then(async res => {
            if (res.data.token) {
                const token = res.data.token;
                const decoded = jwtDecode(token);
                const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
                const pushToken = (await Notifications.getExpoPushTokenAsync({ projectId,})).data;
                if(decoded.rol === "CLIENTE"){
                    const userInfo = {
                        id: decoded.idUsuario,
                        email: decoded.sub
                    };
                    setUserInfo(userInfo);
                    setUserToken(token);
                    AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                    AsyncStorage.setItem('userToken', token);

                    axios.post(`${BASE_URL}/auth/save-push`, {
                        token: pushToken, 
                        usuario: decoded.idUsuario
                    })
                    .catch(e => {
                        console.log(e);
                    });
                } else {
                    Alert.alert("Error", "Usuario no encontrado");
                }
            }
        })
        .catch(e => {
            console.log(`isLogged in error ${e}`);
        });

        setIsLoading(false);
    }

    const logout = async () => {
        setIsLoading(true);
        try {
            await axios.delete(`${BASE_URL}/auth/logout`, {
                headers: {
                    "Authorization": "Bearer " + userToken
                }
            }).then(response => {
                return response;
            })
            await axios.post(`${BASE_URL}/auth/delete-push`, {
                token: pushToken 
            })
        } catch (e) {
            console.log("Error: ", e);
        }
        setUserToken(null);
        AsyncStorage.removeItem('userInfo');
        AsyncStorage.removeItem('userToken');
        setIsLoading(false);
    }

    const isLoggedIn = () => async() => {
        try {
            setIsLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                setUserToken(userToken);
                setUserInfo(userInfo);
            }
            setIsLoading(false);
        } catch (e) {
            console.log(`isLogged in error ${e}`);
        }
    }

    useEffect (() => {
        isLoggedIn();
    }, []);

    return(
        <AuthContext.Provider value={{login, logout, isLoading, userToken, userInfo}}>
            {children}
        </AuthContext.Provider>
    )
}