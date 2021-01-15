
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const Stack= createStackNavigator()

import CreateUserScreen from './screens/CreateUserScreen'
import UsersList from './screens/UsersList'
import UserDetailScreen from './screens/UserDetailScreen'

function MyStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen
       name="UsersList"
        component={UsersList}
        options={{title: "users list"}} />
      <Stack.Screen 
      name="CreateUserScreen"
       component={CreateUserScreen}
       options={{title: "create a new user"}} />
      <Stack.Screen
       name="UserDetailScreen"
       component={UserDetailScreen}
       options={{title: "user detail screen"}} />
    </Stack.Navigator>
  )
  
}

export default function App() {
  return (
    <NavigationContainer>
        <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
