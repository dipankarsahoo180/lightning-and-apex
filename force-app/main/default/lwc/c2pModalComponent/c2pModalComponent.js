import { LightningElement } from 'lwc';

export default class C2pModalComponent extends LightningElement {

    closeHandlerModal(){ 
        window.alert('closeHandlerModal is called from modal')
        const myEvent = new CustomEvent('close', { 
            bubbles:true,
            detail: { 
                msg:"Modal Closed Successfully!!"
            }
        })
        this.dispatchEvent(myEvent)
    }

    footerHandler(){ 
        window.alert("footerHandler called")
    }
}