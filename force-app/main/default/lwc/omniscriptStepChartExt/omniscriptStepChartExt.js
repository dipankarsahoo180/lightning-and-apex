import OmniScriptStepChart from 'omnistudio/omniscriptStepChart';
import tmpl from './omniscriptStepChartExt.html'
export default class OmniscriptStepChartExt extends OmniScriptStepChart {

    render(){
        return tmpl;
    }
}