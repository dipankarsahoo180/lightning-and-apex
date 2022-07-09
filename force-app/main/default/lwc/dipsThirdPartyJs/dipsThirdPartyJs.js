import { LightningElement } from 'lwc';
import MOMENT_JS_LIBRARY from '@salesforce/resourceUrl/moment_js_library';
import {loadScript} from 'lightning/platformResourceLoader';
// Example :- import TRAILHEAD_LOGO from '@salesforce/resourceUrl/trailhead_logo';

export default class DipsThirdPartyJs extends LightningElement {
    currentDate;
    scriptLoaded = false;

    renderedCallback(){
        if(!this.scriptLoaded){
            Promise.all([
                loadScript(this, MOMENT_JS_LIBRARY+'/moment/moment.min.js')
            ]).then(()=>{
                this.setDateOnScreen();
                this.scriptLoaded =true;
            }).catch((error)=>{
                window.alert('Error occured in moment JS '+ error)
            })
        }
        
    }

    setDateOnScreen(){
       this.currentDate = moment().format('LLLL')
    }
}