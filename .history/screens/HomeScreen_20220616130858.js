import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const HomeScreen = () => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}} />
      <TouchableOpacity
        style={{
          ...styles.button,
          marginHorizontal: 20,
          marginVertical: 5,
          backgroundColor: 'black',
        }}
        onPress={onApplePayButtonTapped}>
        <Text style={{...styles.buttonText, color: 'white'}}>Apple Pay</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...styles.button,
          marginHorizontal: 20,
          marginVertical: 5,
          backgroundColor: 'black',
        }}
        onPress={onVaultManagerButtonTapped}>
        <Text style={{...styles.buttonText, color: 'white'}}>
          Vault Manager
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...styles.button,
          marginHorizontal: 20,
          marginBottom: 20,
          marginTop: 5,
          backgroundColor: 'black',
        }}
        onPress={onUniversalCheckoutButtonTapped}>
        <Text style={{...styles.buttonText, color: 'white'}}>
          Universal Checkout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
