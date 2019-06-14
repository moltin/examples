
declare module "Types" {

    export interface LambdaEventBody {
        id: string;
        triggered_by: string;
        attempt: number;
        integration:
        { id: string;
            integration_type: string;
            name: string; };
        resources: string;  
    }

    export interface ShipstationOrderShippedWebhookBody {
        resource_url: string;
        resource_type: string;
    }

    export interface MoltinOrderPaidWebhookBody {
        type: string;
        id: string;
        status: string;
        payment: string;
        shipping: string;
        customer: Customer;
        shipping_address: Address;
        billing_address: Address;
        links: object;
        meta: object;
        included: object;
    }

    export interface Customer {
        name: string;
        email: string;
    }

    export interface Address {
        first_name: string;
        last_name: string;
        company_name?: string;
        line_1: string;
        line_2?: string;
        city?: string;
        postcode: string;
        county: string;
        country: string;
        phone_number?: string;
        instructions?: string;
    }

    export interface ShipstationLineItem {
        lineItemKey: string;
        sku: string;
        name: string;
        quantity: number;
        unitPrice: number;
        adjustment: boolean;
    }

    export interface ShipstationShippingAddress {
        name: string;
        company: string;
        street1: string;
        street2: string;
        street3: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        phone: string;
        residential: string;
    }

    export interface ShipstationBillingAddress {
        name: string;
        company: string;
        street1: string;
        street2: string;
        street3: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        phone: string;
        residential: string;
    }

    export interface ShipstationOrderValues {
        orderKey: string;
        orderDate: string;
        orderStatus: string;
        customerEmail: string;
        customerUsername: string;
        amountPaid: number;
        requestedShippingService: string | null;
        carrierCode: string | null;
        serviceCode: string | null;
        packageCode: string | null;
        confirmation: string | null;
        gift: boolean;
    }

    export interface EmptyShipstationOrderObjects {
        billTo: Object;
        shipTo: Object;
        items: Object;
    }

    export type ShipstationFullOrder =  ShipstationOrderValues & ShipstationOrderObjects

    export interface ShipstationOrderObjects {
        billTo: ShipstationBillingAddress;
        shipTo: ShipstationShippingAddress;
        items: ShipstationLineItem[];
    }

    export interface LambdaResponse {
        statusCode: number;
        body: string;
    }
}
