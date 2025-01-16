import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CategoriesScreen from './screens/CategoriesScreen';
import ProductsScreen from './screens/ProductsScreen';
import CustomDrawer from './components/CustomDrawer';
import HomeScreen from './screens/HomeScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Drawer.Screen 
          name="Home" 
          component={HomeScreen} 
        />
        <Drawer.Screen 
          name="Categories" 
          component={CategoriesScreen} 
        />
        <Drawer.Screen 
          name="Products" 
          component={ProductsScreen} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
