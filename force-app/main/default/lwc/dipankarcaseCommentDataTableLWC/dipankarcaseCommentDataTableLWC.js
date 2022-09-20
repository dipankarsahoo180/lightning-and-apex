import { LightningElement, api } from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
import { OmniscriptActionCommonUtil } from 'omnistudio/omniscriptActionUtils';
import pubsub from 'omnistudio/pubsub';
export default class DipankarcaseCommentDataTableLWC extends OmniscriptBaseMixin(LightningElement) {
    caseId;
    connectedCallback() {
        this.caseId = this.omniJsonData.SelectedCaseId;
    }
}