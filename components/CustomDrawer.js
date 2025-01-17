import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';

export default function CustomDrawer() {
  const [activeTab, setActiveTab] = useState('Categories');
  const navigation = useNavigation();

  const handleOptionPress = (option) => {
    switch (option) {
      case 'Newest':
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Products',
            params: { filter: 'newest' }
          })
        );
        break;
      case 'Latest':
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Products',
            params: { filter: 'latest' }
          })
        );
        break;
      default:
        break;
    }
  };

  const renderOptions = () => {
    if (activeTab === 'Home') {
      return (
        <>
          <Text style={styles.option}>Location</Text>
          <Text style={styles.option}>Contact</Text>
        </>
      );
    } else if (activeTab === 'Categories') {
      return (
        <>
          <Text style={styles.option}>Laptop</Text>
          <Text style={styles.option}>TV</Text>
        </>
      );
    } else {
      return (
        <>
          <TouchableOpacity onPress={() => handleOptionPress('Newest')}>
            <Text style={styles.option}>Newest</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionPress('Latest')}>
            <Text style={styles.option}>Latest</Text>
          </TouchableOpacity>
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            activeTab === 'Home' && styles.activeButton,
          ]}
          onPress={() => setActiveTab('Home')}
        >
          <Text style={[
            styles.buttonText,
            activeTab === 'Home' && styles.activeButtonText
          ]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            activeTab === 'Categories' && styles.activeButton,
          ]}
          onPress={() => setActiveTab('Categories')}
        >
          <Text style={[
            styles.buttonText,
            activeTab === 'Categories' && styles.activeButtonText
          ]}>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            activeTab === 'Products' && styles.activeButton,
          ]}
          onPress={() => setActiveTab('Products')}
        >
          <Text style={[
            styles.buttonText,
            activeTab === 'Products' && styles.activeButtonText
          ]}>Products</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.optionsContainer}>
        {renderOptions()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
  },
  activeButton: {
    backgroundColor: '#f4511e',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  activeButtonText: {
    color: '#fff',
  },
  optionsContainer: {
    paddingHorizontal: 20,
  },
  option: {
    fontSize: 18,
    marginVertical: 10,
    color: '#333',
  },
}); 