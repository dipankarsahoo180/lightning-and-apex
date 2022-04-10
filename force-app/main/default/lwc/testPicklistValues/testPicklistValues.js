import { LightningElement, wire,track,api } from 'lwc';
import getPickListValues from '@salesforce/apex/PicklistHelper.getPickListValues';
import templateOne from './renderOne.html';
import templateTwo from './renderTwo.html';
import defaultTemplate from './testPicklistValues.html';

export default class TestPicklistValues extends LightningElement {
    @track TypeOptions;
    value;
    label;
    @api ObjectName='Lead';
    @api FieldName='CleanStatus';
    errorOccured;
    templateToRender = 'None';

    @wire(getPickListValues, {"objApiName":"$ObjectName","fieldName":"$FieldName"})
    AnyfunctionName({ error, data }) {
 
        if (data) {
            try {
                let Options =[];
                console.log('data returned from apex is '+JSON.stringify(data));
                for(let i=0;i<data.length;i++){
                    Options.push({'label':data[i]['label'],'value':data[i]['value']});
                } 
                this.TypeOptions = Options;
                this.value = data.length>0?Options[0].value:"Incorrect Input Value";
                this.label = data.length>0?Options[0].label:"Incorrect Input Value";

            } catch (error) {
                console.error('check catch error here', error);
                this.errorOccured = JSON.stringify(error);
                this.value = "Nothing Value";
                this.label = "Nothing label";
            }
        } else if (error) {
            console.error('check else if error here', error);
          }
 
    }

    handleClick(){
        let nameOfObject = this.template.querySelector("lightning-input[data-id='ObjectName']").value;
        let nameOfField = this.template.querySelector("lightning-input[data-id='FieldsName']").value;
        this.ObjectName = nameOfObject;
        this.FieldName = nameOfField;
        //refreshApex(this.getPickListValues);
    

    }
    constructor(){
        super();
        console.log('CONSturctor');
    }
    render(){
        console.log('rendering template');
        return  this.templateToRender=="One"?templateOne : this.templateToRender=="Two"?templateTwo:defaultTemplate
    }
    renderedCallback(){
        console.log('Rendered callback');
    }

    connectedCallback() {
        console.log('COnnected callback');
    }
 
    handleChange(event) {
        // Get the string of the "value" attribute on the selected option
        this.value = event.target.value;
        for(let i=0;i<event.target.options.length;i++){
            if(event.target.options[i].value == this.value){
                this.label = event.target.options[i].label;
                break;
            }
        }
    }

    handleClickToRenderOne(){
        this.ObjectName = 'Account';
        this.FieldName = 'Industry';
        this.templateToRender="One";
    }

    handleClickTorenderTwo(){
        this.ObjectName = 'Lead';
        this.FieldName = 'Status';
        this.templateToRender="Two";
    }
    handleClickTorenderDefault(){
        this.ObjectName = 'Lead';
        this.FieldName = 'CleanStatus';
        this.templateToRender="None";
    }
}