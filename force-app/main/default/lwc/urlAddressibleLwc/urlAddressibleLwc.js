import { LightningElement,wire } from 'lwc';
import {CurrentPageReference} from 'lightning/navigation';
export default class UrlAddressibleLwc extends LightningElement {

    data;
    @wire(CurrentPageReference)
    pageRef(currentPageReference){
        console.log('OUTPUT : ',JSON.stringify(currentPageReference));
        this.data = JSON.stringify(currentPageReference);
    }

    
}