import { LightningElement,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class DipsCustomDataTableClickableEmail extends NavigationMixin(LightningElement) {
    @api recordId;
    @api email;

    handleNavigateToRecordPage(event){
        console.log('event');
        console.log(event);

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                actionName: 'view'
            }
        });
    }
}