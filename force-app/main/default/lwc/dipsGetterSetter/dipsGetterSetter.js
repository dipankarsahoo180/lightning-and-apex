import {LightningElement,wire,api,track} from 'lwc';
export default class DipsGetterSetter extends LightningElement {
    
    @api recordId; //This is coming from parent. It is not the default recordId
    @track recordDetail;
    ageValue=10;

    get ContextId(){
        return `The Record Id is ${this.recordId}`;
    }

    @api
    uppercaseItemName;

    get playerName() {
        return this.uppercaseItemName.toUpperCase();
    }

    @api
    get userDetail(){
        console.log('Getter is called ');
        return  this.recordDetail;
    }

    set userDetail(somevalue){
        console.log('Setter is called ');
        let role = 'System ';
        this.recordDetail = {...somevalue, extra:'Dipankar Sahoo', role:role+' Administrator'}
        return this.recordDetail;
    }

    @api
    handleInvokeFromParent(){
        let extra = this.recordDetail.extra == 'Dipankar Sahoo'?'Lizu Sahoo':'Dipankar Sahoo';
        this.recordDetail=  {...this.recordDetail, extra:extra}
        this.uppercaseItemName = 'Big Show';
    }

    handleInvokeInParent(){
        this.dispatchEvent(new CustomEvent('customeventinchild',{detail:'It is Invoked from Child'}))
    }
}









































    // Setter works with only passed value from parent which is a object and not a primitive value(number or text)
    // You must have to give @api before getter or setter mandatorily.Else it would not work
    // Setter works only with Parent Child communication event
    // If setter is present if you give console.log or window.alert then,
    // you can see that getter never invokes, only setter gets invoked