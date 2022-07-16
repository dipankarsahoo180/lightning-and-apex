import { LightningElement,api } from 'lwc';
import CONTACT_OBJECT  from "@salesforce/schema/Contact";
import FirstName_Field from '@salesforce/schema/Contact.FirstName';
import LastName_Field from '@salesforce/schema/Contact.LastName';
import Account_Field from '@salesforce/schema/Contact.AccountId';
import Email_Field from '@salesforce/schema/Contact.Email';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class DipsRecordEditForm extends LightningElement {
    @api recordId;
    ObjectAPIName = CONTACT_OBJECT;
    flag = false;
    fields = {
                FirstName_Field:FirstName_Field,
                LastName_Field:LastName_Field,
                Account_Field:Account_Field,
                Email_Field: Email_Field
            }
    contactId;

    get isRecordPage(){
        return this.recordId? true:false;
    }

    get contactRecordID(){
        return this.contactId?this.contactId:this.recordId;
    }

    recordEditFormHandler(event){
        this.flag = !(this.flag);
        this.contactId = event.detail.id
        console.log(event); //this event has a whole lot of details
    }

    cancelRecordEditForm(){
        let inputFields = this.template.querySelectorAll("lightning-input-field")
        if(inputFields){
            Array.from(inputFields).forEach(field=>field.reset());
        }
    }

    recordEditFormHandleError(event){
        let errorMsg = ''
        event.detail.output.fieldErrors.Name.forEach(value=>{
            errorMsg = value.fieldLabel + " : "+ value.message;
            this.dispatchEvent(new ShowToastEvent(
                {
                title: "Errorr!!!",
                message: errorMsg,
                variant: "Error"
                }
            ));
        });
        
    }
}
