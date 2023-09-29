import { LightningElement } from "lwc";
import { OmniscriptBaseMixin } from "omnistudio/omniscriptBaseMixin"; //replace omnistudio with vlocity_ins if you use vlocity
import util from "omnistudio/utility";

export default class OmniscriptBaseMixinCallDr extends OmniscriptBaseMixin(
  LightningElement
) {
  //Prepare your request
  callDataraptor() {
    let request_data = {
      type: "DataRaptor",
      value: {
        bundleName: "DRExtractAccountContactDetails",
        inputMap: "{}",
        optionsMap: "{}"
      }
    };
    //Add input to your request(you can add single/multiple input params)
    request_data.value.inputMap = JSON.stringify({
      AccountId: this.omniJsonData.ContextId,
      recordId: this.omniJsonData.ContextId
    });
    //Call your dataraptor
    util
      .getDataHandler(JSON.stringify(request_data))
      .then((result) => {
        //Get the result and do your post processing
        const jsonResult = JSON.parse(result);
        console.warn(jsonResult);
        //load the data back into omniscript (if you want to)
        this.omniApplyCallResp({ jsonNodeName: jsonResult });
      })
      .catch((err) => {
        //Handle your errors
        console.log("error is ", err);
      });
  }
}
