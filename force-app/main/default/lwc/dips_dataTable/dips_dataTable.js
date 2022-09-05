import { LightningElement,wire } from 'lwc';
import generateContacts from '@salesforce/apex/generateData.generateContacts'

const columns = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'First Name', fieldName: 'FirstName', type: 'text' },
    { label: 'Last Name', fieldName: 'LastName', type: 'text' },
    { label: 'Created Date', fieldName: 'CreatedDate', type: 'date' },
    {   label: 'Email', 
        fieldName: 'Email', 
        type: 'clickableEmail',
        typeAttributes:{
            recordId:{
                fieldName: 'Id'
            }
        }   
    },
];

export default class Dips_dataTable extends LightningElement {

    data = [];
    columns = columns;
    dataFound = false;

    handleFetchContacts(){
        if(this.data.length == 0){
            generateContacts().then(data=>{
            console.log('data found');
            console.log(data);
            this.data = data;
            this.dataFound = true;
            }).catch(error=>{
                console.log('error found');
                console.log(error);
            });
        }else{
            this.dataFound = true;
        } 
    }
    handleHideContacts(){
        this.dataFound = false;

    }

    @wire(generateContacts)
    contactList(data,error){
        if(data){
            console.log('data found');
            console.log(data);
            this.dataFound = true;
            this.data = data.data;
        }else{
            console.log('error found');
            console.log(error);
        }
    }
}