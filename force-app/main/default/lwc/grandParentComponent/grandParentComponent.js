import { LightningElement } from 'lwc';
export default class GrandParentComponent extends LightningElement {
    name ;
    childvalue = ' not yet received';
    constructor(){
        super();
        this.template.addEventListener('customeventchild',this.handleChildEvent.bind(this))
    }

    handleChildEvent(event){
        this.childvalue = event.detail.toUpperCase();
    }
    handleButtonClick(event){
        this.name = this.template.querySelector('.input-name').value;
        this.template.querySelector('c-parent-component').handleClickFromParent(this.name);
    }

}