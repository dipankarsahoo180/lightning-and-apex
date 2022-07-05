import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import messageChannelName from '@salesforce/messageChannel/dips_lms_comp__c';

export default class DipsLmsPublisher extends LightningElement {

    inputValue;

    @wire(MessageContext)
    contextOfTheMessage

    handlePublisherInput(event){
        this.inputValue = event.target.value;
        const publishedValues = {
            dipsFieldOne : this.inputValue
        };
        publish(this.contextOfTheMessage, messageChannelName, publishedValues);
    }
}