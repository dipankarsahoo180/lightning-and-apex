import { LightningElement,api,track} from 'lwc';
import omniscriptText from 'omnistudio/omniscriptText';
import templ from './lwcForOmniscriptText.html';

export default class LwcForOmniscriptText extends omniscriptText{
    count = 0;
    buttonlabel;
    allButtons;
    @track buttonlist=[];

    connectedCallback() {
        super.connectedCallback();
        this.buttonlabel = this.jsonDef.propSetMap.c_outernodes;
        this.allButtons = this.jsonDef.propSetMap.c_buttonLabels.split(",");
        for(let i=0;i<this.allButtons.length;i++){
            let obj = {
                "Id":i,
                "Name":this.allButtons[i],
            }
            this.buttonlist.push(obj);

        }
        console.log(this.buttonlist);

    }

    handleClick(event){
        //alert('Clicked on button '+ event.target.label );
        //this.count++;
        //console.log(this.jsonDef.propSetMap.c_outernodes + ' ' +this.count);
        //this.buttonlabel = this.jsonDef.propSetMap.c_outernodes+ ' ' +this.count;
        this.buttonlabel = event.target.label;
        this.applyCallResp(this.buttonlabel);
        console.log('and all the Buttons are ' + this.allButtons +'. And their type is '+typeof this.allButtons);
        console.log('JSON Data ');
        console.log(JSON.parse(JSON.stringify(this.jsonData)));
        console.log(this.jsonData);
    }
    render(){
        return templ;
    }

}