import { LightningElement,api } from 'lwc';
export default class ParentComponent extends LightningElement {
    parentName = ' not yet received';
    childvalue = ' not yet received';

    @api
    handleClickFromParent(Name) {
        this.parentName = Name.toUpperCase();
        this.template.querySelector('c-child-component').handleClickFromParent(this.parentName);
    }

    handleChildCustomEvent(event){
        this.childvalue = event.detail.toUpperCase();
    }

}