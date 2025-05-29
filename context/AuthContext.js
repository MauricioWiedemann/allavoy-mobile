import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {createContext, useState, useEffect} from "react";
import axios from 'axios';
import { BASE_URL } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);


    const login = (username, password) => {
        setIsLoading(true);
            console.log('userToken en AppNav:', userToken);

        // MOCK para admin/admin
        if (username === 'admin' && password === 'admin') {
            const mockUserInfo = {
                data: {
                    token: 'mock-token-admin',
                    user: { name: 'Administrador', mail: 'admin' }
                }
            };
            setUserInfo(mockUserInfo);
            setUserToken('mock-token-admin');
            AsyncStorage.setItem('userInfo', JSON.stringify(mockUserInfo));
            AsyncStorage.setItem('userToken', 'mock-token-admin');
            setIsLoading(false);
            return;
        }


        axios.post(`${BASE_URL}/login`, {
            mail: username,
            pass: password,
        })
        .then(res => {
            if (res.data.token!=""){ //temporal para no hacer el login si las credenciales no son correctas
                let userInfo = res;
                setUserInfo(userInfo);
                setUserToken(userInfo.data.token)

                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                AsyncStorage.setItem('userToken', userInfo.data.token);

                //console.log(userInfo);
                console.log('User Token: ' + userInfo.data.token);
            } else {
                console.log("Credenciales incorrectas");
            }
        })
        .catch(e => {
            console.log(`isLogged in error ${e}`);
        });
        setIsLoading(false);
    }

    const logout = () => {
        setIsLoading(true);
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