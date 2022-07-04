import { LightningElement,wire,api } from 'lwc';
import Id from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi';
import UserNameFld from '@salesforce/schema/User.Name';
import userEmailFld from '@salesforce/schema/User.Email';
import userIsActiveFld from '@salesforce/schema/User.IsActive';
import userAliasFld from '@salesforce/schema/User.Alias';

export default class DipsGetterSetterParent extends LightningElement {

    @api recordId;
    userId = Id;
    currentUserName;
    currentUserEmailId;
    currentIsActive;
    currentUserAlias;
    error;
    setterValue;
    userDetail;

    @wire(getRecord, { recordId: Id, fields: [UserNameFld, userEmailFld, userIsActiveFld, userAliasFld ]}) 
    userDetails({error, data}) {
        if (data) {
            this.currentUserName = data.fields.Name.value;
            this.currentUserEmailId = data.fields.Email.value;
            this.currentIsActive = data.fields.IsActive.value;
            this.currentUserAlias = data.fields.Alias.value;
            this.userDetail = {
                name: this.currentUserName,
                email: this.currentUserEmailId
            }
        } else if (error) {
            this.error = error ;
        }
    }

    handleInvokeInChild(event){
        let invokedFrom = event.detail == 'It is Invoked from Child' ?event.detail : 'It is Invoked from Parent'
        window.alert('It will change the extra property in child '+invokedFrom);
        let child = this.template.querySelector('c-dips-getter-setter');
        child.handleInvokeFromParent();
    }

}