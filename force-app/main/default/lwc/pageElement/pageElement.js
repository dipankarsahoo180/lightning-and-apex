import { LightningElement, api } from 'lwc';

export default class PageElement extends LightningElement {

    @api element; 

    get isText(){
        return this.element.type == 'text' ; 
    }

    get isSelect(){
        return this.element.type == 'select';
    }

   

}