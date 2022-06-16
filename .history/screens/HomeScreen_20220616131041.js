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

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 17,
  },
  textInput: {
    height: 40,
    paddingHorizontal: 4,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
  },
});
