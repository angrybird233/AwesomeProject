/* eslint-disable react/react-in-jsx-scope */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Login from '../pages/Login';
import CustomerList from '../pages/CustomerList';
import LandDetail from '../pages/LandDetail';

export default function NavigationRoute() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{}}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: '首邑农业土地管理',
            headerStyle: {backgroundColor: '#6DAB3F'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 20},
          }}
        />
        <Stack.Screen
          name="CustomerList"
          component={CustomerList}
          options={{
            title: '客户列表',
            headerStyle: {backgroundColor: '#fff'},
            headerTintColor: '#000',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 18},
          }}
        />
        <Stack.Screen
          name="LandDetail"
          component={LandDetail}
          options={{
            title: '地块详情',
            headerStyle: {backgroundColor: '#fff'},
            headerTintColor: '#000',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle: {fontSize: 18},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
