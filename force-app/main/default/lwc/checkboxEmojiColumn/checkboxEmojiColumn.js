import LightningDatatable from 'lightning/datatable';
import checkboxEmojiTemplate from './checkboxEmojiTemplate.html';

export default class CheckboxEmojiColumn extends LightningDatatable {
    static customTypes = {
        checkboxEmoji: {
            template: checkboxEmojiTemplate,
            standardCellLayout: true,
            typeAttributes: ['value']
        }
    };
}
