import { LightningElement, api } from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
import tmpl from './showProductsFromOs.html';
/**
 * This class is used to show a custom modal with the list of products inside omniscript.
 * @export ShowProductsFromOs
 * @class ShowProductsFromOs
 * @extends {OmniscriptBaseMixin(LightningElement)}
 */
export default class ShowProductsFromOs extends OmniscriptBaseMixin(LightningElement) {
    /**
     *allProducts : It accepts the products in a array format from omniscript.
     *showModal   : Passed from Omniscript as true or false based on whether products found or not.
     *hideFooter  : Passed from Omniscript as true or false
     *hideHeader  : Passed from Omniscript as true or false
     *layout      : Passed from Omniscript as newport or lightning
     *type        : Passed from Omniscript as success or error or info
     */

    @api allProducts;
    @api showModal;
    @api hideFooter = false;
    @api hideHeader = false;
    @api layout = 'newport';
    @api type = 'success'
    isModalRendered = false;

    
    /**
     * used to set the display to block when the template is rendered
     * It calls openModal() from child component and sets the display to block;
     * @memberof ShowProductsFromOs
     */
    renderedCallback() {
        if (!this.isModalRendered) {
            const result = this.template.querySelector('omnistudio-omniscript-modal');
            if (result) {
                this.template.querySelector('omnistudio-omniscript-modal').openModal();
                this.isModalRendered = true;
            }
        }
    }

    render() {
        return tmpl;
    }

    /**
     *It is used to close the modal and set the modalRendered value to false so that modal can be rendered again in future
     *Also update the show modal value to false into json data itself
     * @memberof ShowProductsFromOs
     */
    closeModal() {
            this.isModalRendered = false
            const omnijson = { ...this.omniJsonData, ShowModal: false };
            this.omniApplyCallResp(omnijson);
    }

}