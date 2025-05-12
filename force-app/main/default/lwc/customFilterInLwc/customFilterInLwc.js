import { LightningElement, track, wire,api } from 'lwc';
import getAccountInfos from '@salesforce/apex/GetSObjectDetails.getAccountInfos';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import getAccounts from "@salesforce/apex/GetSObjectDetails.getAccounts";
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class CustomFilterInLwc extends LightningElement {
    @track accountInfos;
    @track recordTypes = [];
    @track picklists = [];
    @track valueList = [];
    @track accounts = [];
    _recordTypeId; // Private variable to hold the record type ID
    selectedField;
    allPicklistData;
    selectedPickValue;

    columns = [
        { label: 'Id', fieldName: 'Id', type: 'text' },
        { label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'Industry', fieldName: 'Industry', type: 'text' },
        { label: 'Active?', fieldName: 'IsActive__c', type: 'checkboxEmoji' }
    ];

    connectedCallback() {
        getAccountInfos()
            .then(result => {
                const clonedResult = JSON.parse(JSON.stringify(result)); //deep clone to make it mutable
                this.accountInfos = clonedResult;
                this.recordTypes = clonedResult?.recordTypes?.map((el, index) => ({...el,selected: index === 0})) || [];
                this.picklists = clonedResult?.picklists?.map((el, index) => ({ ...el, selected: index === 0 })) || [];
                this.selectedField = this.picklists.find(item => item.selected)?.fieldName;
                this.recordTypeId = this.recordTypes.find(item => item.selected)?.RecordTypeId;

            })
            .catch(err => console.error('Apex Error:', err));
    }

    @api
    get recordTypeId() {
        return this._recordTypeId;
    }

    set recordTypeId(value) {
        this._recordTypeId = value;
        // This will re-trigger the wire
    }

    pickTypeChangehandler(evt) {
        const selectedType = evt.target?.value;
        this.picklists = this.picklists.map(el => ({...el,selected: el.fieldName === selectedType}));
        this.selectedField = selectedType;
        this.recordTypeId = null;
        this.recordTypeId = this.recordTypes.find(item => item.selected)?.RecordTypeId;
        this.updateValueList();
    }

    recTypeChangehandler(evt) {
        const recType = evt.target?.value;
        this.recordTypes = this.recordTypes.map(el => ({ ...el,selected: el.RecordTypeId === recType }));
        this.recordTypeId = recType; // This will now trigger the wire
    }

    @wire(getPicklistValuesByRecordType, { objectApiName: ACCOUNT_OBJECT, recordTypeId: '$recordTypeId' })
    wiredPicklistValues({ error, data }) {
        if (data) {
            this.allPicklistData = data.picklistFieldValues;
            this.updateValueList();
        } else if (error) {
            console.error('Error in wire:', error);
        }
    }

    updateValueList() {
        this.valueList = this.allPicklistData[this.selectedField]?.values.map((val,idx) => ({
            label: val.label,
            name: val.value,
            selected: idx===0
        }));
        this.selectedPickValue = this.valueList[0]?.name;
    }

    pickValueChangehandler(evt){
        this.selectedPickValue = evt.target?.value;
        this.valueList = this.valueList.map(el => ({...el,selected: el.fieldName === this.selectedPickValue}));
    }
    
    handleGetRecords(){
        getAccounts({picklist:this.selectedField,picklistvalue:this.selectedPickValue, recordTypeId:this.recordTypeId})
            .then(result => {   
                this.accounts = result;
                console.log(result);
            })
            .catch(err => console.error('Apex Error:', err));
    }
}