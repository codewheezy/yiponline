import { Text, View, StyleSheet, TextInput, Button, Image, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import * as Notifications from 'expo-notifications';


const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [photo, setPhoto] = useState(null);

    const addProduct = () => {
        if (products.length >= 5) {
          notifyUser();
          return;
        }
    }

    const clearInputs = () => {
        setName('');
        setPrice('');
        setPhoto(null);
    };

    const saveProducts = async (products) => {
        try {
          await AsyncStorage.setItem('products', JSON.stringify(products));y
        } catch (error) {
          console.error('Failed to save products', error);
        }
    };

    const loadProducts = async () => {
        try {
          const savedProducts = await AsyncStorage.getItem('products');
          if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
          }
        } catch (error) {
          console.error('Failed to load products', error);
        }
    };
    
    const pickImage = () => {
        // ImagePicker.showImagePicker({}, (response) => {
        //   if (response.uri) {
        //     setPhoto(response.uri);
        //   }
        // });
    };

    const notifyUser = () => {
        Notifications.setNotificationHandler({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        });

        Notifications.scheduleNotificationAsync({
            content: {
              title: 'Look at that notification',
              body: 'Maximum number of products (5) reached!',
            },
            // trigger: null,
          });
    };
    
    React.useEffect(() => {
        loadProducts();
    }, []);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Product Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Product Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <Button title="Pick a Photo" onPress={pickImage} />
                {photo && <Image source={{ uri: photo }} style={styles.image} />}
            <Button title="Add Product" onPress={addProduct} />
            <FlatList
                data={products}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                <View style={styles.product}>
                    <Text>{item.name}</Text>
                    <Text>{item.price}</Text>
                    {item.photo && <Image source={{ uri: item.photo }} style={styles.image} />}
                </View>
            )}
            />
       </View>
    )
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 12,
      padding: 8,
    },
    image: {
      width: 100,
      height: 100,
      marginBottom: 12,
    },
    product: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
    },
});


export default ProductManagement;
