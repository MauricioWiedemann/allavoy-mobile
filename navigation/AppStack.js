import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Users from '../screens/UserScreen';
import SearchBus from '../screens/SearchScreen';
import TripList from '../screens/TripListScreen';
import SeatSelecionPage from '../screens/SeatSelecionPage';
import CartDetail from '../screens/CartDetail';
import CompraExitosa from '../screens/CompraExitosaScreen';
import UserInfo from '../screens/userInfoScreen';
import TripHistory from '../screens/TripHistoryScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//menu con tab
function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Buscar" component={SearchBus} />
      <Tab.Screen name="Historial" component={TripHistory} />
      <Tab.Screen name="User" component={UserInfo} />
    </Tab.Navigator>
  );
}

//todas las pantallas y link a tabs
export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName="AppTabs" screenOptions={{ headerShown: false }}>
      {/*pantallas sin tabs*/}
      <Stack.Screen name="userScreen" component={Users}/>
      <Stack.Screen name="searchScreen" component={SearchBus}/>
      <Stack.Screen name="TripListScreen" component={TripList}/>
      <Stack.Screen name="CartDetail" component={CartDetail}/>
      <Stack.Screen name="CompraExitosaScreen" component={CompraExitosa} />
      <Stack.Screen name="SeatSelecionPage" component={SeatSelecionPage} />
      <Stack.Screen name="UserInfo" component={UserInfo} />
      <Stack.Screen name="TripHistory" component={TripHistory} />
      {/*tabs*/}
      <Stack.Screen name="AppTabs" component={AppTabs} />
    </Stack.Navigator>
  );
}