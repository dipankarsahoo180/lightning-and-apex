import { LightningElement, api, wire } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import OWNER_NAME_FIELD from '@salesforce/schema/Account.Owner.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry'
import SHIPPING_STREET_FIELD from '@salesforce/schema/Account.ShippingStreet'
import SHIPPING_CITY_FIELD from '@salesforce/schema/Account.ShippingCity'
import SHIPPING_ZIP_FIELD from '@salesforce/schema/Account.ShippingPostalCode'
import SHIPPING_COUNTRY_FIELD from '@salesforce/schema/Account.ShippingCountry'

const accountFields = [NAME_FIELD, OWNER_NAME_FIELD, PHONE_FIELD, INDUSTRY_FIELD, SHIPPING_STREET_FIELD, SHIPPING_CITY_FIELD, SHIPPING_ZIP_FIELD, SHIPPING_COUNTRY_FIELD]
export default class LightningMapExample extends LightningElement {
    @api recordId;
    accountName;
    loadMap=false;
    renderedCallback(){
        console.log('rendered callback called');
    }

    get mapheader() {
        return this.recordId?`Find Map for ${this.recordId} ${this.name} and ${this.ShippingStreetAddress}`:'loading..';
    }

    @wire(getRecord, { recordId: '$recordId', fields: accountFields, optionalFields: [PHONE_FIELD, OWNER_NAME_FIELD] })
    account;

    get name() {
        return getFieldValue(this.account.data, NAME_FIELD);
    }

    get phone() {
        return getFieldValue(this.account.data, PHONE_FIELD);
    }

    get industry() {
        return getFieldValue(this.account.data, INDUSTRY_FIELD);
    }

    get owner() {
        return getFieldValue(this.account.data, OWNER_NAME_FIELD);
    }

    get ShippingStreetAddress() {
        return getFieldValue(this.account.data, SHIPPING_STREET_FIELD);
    }

    get ShippingCityAddress() {
        return getFieldValue(this.account.data, SHIPPING_CITY_FIELD);
    }

    get ShippingZipAddress() {
        return getFieldValue(this.account.data, SHIPPING_ZIP_FIELD);
    }

    get ShippingCountryAddress() {
        return getFieldValue(this.account.data, SHIPPING_COUNTRY_FIELD);
    }

    get mapLocation() {
        let mapMarkers = [
            {
                location: {
                    City: this.ShippingCityAddress,
                    Country: this.ShippingCountryAddress,
                    PostalCode: this.ShippingZipAddress,
                    State: '',
                    Street: this.ShippingStreetAddress,
                },
                value: 'location001',
                title: 'The Landmark Building',
                description:
                    'The Landmark is considered to be one of the city&#39;s most architecturally distinct and historic properties', //escape the apostrophe in the string using &#39;
                icon: 'standard:account',
            },
        ];
        this.loadMap = true;
        return mapMarkers;
    }

    closeAction() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }

}