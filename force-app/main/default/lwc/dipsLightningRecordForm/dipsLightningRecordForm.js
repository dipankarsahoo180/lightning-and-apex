import { LightningElement,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import ACCOUNT_OBJECT  from "@salesforce/schema/Account";
import Name_Field from '@salesforce/schema/Account.Name';
import Source_Field from '@salesforce/schema/Account.AccountSource';
import Type_Field from '@salesforce/schema/Account.Type';
import Industry_Field from '@salesforce/schema/Account.Industry';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DipsLightningRecordForm extends NavigationMixin(LightningElement) {
    @api recordId;
    Objectname = ACCOUNT_OBJECT;
    Account_Field_List = [Name_Field,Industry_Field,Type_Field,Source_Field];
    AccountRecordId;

    get AccountId(){
        return this.recordId?this.recordId: this.AccountRecordId;
    }
    successHandler(event){
        this.AccountRecordId = event.detail.id;
        this.dispatchEvent(new ShowToastEvent(
            {
            title: "Sucessful!!!",
            message: "Account Created with ID "+event.detail.id,
            variant: "Success"
            }
        ));

    }
}