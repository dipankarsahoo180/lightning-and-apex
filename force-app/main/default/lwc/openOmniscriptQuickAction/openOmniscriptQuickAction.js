import { LightningElement,api,track } from 'lwc';
export default class OpenOmniscriptQuickAction extends LightningElement {

    @api recordId;
    connectedCallback() {
        console.log('record Id from get prefill in connected callback----> ',this.recordId);
    }
    renderedCallback(){
        console.log('record Id from get prefill in rendered callback----> ',this.recordId);
    }  

    get prefill(){
        return {
            "ContextId" : this.recordId
        }
    }

}