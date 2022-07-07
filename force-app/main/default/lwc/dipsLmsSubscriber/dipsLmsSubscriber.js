import { LightningElement,wire } from 'lwc';
import {  MessageContext, subscribe, unsubscribe,} from 'lightning/messageService';
import messageChannelName from '@salesforce/messageChannel/dips_lms_comp__c';

export default class DipsLmsSubscriber extends LightningElement {
    subsciberValue = "not yet subscribed"

    @wire(MessageContext)
    contextOfTheMessage

    connectedCallback(){
        this.subscribeToMessageChannel();
    }

    disconnectedCallback(){
        unsubscribe(this.subscription);
    }

    subscribeToMessageChannel(){
        if(!this.subscription){
            this.subscription = subscribe(this.contextOfTheMessage, messageChannelName,(message)=>{
                this.subsciberValue = message.dipsFieldOne.value;
            });
        }
        
    }
}