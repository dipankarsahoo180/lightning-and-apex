import { LightningElement,track,wire } from 'lwc';
import getAccounts from '@salesforce/apex/testgetAccounts.getAccounts';
export default class TestLwcComponent extends LightningElement {

    name='';
    @track Accounts;

    handleSetName(evt){
        this.name =`%${evt.target.value}%`;
    }

    handlegetAccountsFromApex(){
        getAccounts({AccountName:`${this.name}`}).then(result=>{
            if(result){
                console.log('imp result is',result);
                this.Accounts = result;
            }
        }
        ).catch(error=>{
            console.log('imp error is ',error);
            this.Accounts=[];
            this.error = error;
        })
    }

    @wire(getAccounts,{"AccountName":"$name"})
    getData({error,data}){
        console.log('wire result is',data,error);
        if(data)this.Accounts = data;
        else this.Accounts = []
    }

}