import { LightningElement } from 'lwc';

export default class DipsLwcDocumentModel extends LightningElement {

    domHandler(){
        this.template.querySelector('.manual-dom').innerHTML = '<p> Okey dokey!!</p>'
    }
}