import { LightningElement, track } from 'lwc';
import {
    enableModal, enablePopout, getAllUtilityInfo, getInfo, minimize,
    onUtilityClick, open, updatePanel, updateUtility
} from 'lightning/platformUtilityBarApi';
export default class UtilityBarComp extends LightningElement {
    utilityId;
    @track allUtilities = [];
    enable_modal = false;
    enable_popout = true;
    info;

    get utlitiesCaptured() {
        return this.allUtilities.length > 0;
    }

    handleClick(evt) {
        this.utilityId = evt.currentTarget.dataset.id;
    }

    async enableModal() {
        await enableModal(this.utilityId, !this.enable_modal).then((result) => console.log('OUTPUT : ', result)).catch(error => {
            console.error('Error enabling modal:', error);
        });
        this.enable_modal = !this.enable_modal;
    }

    async enablePopout() {
        await enablePopout(this.utilityId, !this.enable_popout).then((result) => console.log('OUTPUT : ', result)).catch(error => {
            console.error('Error enabling popout:', error);
        });
        this.enable_popout = !this.enable_popout
    }


    getInfo() {
        getInfo(this.utilityId)
            .then(result => {
                console.log(result);
                this.info =
                    JSON.stringify(result);
            })
            .catch(error => {
                console.error('Error getting utility info:', error);
            });
    }

    minimize() {
        minimize(this.utilityId).catch(error => {
            console.error('Error minimizing utility:', error);
        });
    }

    connectedCallback() {
        this.getAllUtilityInfo();
    }

    getAllUtilityInfo() {
        getAllUtilityInfo()
            .then(result => {
                console.log(result);
                this.allUtilities = result;
                this.info = JSON.stringify(result);
            })
            .catch(error => {
                console.error('Error getting all utility info:', error);
            });
    }

    open() {
        open(this.utilityId).then((res) => {
            console.log(res);
            console.log('Open Successful');
        }).catch(error => {
            console.error('Error opening utility:', error);
        });
    }

    updatePanel() {
        updatePanel(this.utilityId, {
            label: 'Updated Panel Dipankar',
            icon: 'utility:apps',
            height: 300,
            width: 300
        }).catch(error => {
            console.error('Error updating panel:', error);
        });
    }

    updateUtility() {
        updateUtility("353:0", {
            label: 'Updated Utility',
            icon: 'utility:apps',
            highlighted: true
        }).catch(error => {
            console.error('Error updating utility:', error);
        });
    }
}