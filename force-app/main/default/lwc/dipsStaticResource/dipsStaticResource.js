import { LightningElement } from 'lwc';
import profilePicture from '@salesforce/resourceUrl/Portfolio_Profile_Pic';
import SiteSampleimages from '@salesforce/resourceUrl/SiteSamples';

export default class DipsStaticResource extends LightningElement {
    get profilePic(){
        return profilePicture;
    }

    get warning(){
        return SiteSampleimages+'/img/warning.png';
    }

    get forcelogo(){
        return SiteSampleimages+'/img/force_logo.png';
    }

    get tools(){
        return SiteSampleimages+'/img/tools.png';
    }

    get maintenance(){
        return SiteSampleimages+'/img/maintenance.png';
    }
    get poweredBy(){
        return SiteSampleimages+'/img/poweredby.png';
    }
    get constuction(){
        return SiteSampleimages+'/img/construction.png';
    }

}