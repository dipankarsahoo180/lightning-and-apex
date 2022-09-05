import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import LightningDatatable from 'lightning/datatable';
import customClickableEmailTemplate from './customClickableEmailTemplate.html'
export default class DipsCustomDataTable extends LightningDatatable {
    static customTypes = {
        clickableEmail: {
            template: customClickableEmailTemplate,
            standardCellLayout: true,
            typeAttributes: ['recordId'],
        }
    }

}