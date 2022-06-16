import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Primer} from '@primer-io/react-native';
import {
  createClientSession,
  createPayment,
  resumePayment,
} from '../api/primer/primerApi';

const HomeScreen = () => {
  const [, setError] = useState(null);
  const clientSessionRequestBody = {
    customerId: '77230001',
    orderId: '7373737',
    currencyCode: 'EUR',
    order: {
      countryCode: 'GB',
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
      mobileNumber: 2445522999002,
      firstName: 'John',
      lastName: 'Smith',
      billingAddress: {
        firstName: 'John',
        lastName: 'Smith',
        postalCode: '12345',
        addressLine1: '1 test',
        addressLine2: undefined,
        countryCode: 'GB',
        city: 'London',
        state: 'England',
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
    },
    paymentMethod: {
      vaultOnSuccess: false,
      //options: {
      // GOOGLE_PAY: {
      //   surcharge: {
      //     amount: 50,
      //   },
      // },
      // ADYEN_IDEAL: {
      //   surcharge: {
      //     amount: 50,
      //   },
      // },
      // ADYEN_SOFORT: {
      //   surcharge: {
      //     amount: 50,
      //   },
      // },
      // PAYPAL: {
      //   surcharge: {
      //     amount: 150,
      //   },
      // },
      // PAYMENT_CARD: {
      //   networks: {
      //     VISA: {
      //       surcharge: {
      //         amount: 100,
      //       },
      //     },
      // MASTERCARD: {
      //   surcharge: {
      //     amount: 200,
      //   },
      // },
      // },
      //},
      //},
    },
  };
  const onBeforeClientSessionUpdate = () => {
    console.log(`onBeforeClientSessionUpdate`);
  };

  const onClientSessionUpdate = clientSession => {
    console.log(`onClientSessionUpdate\n${JSON.stringify(clientSession)}`);
  };

  const onBeforePaymentCreate = (checkoutPaymentMethodData, handler) => {
    console.log(
      `onBeforePaymentCreate\n${JSON.stringify(checkoutPaymentMethodData)}`,
    );
    handler.continuePaymentCreation();
  };

  const onCheckoutComplete = checkoutData => {
    console.log(`PrimerCheckoutData:\n${JSON.stringify(checkoutData)}`);
  };

  const onTokenizeSuccess = async (paymentMethodTokenData, handler) => {
    console.log(
      `onTokenizeSuccess:\n${JSON.stringify(paymentMethodTokenData)}`,
    );

    try {
      const payment = await createPayment(paymentMethodTokenData.token);

      if (payment.requiredAction && payment.requiredAction.clientToken) {
        paymentId = payment.id;

        if (payment.requiredAction.name === '3DS_AUTHENTICATION') {
          console.warn(
            'Make sure you have used a card number that supports 3DS, otherwise the SDK will hang.',
          );
        }
        paymentId = payment.id;
        handler.continueWithNewClientToken(payment.requiredAction.clientToken);
      } else {
        props.navigation.navigate('Result', payment);
        handler.handleSuccess();
      }
    } catch (err) {
      console.error(err);
      handler.handleFailure('RN app error');
    }
  };

  const onResumeSuccess = async (resumeToken, handler) => {
    console.log(`onResumeSuccess:\n${JSON.stringify(resumeToken)}`);

    try {
      if (paymentId) {
        const payment = await resumePayment(paymentId, resumeToken);
        props.navigation.navigate('Result', payment);
        handler.handleSuccess();
      } else {
        const err = new Error('Invalid value for paymentId');
        throw err;
      }
      paymentId = null;
    } catch (err) {
      console.error(err);
      paymentId = null;
      handler.handleFailure('RN app error');
    }
  };

  const onError = (error, checkoutData, handler) => {
    console.log(
      `onError:\n${JSON.stringify(error)}\n\n${JSON.stringify(checkoutData)}`,
    );
    handler.showErrorMessage('My RN message');
  };

  const onDismiss = () => {
    console.log(`onDismiss`);
    clientToken = null;
  };

  const settings = {
    paymentHandling: 'AUTO',
    localeData: {
      languageCode: 'el',
      localeCode: 'GR',
    },
    paymentMethodOptions: {
      iOS: {
        urlScheme: 'merchant://primer.io',
      },
      applePayOptions: {
        merchantIdentifier: 'merchant.com.hoppa',
        //merchantName: 'Primer Merchant',
      },
      cardPaymentOptions: {
        is3DSOnVaultingEnabled: false,
      },
      // klarnaOptions: {
      //   recurringPaymentDescription: 'Description',
      // },
    },
    uiOptions: {
      isInitScreenEnabled: false,
      isSuccessScreenEnabled: false,
      isErrorScreenEnabled: false,
    },
    debugOptions: {
      is3DSSanityCheckEnabled: false,
    },
    onBeforeClientSessionUpdate: onBeforeClientSessionUpdate,
    onClientSessionUpdate: onClientSessionUpdate,
    onBeforePaymentCreate: onBeforePaymentCreate,
    onCheckoutComplete: onCheckoutComplete,
    onTokenizeSuccess: onTokenizeSuccess,
    onResumeSuccess: onResumeSuccess,
    onError: onError,
    onDismiss: onDismiss,
  };

  const onUniversalCheckoutButtonTapped = async () => {
    try {
      const clientSession = await createClientSession(clientSessionRequestBody);
      clientToken = clientSession.clientToken;
      await Primer.configure(settings);
      await Primer.showUniversalCheckout(clientToken);
    } catch (err) {
      if (err instanceof Error) {
        console.log('ERRORS:', JSON.stringify(err));
        setError(err);
      } else if (typeof err === 'string') {
        // console.log('ERRORS:', JSON.stringify(err));
        setError(new Error(err));
      } else {
        setError(new Error('Unknown error'));
      }
    }
  };
  const onApplePayButtonTapped = async () => {
    try {
      const clientSession = await createClientSession(clientSessionRequestBody);
      clientToken = clientSession.clientToken;
      await Primer.configure(settings);
      await Primer.showPaymentMethod(
        'APPLE_PAY',
        PrimerSessionIntent.CHECKOUT,
        clientToken,
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else if (typeof err === 'string') {
        setError(new Error(err));
      } else {
        setError(new Error('Unknown error'));
      }
    }
  };
  const onVaultManagerButtonTapped = async () => {
    try {
      const clientSession = await createClientSession(clientSessionRequestBody);
      clientToken = clientSession.clientToken;
      await Primer.configure(settings);
      await Primer.showVaultManager(clientToken);
    } catch (err) {
      console.log('ERROR:', JSON.stringify(err));
      if (err instanceof Error) {
        setError(err);
      } else if (typeof err === 'string') {
        setError(new Error(err));
      } else {
        setError(new Error('Unknown error'));
      }
    }
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
