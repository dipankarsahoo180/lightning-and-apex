import { LightningElement, wire, api } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

export default class MyComponent extends LightningElement {

    @wire(CurrentPageReference)
    currentPageRef;

    @api name;
    @api email;
    @api phone;

    get name() {
        return this.currentPageRef.state.c__name;
    }

    get email() {
        return this.currentPageRef.state.c__email;
    }

    get phone() {
        return this.currentPageRef.state.c__phone;
    }
}