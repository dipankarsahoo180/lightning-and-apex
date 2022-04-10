import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import messageChannelName from '@salesforce/messageChannel/lms_comp__c';

export default class LwcPublisher extends LightningElement {
    publisherInput;

    inputValue;

    @wire(MessageContext)
    contextOfTheMessage

    handlePublisherInput(event){
        this.inputValue = event.target.value;
        const publishedValues = {
            textVariable : this.inputValue
        };
        publish(this.contextOfTheMessage, messageChannelName, publishedValues);
    }
}