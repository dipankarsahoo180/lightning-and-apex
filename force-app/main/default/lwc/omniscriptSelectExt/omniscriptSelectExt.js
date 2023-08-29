import util from 'omnistudio/utility';
import OmniscriptSelect from 'omnistudio/omniscriptSelect';
export default class OmniscriptSelectExt extends OmniscriptSelect {

    connectedCallback(){
        super.connectedCallback();
        this._realtimeOptions =[];
        const AccountId = this.jsonData.ContextId;
        this.handleUpdateContacts(AccountId);
    }

    handleUpdateContacts(AccountId){
        const input = {
            AccountId: AccountId
        };

        //IP Call Starts
        //This request alson needs to be stringified again
        let request_getIPRemote = {
            type: "IntegrationProcedures",
            value: {
                ipMethod: "sample_picklistMapCreation",
                optionsMap: "{}",
                inputMap: "{}"
            }
        };

        //Stringify the input
        request_getIPRemote.value.inputMap = JSON.stringify(input);

        util.getDataHandler(JSON.stringify(request_getIPRemote)).then((result) => {
            result = JSON.parse(result);  
            let resp = result.IPResult || '';
            //In our case PicklistValueList is the node in which IP returns the picklistValues
            this._realtimeOptions = resp?.PicklistValueList?.map(el=>{
                return {label:el.value,value:el.name}
            })|| [];
            console.log('IP result is ',resp);
        }).catch((error)=>{
            console.log ('IP error is : ',error);
        })
    }

}