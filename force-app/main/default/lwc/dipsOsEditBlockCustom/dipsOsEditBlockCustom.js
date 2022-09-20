import { LightningElement } from 'lwc';
import  OmniscriptEditBlock from 'omnistudio/omniscriptEditBlock';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
export default class DipsOsEditBlockCustom extends OmniscriptEditBlock {

    //save(){
    somethingElse(){
        super.save();
        console.log('this.jsonData');
        console.log(this.jsonData);
        console.log('this._oldData');
        console.log(this._oldData);
        if(this.jsonData?.Step1?.EditBlock1 !=null){
            console.log('this.jsonData?.Step1?.EditBlock1.length '+this.jsonData?.Step1?.EditBlock1.length);
            if(this.jsonData?.Step1?.EditBlock1.length == 1){
                //never possible
            }else if (this.jsonData?.Step1?.EditBlock1.length > 1) {
                let index  = this.jsonDef.index;
                let responseData = JSON.parse(JSON.stringify(this.jsonData.Step1.EditBlock1[index]));
                responseData.Block2.TextTwo = responseData.Block1.TextOne;
                let block1 = responseData.Block1;
                let block2 = responseData.Block2;
                console.log(responseData);
                this.applyCallResp({Block1:block1,Block2:block2});
            }else{
                console.log('Else Block');
                let editblock = JSON.parse(JSON.stringify(this.jsonData?.Step1?.EditBlock1));
                let block1 = editblock.Block1;
                let block2 = editblock.Block2;
                block2.TextTwo = block1.TextOne;
                console.log('Block1'); console.log(block1);
                console.log('Block2'); console.log(block2);
                this.applyCallResp({Block1:block1,Block2:block2});
            }
        }
    }
}