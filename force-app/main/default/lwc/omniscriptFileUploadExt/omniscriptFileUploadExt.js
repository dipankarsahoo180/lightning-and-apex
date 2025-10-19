import { LightningElement } from 'lwc';
import OmniscriptFile from 'omnistudio/omniscriptFile';
import util from "omnistudio/utility";
import tmpl from './omniscriptFileUploadExt.html';

export default class OmniscriptFileUploadExt extends OmniscriptFile  {

    /**
     * Default accepted file extensions when no override is provided via jsonDef.
     * @type {string[]}
     */
    defaultAcceptedFormats = [".png", ".jpg", ".jpeg", ".pdf"];

    /**
     * Indicates whether the most recent upload contained invalid documents.
     * @type {boolean}
     */
    isinvalidDoc = false;

    /**
     * LWC lifecycle hook invoked when component is inserted into the DOM.
     * Calls parent's connectedCallback, initializes configuration, and triggers
     * an extract DataRaptor call to preload existing content documents.
     * @override
     * @returns {void}
     */
    connectedCallback(){
        super.connectedCallback();
        this.init();
        this.callDataraptor("DRExtractContentDocuments",{
            ContextId: this.getJsonDefOption("contentParentId")?.length > 0 ? 
                            this.jsonData[this.getJsonDefOption("contentParentId")[0]?.replaceAll("%","")]:null,
                            FileNamePrefix:this.customizedFileName},"extract");
    }

    /**
     * Helper to read option values from the component's jsonDef propSetMap.
     * Returns the raw config value (may be undefined).
     * @param {string} nodeName - The key under propSetMap to read.
     * @returns {*}
     */
    getJsonDefOption(nodeName){
        return this.jsonDef?.propSetMap[nodeName]
    }

    /**
     * Initializes component settings (accepted formats, limits, messages, DR names).
     * Reads configuration from jsonDef and provides sensible defaults.
     * @returns {void}
     */
    init(){
        this.specialCharsErrMessage =  this.getJsonDefOption( 'c_specialCharErrMessage') || `File name should not contain special characters like ! # $ & * ? " { } | < > [ ] ' / ~ ( ) ; \\`;
        this.acceptedFormats        =  this.getJsonDefOption( 'c_acceptedFormats')  || this.defaultAcceptedFormats;
        this.allowedFileCount = this.getJsonDefOption( 'c_allowedFileCount') || 1;
        this.maxAllowedFileSize = (this.getJsonDefOption( 'c_maxFileSizeInMb') || 1) * 1024 * 1024 || 0;
        this.fileSizeErrMessage  =  `File size should not exceed ${this.getJsonDefOption( 'c_maxFileSizeInMb') || 1} MB`;
        this.extractDRName = this.getJsonDefOption( 'c_extractDRName') || '';
        this.postDRName = this.getJsonDefOption( 'c_postDRName') || '';
        this.customizedFileName = this.getJsonDefOption( 'c_customizedFileName') || '';
    }
    
    /**
     * Generic DataRaptor caller that constructs the request and invokes omnistudio utility.
     * On "extract" methodType populates the component value and applies post-processing.
     * @param {string} bundleName - DataRaptor bundle name to call.
     * @param {Object} [drInput={}] - Input map for the DataRaptor.
     * @param {string} methodType - A token to indicate post-call handling ("extract"|"post").
     * @returns {void}
     */
    callDataraptor(bundleName,drInput={},methodType){ 
        let request_data = {
            type: "DataRaptor",
            value: {
                bundleName: bundleName,
                inputMap: "{}",
                optionsMap: "{}"
            }
        };

        //Add input to your request(you can add single/multiple input params)
        request_data.value.inputMap = JSON.stringify(drInput);

        //Call your dataraptor
        util.getDataHandler(JSON.stringify(request_data))
            .then((result) => {
                //Get the result and do your post processing
                let jsonResult = JSON.parse(result);
                console.log("response for ",methodType, "is ",result);
                if(!!result && methodType == "extract"){
                    jsonResult.forEach(element => {
                        element.deleteLabel = 'Delete '+element.filename;
                    });
                    this._value = jsonResult;
                    this.applyCallResp(this._value);
                }
            })
            .catch((err) => {
                //Handle your errors
                console.log("error is ", err);
            });
    }


    /**
     * Handler for fileupload finished events.
     * - Validates file names and types
     * - Calls post DataRaptor for valid files
     * - Deletes files and surfaces errors for invalid files
     * @param {CustomEvent} event - upload finished event with detail.files array
     * @returns {void}
     */
    handleUploadFinished(event){
        this.isinvalidDoc = false;
        this.errorMessage  = null;
        event.detail.files = event.detail.files.map(file => {
            let [formattedFileName,hasError] = this.getCustomizedFileName(file.name);
            if (hasError){
                this.isinvalidDoc = true;
                this.errorMessage = 'Special characters are not allowed in file name. ';
            }
            formattedFileName = formattedFileName.split('.');
            file.name = formattedFileName[0] + '.' + formattedFileName[1];
            file.filename = formattedFileName[0] + '.' + formattedFileName[1];
            if(!hasError && this.acceptedFormats.indexOf('.'+formattedFileName[1].toLowerCase()) === -1){
                this.isinvalidDoc = true;
                this.errorMessage = 'File type not supported. Supported file types are '+this.acceptedFormats.join(', ');
            }
            if(!this.isinvalidDoc){
                this.callDataraptor("DRUpdateContentDocument",file,"post");
            }
            return file; 
        });
        if(this.isinvalidDoc) {
            this.deleteFiles(event?.detail?.files);
        }else{
            super.handleUploadFinished(event);
        }
    }

    /**
     * Applies the configured file-name prefix/format to a provided filename.
     * Returns an array [formattedName, hasError].
     * @param {string} filename
     * @returns {[string, boolean]}
     */
    getCustomizedFileName(filename){
        let customizedFileName = this.customizedFileName+filename;
        return [customizedFileName,this.isInvalidFileName(customizedFileName.split('.')[0])];
    }

    /**
     * Validates a filename for disallowed special characters.
     * @param {string} fileName - name (without extension) to validate.
     * @returns {boolean} true if invalid (contains special chars), false otherwise.
     */
    isInvalidFileName(fileName){
        var spclCharsRegex = /[!#$&*?"{}|<>[\]\'\/~();\\]/;
        return spclCharsRegex.test(fileName);
    }

    /**
     * Computed property that disables the upload button when allowed file count is reached.
     * @returns {boolean}
     */
    get isUploadDisabled() {
        let isDisabled = false; 
        if(this.allowedFileCount && ! isNaN(this.allowedFileCount)) {
            isDisabled = this.allowedFileCount <= this._value.length? true : false;
        }
        return isDisabled;
    }

    /**
     * Deletes files by invoking the component's deleteFile action for each entry.
     * @param {Array<Object>} filesToDelete - array of file metadata to delete.
     * @returns {void}
     */
    deleteFiles(filesToDelete) {
        filesToDelete.forEach((file) => {
            this.deleteFile({target : { ...file,
                getAttribute: function(){ return this.data || this.documentId }}});
        });
    }

    /**
     * Render hook to return the component's template.
     * @override
     * @returns {TemplateResult}
     */
    render(){
        return tmpl;
    }

    /**
     * Utility to perform a deep copy of a plain object via JSON serialization.
     * @param {Object} obj
     * @returns {Object}
     */
    copyObj(obj){
        return JSON.parse(JSON.stringify(obj));
    }
}