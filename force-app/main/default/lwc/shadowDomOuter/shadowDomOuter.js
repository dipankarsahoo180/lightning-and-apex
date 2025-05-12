import { LightningElement } from 'lwc';

export default class ShadowDomOuter extends LightningElement {
    isRenderedOnce = false;
    static shadowSupportMode = 'native';

    renderedCallback() {
        if(!this.isRenderedOnce){
            this.template.querySelectorAll("h1").forEach(el => {
                el.style.backgroundColor = "red";
                el.style.color = "white";
                el.classList.add("slds-text-heading_large");
                el.classList.add("slds-var-p-around_medium");
                el.classList.add("slds-var-m-vertical_medium");
            });
        }
        this.isRenderedOnce = true;
    }
}