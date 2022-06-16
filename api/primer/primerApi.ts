import axios from 'axios';
//import { environment } from '../screens/SettingsScreen';
import {
  Environment,
  getEnvironmentStringVal,
} from '../primer/entities/Environment';
import type {
  IClientSessionActionsRequestBody,
  IClientSessionRequestBody,
} from '../primer/entities/IClientSessionRequestBody';
import type {IPayment} from '../primer/entities/IPayment';

//const baseUrl = 'https://api.sandbox.primer.io';
const baseUrl = 'https://us-central1-primerdemo-8741b.cloudfunctions.net/api';
let staticHeaders = {
  'Content-Type': 'application/json',
  //'X-API-KEY': '96732665-a785-4da1-9548-5ed08b93da7c',
  environment: 'sandbox',
};

export const createClientSession = async (body: IClientSessionRequestBody) => {
  const url = baseUrl + '/client-session';
  const headers = {...staticHeaders, 'X-Api-Version': '2021-09-27'};

  try {
    console.log(`\nREQUEST:`);
    console.log(url);
    console.log(`\nHEADERS:`);
    console.log(headers);
    console.log(`\nBODY:`);
    console.log(JSON.stringify(body));
    console.log(`\n`);

    const response = await axios.post(url, body, {headers: headers});

    console.log(`\nRESPONSE [${response.status}]:`);
    console.log(response.data);

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      const err = new Error(
        `createClientSession Request failed with status ${
          response.status
        }.\nBody: ${JSON.stringify(response.data)}`,
      );
      console.error(err);
      throw err;
    }
  } catch (err: any) {
    console.log(err.response.data);
    console.error(err);
    throw err;
  }
};

export const setClientSessionActions = async (
  body: IClientSessionActionsRequestBody,
) => {
  const url = baseUrl + '/client-session/actions';
  const headers = {...staticHeaders, 'X-Api-Version': '2021-10-19'};

  try {
    console.log(`\nREQUEST:`);
    console.log(url);
    console.log(`\nHEADERS:`);
    console.log(headers);
    console.log(`\nBODY:`);
    console.log(body);
    console.log(`\n`);
    const response = await axios.post(url, body, {headers: headers});

    console.log(`\nRESPONSE [${response.status}]:`);
    console.log(response.data);

    if (response.status >= 200 && response.status < 300) {
      const clientSession = response.data;
      return clientSession;
    } else {
      const err = new Error(
        `Request failed with status ${response.status}.\nBody: ${JSON.stringify(
          response.data,
        )}`,
      );
      console.error(err);
      throw err;
    }
  } catch (err: any) {
    console.log(err.response.data);
    console.error(err);
    throw err;
  }
};

export const createPayment = async (paymentMethodToken: string) => {
  const url = baseUrl + '/payments';
  const headers = {...staticHeaders, 'X-Api-Version': '2021-09-27'};

  const body = {paymentMethodToken: paymentMethodToken};
  try {
    console.log(`\nREQUEST:`);
    console.log(url);
    console.log(`\nHEADERS:`);
    console.log(headers);
    console.log(`\nBODY:`);
    console.log(body);
    console.log(`\n`);

    const response = await axios.post(url, body, {headers: headers});

    console.log(`\nRESPONSE [${response.status}]:`);
    console.log(response.data);

    if (response.status >= 200 && response.status < 300) {
      const payment: IPayment = response.data;
      return payment;
    } else {
      const err = new Error(
        `Request failed with status ${response.status}.\nBody: ${JSON.stringify(
          response.data,
        )}`,
      );
      console.error('create payment ', err);
      throw err;
    }
  } catch (err: any) {
    console.log('create payment ', err.response.data);
    console.error(err);
    throw err;
  }
};

export const resumePayment = async (paymentId: string, resumeToken: string) => {
  const url = baseUrl + `/payments/${paymentId}/resume`;
  const headers = {...staticHeaders, 'X-Api-Version': '2021-09-27'};

  const body = {resumeToken: resumeToken};

  try {
    console.log(`\nREQUEST:`);
    console.log(url);
    console.log(`\nHEADERS:`);
    console.log(headers);
    console.log(`\nBODY:`);
    console.log(body);
    console.log(`\n`);
    const response = await axios.post(url, body, {headers: headers});

    console.log(`\nRESPONSE [${response.status}]:`);
    console.log(response.data);

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      const err = new Error(
        `Request failed with status ${response.status}.\nBody: ${JSON.stringify(
          response.data,
        )}`,
      );
      console.error(err);
      throw err;
    }
  } catch (err: any) {
    console.log(err.response.data);
    console.error(err);
    throw err;
  }
};

export const storePaymentMethod = async (
  customerId: string,
  paymentToken: string,
) => {
  const url = baseUrl + `/payment-instruments/${paymentToken}/vault`;
  const headers = {...staticHeaders, 'X-Api-Version': '2021-09-27'};

  const body = {customerId: customerId};

  try {
    const response = await axios.post(url, body, {headers: headers});
    console.error('response.data', response.data);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      const err = new Error(
        `Request failed with status ${response.status}.\nBody: ${JSON.stringify(
          response.data,
        )}`,
      );
      console.error(err);
      throw err;
    }
  } catch (err: any) {
    console.log(err.response.data);
    console.error(err);
    throw err;
  }
};

export const listPaymentMethods = async (customerId: string) => {
  const url = baseUrl + `/payment-instruments?customer_id=${customerId}`;
  const headers = {
    ...staticHeaders,
    'X-Api-Version': '2021-09-27',
  };

  try {
    const response = await axios.get(url, {headers: headers});

    console.log('FETCH PAY LIST ..', response.data);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      const err = new Error(
        `Request failed with status ${response.status}.\nBody: ${JSON.stringify(
          response.data,
        )}`,
      );
      console.error(err);
      throw err;
    }
  } catch (err: any) {
    console.log(err.response.data);
    console.error(err);
    throw err;
  }
};

export const getClientSessionRequestBody = (
  clientDetails: any,
  order_id: string,
  totalCost: number,
) => {
  const clientSessionRequestBody: IClientSessionRequestBody = {
    customerId: clientDetails?.customerId,
    orderId: order_id,
    currencyCode: clientDetails?.currencyCode,
    order: {
      countryCode: clientDetails?.countryCode,
      lineItems: [
        {
          amount: totalCost,
          quantity: 1,
          itemId: 'hoppa',
          description: 'hoppa ride',
          discountAmount: 0,
        },
      ],
    },
    customer: {
      emailAddress: clientDetails?.email,
      mobileNumber: clientDetails?.phoneNumber,
      firstName: clientDetails?.firstname,
      lastName: clientDetails?.lastname,
      billingAddress: {
        firstName: clientDetails?.firstname,
        lastName: clientDetails?.lastname,
        postalCode: clientDetails?.postcode,
        addressLine1: clientDetails?.address1,
        addressLine2: clientDetails?.address1,
        countryCode: clientDetails?.countryCode,
        city: clientDetails?.city,
        state: clientDetails?.county,
      },
    },
    paymentMethod: {
      vaultOnSuccess: false,
    },
  };

  return clientSessionRequestBody;
};
