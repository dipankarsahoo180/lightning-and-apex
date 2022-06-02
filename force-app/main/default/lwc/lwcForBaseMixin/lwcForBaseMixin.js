import { LightningElement,api} from 'lwc';
import {OmniscriptBaseMixin} from 'omnistudio/omniscriptBaseMixin';

export default class LwcForBaseMixin extends OmniscriptBaseMixin(LightningElement ) {
    omnijson;
    apinameeee;
    namedata;

    get nameeee(){
        console.log('getter called and name is '+this.apinameeee);
        return this.apinameeee;
    }

    @api
    set nameeee(data){
        console.log('Setter called and name is '+data+' '+this.count);
        this.namedata =data;
        this.apinameeee = data;
        this.handleClick();
        return this.apinameeee;
    }

    handleClick(){
        this.omnijson = {...this.omniJsonData, buttonClicked : this.apinameeee,lwcAPIMessage:`You have clicked on ${this.apinameeee}`}
        this.omniApplyCallResp(this.omnijson);
        if(this.namedata =='previous'){
            alert('There is no going back');
            return;
            }
        else if(this.namedata =='Dummy Text'){
            return;
            }
        else{
            this.omniNextStep();
            }
    }

}