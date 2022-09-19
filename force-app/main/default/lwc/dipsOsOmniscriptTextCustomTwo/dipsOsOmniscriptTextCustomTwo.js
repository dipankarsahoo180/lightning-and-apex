import { LightningElement,api } from 'lwc';
import OmniscriptText from 'omnistudio/omniscriptText';
import OmniscriptNumber from 'omnistudio/omniscriptNumber';
import pubsub from 'omnistudio/pubsub';
import tmpl from './dipsOsOmniscriptTextCustomTwo.html';

export default class DipsOsOmniscriptTextCustomTwo extends OmniscriptNumber {
    //BlockName --Set inside the json data of text field
    // required;
    pubsubPayload =   {
        HandleChangeInBlockOne: this.HandleChangeInBlockOne.bind(this)
     };
    
    constructor() {
        super();
        pubsub.register('ChannelForFireBlockTwoTextTwo', this.pubsubPayload);
    }

    HandleChangeInBlockOne(event){
        this.saveDataIntoBlocktwoOfEditBlock(event.detail);
    }

    saveDataIntoBlocktwoOfEditBlock(detail){
        let currentIndex = parseInt(this.jsonDef.JSONPath[(this.jsonDef.JSONPath.lastIndexOf(this.jsonDef.propSetMap.BlockName)-2)])-1;
        console.log('Current index is : '+currentIndex);
        console.log(currentIndex == detail.BlockOneIndex);
        let blockOneIndex = detail.BlockOneIndex;
        // this.required = false;
        if(currentIndex == blockOneIndex){
            this.applyCallResp(detail.value, true,false);
        }
        console.log('Pubsub handle Complete');
    }

    // renderedCallback(){
    //     super.renderedCallback();
    //     this.required = this.jsonDef.propSetMap.required;
    // }

    // render(){
    //     return tmpl;
    // }

    disconnectedCallback() {
        super.disconnectedCallback();
        pubsub.unregister('ChannelForFireBlockTwoTextTwo', this.pubsubPayload);
    }
}