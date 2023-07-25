import OmniscriptStepChartItems from 'omnistudio/omniscriptStepChart';
import tmpl from './omniscriptStepChartItemsExt.html';
export default class OmniscriptStepChartItemsExt extends OmniscriptStepChartItems {

    render(){
        return tmpl;
    }

    /**
     * @private
     * @description Event handler when steps are selected on the step chart.
     * @param {*} event
     * @returns {void}
     */
    handleStepClick(event) {
        event.preventDefault();
        // gets index of selected step
        const selectedIndex = parseInt(event.target.getAttribute('data-index'), 10) || parseInt(event.target.value, 10) || 0;
        console.warn(parseInt(parseInt(selectedIndex)+1));
        console.warn(this.jsonDef.name);
        const eventContent = {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: {
                currIndex: selectedIndex,
                prevIndex: selectedIndex-1 || 0,
            },
        };
        this.dispatchEvent(new CustomEvent('omnistepchart', eventContent));
    }

}