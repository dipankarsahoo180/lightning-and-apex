import { LightningElement } from 'lwc';

export default class C2pParentComponent extends LightningElement {
    showModal = false
    msg
    connectedCallback(){
        this.template.addEventListener('close',this.closeHandler.bind(this))
    }
    clickHandler(){ 
        this.showModal = true
    }
    closeHandler(event){ 
        this.msg = event.detail.msg
        this.showModal = false
    }

    closeHandlerSomethingElse(){
        window.alert('closeHandlerSomethingElse is called')
    }
}