import { LightningElement, api } from 'lwc';

export default class DisplayAssesmentResponseInFlow extends LightningElement {
    _response;

    get response(){
        return this._response;
    }

    @api
    set response(value){
        let data = JSON.parse(value)
        let omniscriptName = Object.keys(data)[0]
        console.log(omniscriptName);

        let steps = Object.keys(data[omniscriptName]);
        steps = steps.map((step)=>data[omniscriptName][step]);
        steps = steps.map((step)=>{
            let keys = Object.keys(step["value"])?.map((key)=>{
                return {
                    unique_key: key,
                    question: step["value"][key]["label"],
                    response: step["value"][key]["value"]
                }
            })
            return {
                label: step["label"],
                value: keys
            }
        })
        this._response = steps;
    }
}