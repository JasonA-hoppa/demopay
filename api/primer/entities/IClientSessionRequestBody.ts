export interface IClientSessionRequestBody {
  customerId?: string;
  orderId?: string;
  currencyCode?: string;
  order?: {
    countryCode?: string;
    lineItems?: Array<{
      amount: number;
      quantity: number;
      itemId: string;
      description: string;
      discountAmount?: number;
    }>;
  };
  customer?: {
    emailAddress?: string;
    mobileNumber?: string;
    firstName?: string;
    lastName?: string;
    billingAddress?: {
      firstName?: string;
      lastName?: string;
      postalCode?: string;
      addressLine1?: string;
      addressLine2?: string;
      countryCode?: string;
      city?: string;
      state?: string;
    };
    shippingAddress?: {
      firstName?: string;
      lastName?: string;
      addressLine1?: string;
      postalCode?: string;
      city?: string;
      state?: string;
      countryCode?: string;
    };
    nationalDocumentId?: string;
  };
  paymentMethod: {
    vaultOnSuccess?: boolean;
    options?: {
      [paymentMethodType: string]: any;
    };
  };
}

export interface IClientSessionActionsRequestBody {
  clientToken: string;
  actions: IClientSession_Action[];
}

export interface IClientSession_Action {
  type: string;
  params?: any;
}
