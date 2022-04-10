import { LightningElement, api } from 'lwc';

export default class Page extends LightningElement {
    @api page;

    connectedCallback() {
        this.setAttribute('class', 'page-el');
    }

    renderedCallback(){
        //let div = this.template.querySelector("[data-id='mydiv']");
        //console.log('my div content', div.innerHTML);
    }
}