import { LightningElement,wire,api } from 'lwc';
import { getObjectInfo, getPicklistValues, getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import { getRecord } from 'lightning/uiRecordApi';
import CONTACT_OBJECT  from "@salesforce/schema/Contact";
/* https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_lightning_ui_api_object_info */

export default class DipsWireService extends LightningElement {
    @api recordId;
    recordtypeId_Personal_Contact;
    recordtypeId_Business_Contact;

    BusinessContactLevelSelected="Secondary";
    personalContactlevelSelected="Secondary";

    personalContactLevel;
    businessContactLevel;


    handlepersonalContactlevelChange(event){
        this.personalContactlevelSelected = event.target.value;

    }
    handleBusinessContactLevelChange(event){
        this.BusinessContactLevelSelected = event.target.value;

    }

    get personalLevelOptions(){
        return this.personalContactLevel;
    }

    get businessLevelOptions(){
        return this.businessContactLevel;
    }

    @wire(getObjectInfo, { objectApiName: CONTACT_OBJECT})
    recordGetObjectInfo ({error, data}) {
        if (error) {
            // TODO: Error handling
        } else if (data) {
            // TODO: Data handling
            console.log('Data Found in recordGetObjectInfo');
            console.log(data);
            // Returns a map of record type Ids 
            let rtis = data.recordTypeInfos;
            //find recordtype Id based on recordtype name
            this.recordtypeId_Personal_Contact = Object.keys(rtis).find(rti => rtis[rti].name === 'Personal Contact');
            this.recordtypeId_Business_Contact = Object.keys(rtis).find(rti => rtis[rti].name === 'Business Contact');
            console.log(`Personal Contact ecordtype id is : ${this.recordtypeId_Personal_Contact}`);
            console.log(`Business Contact ecordtype id is : ${this.recordtypeId_Business_Contact}`);
        }
    }

        @wire(getPicklistValuesByRecordType, { objectApiName: CONTACT_OBJECT, recordTypeId: '$recordtypeId_Personal_Contact' })
        functionGetPicklistValuesByPersonalContactRecordType({error, data}){
            if (error) {
            } else if (data) {
                let options =  data.picklistFieldValues.Level__c.values.map(data=>{
                    return {
                        label:data.label,
                        value:data.value
                    }
                });
                console.log('Data Found in functionGetPicklistValuesBy PersonalContactRecordType');
                console.log(options);
                this.personalContactLevel = options;
            }
        }  

        @wire(getPicklistValuesByRecordType, { objectApiName: CONTACT_OBJECT, recordTypeId: '$recordtypeId_Business_Contact' })
        functionGetPicklistValuesByBusinessContactRecordType({error, data}){
            if (error) {
            } else if (data) {
                let options =  data.picklistFieldValues.Level__c.values.map(data=>{
                    return {
                        label:data.label,
                        value:data.value
                    }
                });
                console.log('Data Found in functionGetPicklistValuesBy BusinessContactRecordType');
                console.log(options);
                this.businessContactLevel =  options
                
            }
        }

}

