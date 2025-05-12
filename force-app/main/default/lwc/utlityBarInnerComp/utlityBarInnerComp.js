import { LightningElement, track, wire } from 'lwc';
import {
    enableModal, enablePopout, getAllUtilityInfo, getInfo, minimize,
    onUtilityClick, open, updatePanel, updateUtility, EnclosingUtilityId
} from 'lightning/platformUtilityBarApi';

export default class UtlityBarInnerComp extends LightningElement {
    @track allUtilities = [];
    enable_modal = false;
    enable_popout = true;
    info;
    eventRegistered = false;
    @wire(EnclosingUtilityId)
    utilityId

    connectedCallback() {
        getAllUtilityInfo()
        .then(result => {
            this.allUtilities = result;
            this.info = JSON.stringify(result);
            this.allUtilities.map(el => {
                if (el.utilityLabel == "Custom Utility Bar") {
                    onUtilityClick(el.id, this.handleUtilityClick.bind(this, el.id));
                }
            })
        })
        .catch(error => {
            console.error('Error getting all utility info:', error);
        });
    }

    handleUtilityClick(utilityId){
        console.log(`${utilityId} has been clicked`);
    }

    async enableModal() {
        await enableModal(this.utilityId, !this.enable_modal).then((result) => console.log('OUTPUT : ', result)).catch(error => {
            console.error('Error enabling modal:', error);
        });
        this.enable_modal = !this.enable_modal;
    }

    async enablePopout() {
        try {
            const result = await enablePopout(this.utilityId, !this.enable_popout);
            console.log('POP OUT OUTPUT : ', result);
            this.enable_popout = !this.enable_popout;
        } catch (error) {
            console.log('ERROR : ', error);
        }
    }

    getAllUtilityInfo() {
        getAllUtilityInfo()
            .then(result => {
                console.log('allUtilities ', result);
                this.allUtilities = result;
                this.info = JSON.stringify(result);
                console.log('JSON.stringify(result)',JSON.stringify(result));
            })
            .catch(error => {
                console.error('Error getting all utility info:', error);
            });
    }

    getInfo() {
        getInfo(this.utilityId)
            .then(result => {
                console.log(result);
                this.info = JSON.stringify(result);
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
            label: 'Pannel has been resized',
            icon: 'utility:apps',
            height: 500,
            width: 500
        }).catch(error => {
            console.error('Error updating panel:', error);
        });
    }

    updateUtility() {
        updateUtility(this.utilityId, {
            label: 'Utility name and icon has been updated',
            icon: 'utility:apps',
            highlighted: true
        }).catch(error => {
            console.error('Error updating utility:', error);
        });
    }
    
    handleChange(e){
        this.info = e.target.value;
    }
}