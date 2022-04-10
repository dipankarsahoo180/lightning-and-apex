import { LightningElement,api } from 'lwc';
export default class ChildComponent extends LightningElement {
    parentName = ' not yet received';
    name ;

    @api
    handleClickFromParent(Name) {
        this.parentName = Name.toUpperCase();
    }

    handleButtonClickChild(event){
        this.name = this.template.querySelector('.input-name').value;
        const myEvent = new CustomEvent('customeventchild',
                                        {detail:this.name,
                                        bubbles:true,
                                        composed: true}
        )
        this.dispatchEvent(myEvent);
    }
}