import { LightningElement,api} from 'lwc';
import OmniscriptText from 'omnistudio/omniscriptText';
import OmniscriptNumber from 'omnistudio/omniscriptNumber';
import pubsub from 'omnistudio/pubsub';

export default class DipsOsOmniscriptTextCustomOne extends OmniscriptNumber {

    //BlockName --Set inside the json data of text field
    handleBlur(evt) {
        this.applyCallResp(evt.target.value);
        let currentIndex = parseInt(this.jsonDef.JSONPath[(this.jsonDef.JSONPath.lastIndexOf(this.jsonDef.propSetMap.BlockName)-2)])-1;
        console.log('Current index is : '+currentIndex);
        console.log('Event firing ');
        pubsub.fire("ChannelForFireBlockTwoTextTwo", "HandleChangeInBlockOne", 
        {
            detail:{
                BlockOneIndex : currentIndex,
                value : evt.target.value
            }
        });
    }
}