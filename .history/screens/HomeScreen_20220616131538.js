import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const HomeScreen = () => {
  const clientSessionRequestBody = {
    customerId: appSettings.customerId,
    orderId: 'rn-ios-order-' + makeRandomString(8),
    currencyCode: appSettings.currencyCode,
    order: {
      countryCode: appSettings.countryCode,
      lineItems: [
        {
          amount: 2000,
          quantity: 1,
          itemId: 'shoes-423132',
          description: 'Fancy Shoes',
          discountAmount: 0,
        },
      ],
    },
    customer: {
      emailAddress: 'test@mail.com',
      mobileNumber: appSettings.phoneNumber,
      firstName: 'John',
      lastName: 'Smith',
      billingAddress: {
        firstName: 'John',
        lastName: 'Smith',
        postalCode: '12345',
        addressLine1: '1 test',
        addressLine2: undefined,
        countryCode: 'GB',
        city: 'test',
        state: 'test',
      },
      shippingAddress: {
        firstName: 'John',
        lastName: 'Smith',
        addressLine1: '1 test',
        postalCode: '12345',
        city: 'test',
        state: 'test',
        countryCode: 'GB',
      },
      nationalDocumentId: '9011211234567',
    },
    paymentMethod: {
      vaultOnSuccess: false,
      options: {
        GOOGLE_PAY: {
          surcharge: {
            amount: 50,
          },
        },
        ADYEN_IDEAL: {
          surcharge: {
            amount: 50,
          },
        },
        ADYEN_SOFORT: {
          surcharge: {
            amount: 50,
          },
        },
        PAYPAL: {
          surcharge: {
            amount: 150,
          },
        },
        PAYMENT_CARD: {
          networks: {
            VISA: {
              surcharge: {
                amount: 100,
              },
            },
            MASTERCARD: {
              surcharge: {
                amount: 200,
              },
            },
          },
        },
      },
    },
  };
  const onUniversalCheckoutButtonTapped = () => {
    //
  };
  const onApplePayButtonTapped = () => {
    //
  };
  const onVaultManagerButtonTapped = () => {
    //
  };
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
