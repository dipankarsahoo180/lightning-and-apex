import { LightningElement } from 'lwc';

export default class ShadowDomStyling extends LightningElement {
    isLoaded = false
    renderedCallback(){
        if(this.isLoaded) return
        const style = document.createElement('style')
        style.innerText = `c-shadow-dom-styling .shadow-btn .slds-button{background: red;color: white;}`
        this.template.querySelector('.css-div-only').appendChild(style)
        this.isLoaded = true
    }
    clickhandler(){
        alert('Clicked');
    }
}