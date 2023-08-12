import OmniscriptDate from 'omnistudio/omniscriptDate';
import { dispatchOmniEvent } from 'omnistudio/omniscriptUtils';

export default class OmniscriptDateExt extends OmniscriptDate {

    handleChange(evt) {
        super.handleChange(evt);
        this.handleUpdateEndDate(evt);
    }

    handleUpdateEndDate = (evt) =>{
        const startDate = new Date(evt.target.value);
        const EndDate = new Date(startDate.getFullYear()  + 1, startDate.getMonth() , startDate.getDate() )
        const detail = {
            apiResponse: {
                EndDate: EndDate
            }
        }
        dispatchOmniEvent(this, detail, 'omniactionbtn');
        console.warn('date updated success to ',EndDate);
    }
}