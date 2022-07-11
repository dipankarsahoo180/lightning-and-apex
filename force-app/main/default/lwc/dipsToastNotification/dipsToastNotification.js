import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DipsToastNotification extends LightningElement {
    url;
    value;

    handleClickSuccess(){
        this.showToast('Success','Toast shown Successsfully','success');
    }
    handleClickError(){
        this.showToast('Error','Toast shown Successsfully','error');
    }
    handleClickInfo(){
        this.showToast('Info','Toast shown Successsfully','info');
    }
    handleClickInfoWithLink(){
        this.showToastWithUrl('Info','SF Toast shown Successsfully {1}','info','Click to Go','https://www.google.com');
    }

    showToastWithUrl(title, message, variant,value, url){
        window.alert('url is '+url+' and value is '+value);
        this.dispatchEvent(new ShowToastEvent(  
            {
            title: title,
            message: message,
            variant: variant,
            url:url,
            value:value,
            messageData :[
                title,
                {
                    url: url,
                    label : value
                }
            ]
            }
            )
        );

         
        
    }

    showToast(title, message, variant){
        this.dispatchEvent(new ShowToastEvent(
            {
            title: title,
            message: message,
            variant: variant
            }
        ));
    }
}