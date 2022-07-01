import { LightningElement, api, track, wire } from 'lwc';
import omniscriptSaveForLaterAcknowledge from 'omnistudio/omniscriptSaveForLaterAcknowledge';
import lwcSaveForLaterRedirect from './lwcSaveForLaterRedirect.html';
import pubsub from 'omnistudio/pubsub';

export default class LwcSaveForLaterRedirect extends omniscriptSaveForLaterAcknowledge  {
    @api auto = false;
    @track hasResult = false;
    @track emailLink;
    @track hasResult = false;

    connectedCallback() {
        console.log('Hello Connected callback called');
        console.log(this);
    }
    render(){
        return lwcSaveForLaterRedirect;
     }

    handleResultChange(val) {
        if (val) {
            const link = val.saveUrl + '&c__instanceId=' + val.instanceId;
            console.log('handleResultChange get called ');
            console.log(val);
            const body = `${this._bSflLabels.OmniResumeLink}\n${link}\n${this._bSflLabels.OmniSaveEmailBody}`;
            this.resumeLink = link;
            this.emailLink = `mailto:?subject=&body=${encodeURIComponent(body)}`;
            this.hasResult = true;
            if(!this.auto && this.hasResult){
                window.alert('Instance Id is '+ val.instanceId);
                pubsub.fire("CustomChannel", "saveForLater", {});
                window.alert('Pubsub is fire completed... ');
                
            }
            
        }
    }
}