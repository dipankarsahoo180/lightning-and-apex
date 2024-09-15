import { LightningElement,api } from 'lwc';

export default class FlexCardLwcDemo extends LightningElement {
    @api hardCodedId;
    @api allRecords;
    @api myRecord;
    @api user;
    @api myAccountName;

    get accountName(){
        return this.myRecord? this.myRecord?.Name:"";
    }
    get record(){
        return this.myRecord? JSON.stringify(this.myRecord):"";
    }
    get userData(){
        return this.user? JSON.stringify(this.user):"";
    }
    get records(){
        return this.allRecords? JSON.stringify(this.allRecords):"";
    }
}
