import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View, Text, StyleSheet, Platform, Animated, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CategoriesScreen from './screens/CategoriesScreen';
import ProductsScreen from './screens/ProductsScreen';
import CustomDrawer from './components/CustomDrawer';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import CartPopup from './components/CartPopup';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const { width } = Dimensions.get('window');

function DrawerNavigator({ addToCart }) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
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
        name="HomeDrawer" 
        component={HomeScreen} 
        options={{ title: 'Home' }} 
      />
      <Drawer.Screen 
        name="Categories" 
        component={CategoriesScreen} 
      />
      <Drawer.Screen 
        name="Products" 
        options={{ unmountOnBlur: true }}
      >
        {(props) => <ProductsScreen {...props} addToCart={addToCart} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const slideAnim = React.useRef(new Animated.Value(width)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const toggleCart = (show) => {
    setIsCartVisible(show);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: show ? 1 : 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: show ? 0 : width,
        useNativeDriver: true,
        friction: 12,
        tension: 45,
        velocity: 0.5,
      })
    ]).start();
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const addToCart = (product) => {
    setCartItems(items => {
      const existingItem = items.find(item => item.id === product.id);
      if (existingItem) {
        return items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { ...product, quantity: 1 }];
    });
  };

  const TabBarIcon = ({ name, focused }) => (
    <MaterialIcons 
      name={name} 
      size={24} 
      color={focused ? '#f4511e' : '#636e72'} 
    />
  );

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: '#f4511e',
            tabBarInactiveTintColor: '#636e72',
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="HomeTab"
            options={{
              title: 'Home',
              tabBarIcon: ({ focused }) => (
                <TabBarIcon name="home" focused={focused} />
              ),
            }}
          >
            {(props) => <DrawerNavigator {...props} addToCart={addToCart} />}
          </Tab.Screen>
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabBarIcon name="person" focused={focused} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabBarIcon name="settings" focused={focused} />
              ),
            }}
          />
          <Tab.Screen
            name="Cart"
            component={View}
            options={{
              tabBarIcon: ({ focused }) => (
                <View>
                  <TabBarIcon name="shopping-cart" focused={focused} />
                  {cartItems.length > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{cartItems.length}</Text>
                    </View>
                  )}
                </View>
              ),
            }}
            listeners={{
              tabPress: (e) => {
                e.preventDefault();
                toggleCart(true);
              },
            }}
          />
        </Tab.Navigator>

        {isCartVisible && (
          <View style={styles.overlay}>
            <Animated.View
              style={[
                styles.blurArea,
                {
                  opacity: fadeAnim,
                }
              ]}
            >
              <TouchableOpacity
                style={styles.blurTouchable}
                activeOpacity={1}
                onPress={() => toggleCart(false)}
              >
                <View style={styles.blurContent} />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View 
              style={[
                styles.cartContainer,
                { 
                  transform: [{ translateX: slideAnim }],
                  opacity: fadeAnim
                }
              ]}
            >
              <CartPopup
                isVisible={isCartVisible}
                onClose={() => toggleCart(false)}
                cartItems={cartItems}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            </Animated.View>
          </View>
        )}
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#f4511e',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  blurArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '30%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  blurTouchable: {
    flex: 1,
  },
  blurContent: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  cartContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '70%',
  },
});
