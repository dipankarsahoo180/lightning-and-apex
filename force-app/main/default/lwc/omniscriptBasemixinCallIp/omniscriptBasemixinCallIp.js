import { LightningElement,track } from 'lwc';
import pubsub from 'omnistudio/pubsub';
import util from 'omnistudio/utility';
import {OmniscriptBaseMixin} from 'omnistudio/omniscriptBaseMixin';
export default class OmniscriptBasemixinCallIp extends OmniscriptBaseMixin(LightningElement) {
    
    @track selectedContacts=[];
    @track deletedContact;

    //event name: handlerName
    pubsubPayload = {
        update: this.handleUpdateContacts.bind(this),
        checkboxChanged: this.handleUpdateSelectedContacts.bind(this),
        deleteContact: this.handleRemoveDeletedContacts.bind(this),
    };

    connectedCallback() {
        pubsub.register('flexcard_datatable_row', this.pubsubPayload); //flexcard_datatable_row = channel name
        pubsub.register('flexcard_selected_row', this.pubsubPayload);
        pubsub.register('flexcard_action_delete_contact', this.pubsubPayload); 
        this.selectedContacts = this.omniJsonData?.selectedContacts || [];
    }

    handleUpdateSelectedContacts(evt){
        console.warn('selected row',JSON.parse(JSON.stringify(evt?.selectedRow)));
        const result = evt?.selectedRow;
        if(result.selectrow){
            this.selectedContacts.push(result);
        }
        else{
            this.selectedContacts = this.selectedContacts.filter(el=>el.ContactId != result.ContactId);
        }
        this.selectedContacts.sort((a, b)=>{return parseInt(a.originalIndex) - parseInt(b.originalIndex)});
        this.omniApplyCallResp({Step1:{selectedContacts:this.selectedContacts}});
    }

    handleRemoveDeletedContacts(evt){
        console.warn('deleted row',JSON.parse(JSON.stringify(evt?.inputPayload)));
        const result = evt?.inputPayload;
        this.deletedContact = result;
        this.selectedContacts = this.selectedContacts.filter(el=>el.ContactId != result.ContactId);
        this.omniApplyCallResp({Step1:{selectedContacts:this.selectedContacts}});
    }

    handleUpdateContacts(evt){
        console.log('Full Payload is ',evt?.FullPayload, typeof evt.FullPayload, Array.isArray(evt.FullPayload));
        const Payload = evt.FullPayload?.filter(el=>el.ContactId != this.deletedContact?.ContactId);
        const input = {
            ContactList: Payload
        };

        //IP Call Starts
        //This request alson needs to be stringified again
        let request_getIPRemote = {
            type: "IntegrationProcedures",
            value: {
                ipMethod: "flexcard_updateContact",
                optionsMap: "{}",
                inputMap: "{}"
            }
        };

        //Stringify the input
        request_getIPRemote.value.inputMap = JSON.stringify(input);

        util.getDataHandler(JSON.stringify(request_getIPRemote)).then((result) => {
            result = JSON.parse(result);  
            console.log('Response ',result);
            let resp = result.IPResult || '';
            console.log('IP result is ',resp);
        }).catch((error)=>{
            console.log ('IP error is : ',error);
        })
    }

    disconnectedCallback() {
        pubsub.unregister('flexcard_datatable_row', this.pubsubPayload);
        pubsub.unregister('flexcard_selected_row', this.pubsubPayload);
        pubsub.unregister('flexcard_action_delete_contact', this.pubsubPayload);
    }
}