import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { NavigationContainer} from '@react-navigation/native';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { AuthContext } from '../context/AuthContext';

function AppNav () {
    const {isLoading, userToken} = useContext(AuthContext);
    
    if (isLoading) {
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size={'large'}/>
            </View>
        );
    } 
    
    return (
        <NavigationContainer>
            {userToken !== null ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default AppNav;