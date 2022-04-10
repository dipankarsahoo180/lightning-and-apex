import { LightningElement, wire } from 'lwc';
import {  MessageContext, subscribe, unsubscribe,} from 'lightning/messageService';
import messageChannelName from '@salesforce/messageChannel/lms_comp__c';

export default class LwcSubscriber extends LightningElement {
    subsciberValue = "not yet subscribed"

    @wire(MessageContext)
    contextOfTheMessage

    connectedCallback(){
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel(){
        subscribe(this.contextOfTheMessage, messageChannelName,(message)=>{
            this.subsciberValue = message.textVariable;
        });
    }

}