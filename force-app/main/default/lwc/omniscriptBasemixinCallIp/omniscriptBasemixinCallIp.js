import { LightningElement,track } from 'lwc';
import pubsub from 'omnistudio/pubsub';
import util from 'omnistudio/utility';
import {OmniscriptBaseMixin} from 'omnistudio/omniscriptBaseMixin';
export default class OmniscriptBasemixinCallIp extends OmniscriptBaseMixin(LightningElement) {
    
    @track selectedContacts=[];
    //update - event name
    //handleUpdateContacts - handler to call
    pubsubPayload = {
        update: this.handleUpdateContacts.bind(this),
        checkboxChanged: this.handleUpdateSelectedContacts.bind(this),
    };

    connectedCallback() {
        pubsub.register('flexcard_datatable_row', this.pubsubPayload); //flexcard_datatable_row = channel name
        pubsub.register('flexcard_selected_row', this.pubsubPayload); //flexcard_datatable_row = channel name
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
        this.omniApplyCallResp({selectedContacts:this.selectedContacts});
    }

    handleUpdateContacts(evt){
        console.log('Full Payload is ',evt?.FullPayload)
        const input = {
            ContactList: evt.FullPayload
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
            let resp = result.IPResult?.IP_RatingArea || '';
            console.log('IP result is ',result.IPResult);
        }).catch((error)=>{
            console.log ('IP error is : ',error);
        })
    }

    disconnectedCallback() {
        pubsub.unregister('flexcard_datatable_row', this.pubsubPayload);
        pubsub.unregister('flexcard_selected_row', this.pubsubPayload);
    }
}