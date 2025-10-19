import { LightningElement,track } from 'lwc';
import pubsub from 'omnistudio/pubsub';
import util from 'omnistudio/utility';
import {OmniscriptBaseMixin} from 'omnistudio/omniscriptBaseMixin';
export default class OmniscriptBasemixinCallIp extends OmniscriptBaseMixin(LightningElement) {
    
    @track selectedContacts=[];
    @track deletedContact;

    //event handler object: contains list of all the pubsub events
    pubsubPayload = {
        update: this.handleUpdateContacts.bind(this), //update is the event name set in the flexcard along with channel name flexcard_datatable_row
        checkboxChanged: this.handleUpdateSelectedContacts.bind(this), //checkboxChanged is the event name set in the flexcard along with channel name flexcard_selected_row
        deleteContact: this.handleRemoveDeletedContacts.bind(this), //can be used as per need. deleteContact is the event name set in the flexcard along with channel name flexcard_action_delete_contact.
        data: this.omniNextStep.bind(this), //if event fired go to next step
    };

    //register the pubsub channels
    connectedCallback() {
        pubsub.register('flexcard_datatable_row', this.pubsubPayload); //flexcard_datatable_row is pubsub channel name, this.pubsubPayload contains the event
        pubsub.register('flexcard_selected_row', this.pubsubPayload);
        pubsub.register('flexcard_action_delete_contact', this.pubsubPayload);
        pubsub.register("omniscript_action", this.pubsubPayload);
        let jsonData = JSON.parse(JSON.stringify(this.omniJsonData));
        this.selectedContacts = jsonData.Step1?.selectedContacts || [];
        this.Contacts = jsonData.Contacts || [];
        if(this.selectedContacts?.length >0){
            this.Contacts?.forEach(el=>el.selectrow = false);
            this.omniApplyCallResp({Contacts:this.Contacts});
        }
    }

    omniNextStep(){
        super.omniNextStep();
    }

    //dynamically add/update the omniscript json with the selected rows contacts
    handleUpdateSelectedContacts(evt){
        console.warn('selected row',JSON.parse(JSON.stringify(evt?.selectedRow)));
        const result = evt?.selectedRow;
        if(result.selectrow){ //for individual rows checkbox selected
            this.selectedContacts.push(result);
        }else if(evt?.selectedRow === "all"){ //if top check box is selected to select all rows
            this.selectedContacts = evt.records;
            this.selectedContacts = this.selectedContacts?.map(el=> ({...el, selectrow : true}));
        }else if(evt?.selectedRow === "none"){ //if top check box is selected to de-select all rows
            this.selectedContacts = [];
        }
        else{
            this.selectedContacts = this.selectedContacts.filter(el=>el.Id != result.Id); //for individual rows checkbox de-selected
            //if (this.selectedContacts?.length === 0) pubsub.fire('pubsub_refresh_card','refresh_state',{});
        }
        this.selectedContacts = this.selectedContacts?.filter((obj, index, self) => index === self?.findIndex((o) => o?.Id === obj?.Id)); //to filter out duplicates
        this.Contacts = this.Contacts?.map(originalContact=>{
            if(this.selectedContacts?.find(el=>el.Id==originalContact.Id)?.selectrow == true) originalContact.selectrow = true;
            else originalContact.selectrow = false;
            return originalContact;
        });
        this.omniApplyCallResp({Contacts:this.Contacts});
        //this.selectedContacts.sort((a, b)=>{return parseInt(a.originalIndex) - parseInt(b.originalIndex)}); //sort the results based on index
        console.log('this.selectedContacts ',JSON.parse(JSON.stringify(this.selectedContacts)));
        this.omniUpdateDataJson(this.selectedContacts, true); //update omniscript with the selected rows
    }

    //removes the deleted row from data table from json of omniscript.
    handleRemoveDeletedContacts(evt){
        console.warn('deleted row',JSON.parse(JSON.stringify(evt?.inputPayload)));
        const result = evt?.inputPayload;
        this.deletedContact = result;
        this.selectedContacts = this.selectedContacts.filter(el=>el.Id != result.Id); //remove deleted contact from selected rows list
        this.omniUpdateDataJson(this.selectedContacts, true); //update omniscript after removing deleted row
    }

    //updates the data updated through data table using an integration procedure.
    handleUpdateContacts(evt){
        console.log('Full Payload is ',evt?.FullPayload, typeof evt.FullPayload, Array.isArray(evt.FullPayload));
        const Payload = evt.FullPayload?.filter(el=>el.Id != this.deletedContact?.Id);
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

    //un-register the pubsub channels
    disconnectedCallback() {
        pubsub.unregister('flexcard_datatable_row', this.pubsubPayload);
        pubsub.unregister('flexcard_selected_row', this.pubsubPayload);
        pubsub.unregister('flexcard_action_delete_contact', this.pubsubPayload);
    }
}