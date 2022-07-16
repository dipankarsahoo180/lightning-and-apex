import { LightningElement,api } from 'lwc';
import ACCOUNT_OBJECT  from "@salesforce/schema/Account";
import Name_Field from '@salesforce/schema/Account.Name';
import Source_Field from '@salesforce/schema/Account.AccountSource';
import Type_Field from '@salesforce/schema/Account.Type';
import Industry_Field from '@salesforce/schema/Account.Industry';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class DipsRecordViewForm extends LightningElement {
    Objectname = ACCOUNT_OBJECT;
    Name_Field = Name_Field
    Industry_Field = Industry_Field
    Type_Field =  Type_Field
    Source_Field = Source_Field;
    @api recordId;
}