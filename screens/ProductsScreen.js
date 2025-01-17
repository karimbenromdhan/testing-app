import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Sample products data with dates
const allProducts = [
  {
    id: 1,
    name: 'Laptop Pro',
    price: 1299.99,
    image: 'https://via.placeholder.com/200',
    description: 'High-performance laptop for professionals',
    dateAdded: '2024-03-15',
  },
  {
    id: 2,
    name: '4K Smart TV',
    price: 799.99,
    image: 'https://via.placeholder.com/200',
    description: 'Crystal clear display with smart features',
    dateAdded: '2024-03-20',
  },
  {
    id: 3,
    name: 'Wireless Headphones',
    price: 199.99,
    image: 'https://via.placeholder.com/200',
    description: 'Premium sound quality with noise cancellation',
    dateAdded: '2024-03-18',
  },
  {
    id: 4,
    name: 'Smartphone',
    price: 899.99,
    image: 'https://via.placeholder.com/200',
    description: 'Latest flagship smartphone with amazing camera',
    dateAdded: '2024-03-22',
  },
];

export default function ProductsScreen({ addToCart, route }) {
  const [products, setProducts] = useState([]);
  const filter = route?.params?.filter || 'all';

  useEffect(() => {
    let filteredProducts = [...allProducts];
    
    switch (filter) {
      case 'newest':
        filteredProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      case 'latest':
        filteredProducts = filteredProducts
          .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
          .slice(0, 2);
        break;
      default:
        break;
    }
    
    setProducts(filteredProducts);
  }, [filter]);

  const handleAddToCart = useCallback((item, event) => {
    // Prevent default behavior
    event?.preventDefault();
    event?.stopPropagation();
    
    addToCart(item);
  }, [addToCart]);

  const renderProduct = useCallback(({ item }) => (
    <View style={styles.productCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.productPrice}>${item.price}</Text>
          <Text style={styles.dateAdded}>{new Date(item.dateAdded).toLocaleDateString()}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={(event) => handleAddToCart(item, event)}
        activeOpacity={0.7}
      >
        <MaterialIcons name="add-shopping-cart" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  ), [handleAddToCart]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>
          {filter === 'newest' ? 'Newest Products' : 
           filter === 'latest' ? 'Latest Arrivals' : 
           'All Products'}
        </Text>
      </View>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        initialNumToRender={products.length}
        maxToRenderPerBatch={products.length}
        windowSize={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  productList: {
    padding: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 12,
    lineHeight: 20,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f4511e',
  },
  addButton: {
    backgroundColor: '#f4511e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2d3436',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  dateAdded: {
    fontSize: 14,
    color: '#636e72',
  },
}); 