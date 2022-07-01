import omniscriptStep from 'omnistudio/omniscriptStep';
import pubsub from 'omnistudio/pubsub';
import { NavigationMixin } from 'lightning/navigation';


export default class OsCommunicateWithBaseMixin extends NavigationMixin(omniscriptStep) {
   
   pubsubPayload =   {
                        saveForLater: this.handleSaveForLater.bind(this)
                     };

    constructor() {
        super();
        pubsub.register('CustomChannel', this.pubsubPayload);
    }

    handleSaveForLater(){
        if (this._origActive){
            console.log('Save For Later Called');
            let QuoteOROppId = this.jsonData.ContextId;
            let ObjectName = 'Account';
            //window.alert('Record Id is '+this.jsonData.ContextId)
            console.log(''+QuoteOROppId+'***'+ObjectName);
            this[NavigationMixin.GenerateUrl]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: this.jsonData.ContextId,
                    actionName: 'view',
                },
             }).then(generatedUrl => {
               window.location.href = generatedUrl;
             });
            console.log(''+QuoteOROppId+'************'+ObjectName);
            pubsub.unregister('CustomChannel', this.pubsubPayload);
        }
    }

    disconnectedCallback() {
        pubsub.unregister('CustomChannel', this.pubsubPayload);
    }
}