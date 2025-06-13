import AsyncStorage from "@react-native-async-storage/async-storage";
import {createContext, useState, useEffect} from "react";
import axios from 'axios';
import { BASE_URL } from "../config";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);


    const login = (username, password) => {
        setIsLoading(true);
        // mock admin/admin
        if (username === 'admin' && password === 'admin') {
            const mockUserInfo = {
                id: '1',
                mail: 'admin',
                nombre: 'Administrador'
            };
            setUserInfo(mockUserInfo);
            setUserToken('mock-token-admin');
            AsyncStorage.setItem('userInfo', JSON.stringify(mockUserInfo));
            AsyncStorage.setItem('userToken', 'mock-token-admin');
            setIsLoading(false);
            return;
        }


        axios.post(`${BASE_URL}/auth/login`, {
            email: username,
            password: password,
        })
        .then(res => {
            if (res.data.token) {
                const token = res.data.token;
                const decoded = jwt_decode(token);
                const userInfo = {
                    id: decoded.id,
                    email: decoded.mail,
                    nombre: decoded.nombre
                };
                setUserInfo(userInfo);
                setUserToken(token);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                AsyncStorage.setItem('userToken', token);
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