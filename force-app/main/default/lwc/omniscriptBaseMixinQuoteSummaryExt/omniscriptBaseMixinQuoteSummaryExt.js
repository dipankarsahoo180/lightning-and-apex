import { LightningElement } from 'lwc';
import { OmniscriptBaseMixin } from 'vlocity_ins/omniscriptBaseMixin';
import { staticDataJson } from 'c/staticDataJson';
import util from "vlocity_ins/utility";
import {loadScript} from 'lightning/platformResourceLoader';
// import JD_PDF_LIB from '@salesforce/resourceUrl/JD_PDF_LIB';

export default class OmniscriptBaseMixinQuoteSummaryExt extends OmniscriptBaseMixin(LightningElement) {
    full_Json = {};
    contributionDental;
    contributionVision;
    censusTwo;
    loadingSecThree = true;
    copyQuote;
    medicalProducts = [];
    dentalProducts = [];
    visionProducts = [];
    secTwoQLIsl;
    secTwoCartPlans;
    accountDetails;
    calcResults;
    returnedProducts;
    groupName;
    agentName;
    managingAgent;
    reqRenMon;
    reqEffDate;
    ratingArea;
    FTE;
    expActiveEnroll = 0;
    expWaiving = 0;
    totalMonthlyPremium = 0;
    medicalProductsLength;
    section3 = [];
    possibleCombinations;
    censusMembersBreakout = {};
    censusMembers;
    membersList = [];
    empFamilyMap = {};
    empCounter;
    scriptLoaded = false;
    pdfSource = '';

    connectedCallback() {
        console.log('OMNI JSON DATA', this.omniJsonData);
        this.full_Json = { ...staticDataJson(), ...this.omniJsonData };
        console.log('Full Json data', this.full_Json);
        this.handleLoadAlldata();
    }

    handleLoadAlldata() {
        this.contributionDental = this.full_Json?.selectPlanTypes?.DentalContribution ? "(" + this.full_Json.selectPlanTypes.DentalContribution + ")" : "";
        this.contributionVision = this.full_Json?.selectPlanTypes?.VisionContribution ? "(" + this.full_Json.selectPlanTypes.VisionContribution + ")" : "";
        this.censusTwo = this.full_Json?.Census2Selection?.Census2 === "Yes" ? true : false;
        this.copyQuote = this.full_Json.ClonedQuoteId != null ? true : false;
        this.secTwoQLIs = this.full_Json.updatedQLIs;
        this.secTwoCartPlans = this.full_Json.updatedQLIs;
        this.accountDetails = this.full_Json.NewAccountDetails;
        this.calcResults = this.full_Json.smallGroupSelection?.cartPlans[0]?.RawPriceData ?
            this.full_Json.smallGroupSelection?.cartPlans[0]?.RawPriceData[0]?.calculationResults ?
                this.full_Json.smallGroupSelection?.cartPlans[0]?.RawPriceData[0]?.calculationResults[0] : null : null;
        if (this.censusTwo) {
            this.returnedProducts = Array.isArray(this.secTwoQLIs) ? this.secTwoQLIs : [this.secTwoQLIs];
        } else {
            this.returnedProducts = Array.isArray(this.secTwoCartPlans) ? this.secTwoCartPlans : [this.secTwoCartPlans];
        }
        this.groupName = this.accountDetails?.AccountName;
        this.agentName = this.full_Json.BrokerName;
        if (this.accountDetails?.MangingAgentsBlock?.ManagingAgents === "TGG") {
            this.managingAgent = this.accountDetails?.MangingAgentsBlock?.ManagingAgents ? this.accountDetails?.MangingAgentsBlock?.ManagingAgents + " Solutions" : "";
        } else {
            this.managingAgent = this.accountDetails?.MangingAgentsBlock?.ManagingAgents || "";
        }
        this.handleRenewalDateMonth(this.accountDetails.RenewalDateMonth);
        this.reqEffDate = this.accountDetails?.EffectiveDate;
        this.ratingArea = this.calcResults?.County_RatingArea__RatingArea;
        this.FTE = this.accountDetails.NumberofEmployees;
        this.handleFormatProductData();
        this.medicalProductsLength = this.medicalProducts?.length > 0 ? true : false;
        this.dentalProductsLength = this.dentalProducts?.length > 0 ? true : false;
        this.visionProductsLength = this.visionProducts?.length > 0 ? true : false;
        this.section3 = this.full_Json.section3;
        this.handleSectionThree();
    }

    renderedCallback(){
        if(!this.scriptLoaded){
            Promise.all([
                loadScript(this, '/resource/1665481841000/JD_PDF_LIB')
                ,loadScript(this, '/resource/1665561956000/JS_PDF_AUTOTABLE_PLUGIN')
                ,loadScript(this, 'https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.4.0/purify.js')
                // , loadScript(this, loadScript(JD_PDF_AUTOTABLE_LIB) )
            ]).then(()=>{
                this.scriptLoaded =true;
                console.log('load finished in JS PDF ')
            }).catch((error)=>{
                console.log('Error occured in JS PDF '+ error)
            })
        }
        
    }
    
    //Show/Hide section 1-3 logic
    showSecOne = true;
    toggleSecOne() {
        this.showSecOne = !this.showSecOne;
    }

    showSecTwo = true;
    toggleSecTwo() {
        this.showSecTwo = !this.showSecTwo;
    }

    showSecThree = true;
    toggleSecThree() {
        this.showSecThree = !this.showSecThree
    }

    //To find the SubTotal for Medical in a Family
    sumMed(name) {
        return this.censusMembers.filter(function (x) { return x.familyIdentifier == name; })
            .map(function (x) { return parseFloat(x.medPremium); }).reduce(function (a, b) { return a + b; });
    }

    //To find the SubTotal for Dental in a Family
    sumDent(name) {
        return this.censusMembers.filter(function (x) { return x.familyIdentifier == name; })
            .map(function (x) { return parseFloat(x.dentPremium); }).reduce(function (a, b) { return a + b; });
    }

    //To find the SubTotal for Vision in a Family
    sumVis(name) {
        return this.censusMembers.filter(function (x) { return x.familyIdentifier == name; })
            .map(function (x) { return parseFloat(x.visPremium); }).reduce(function (a, b) { return a + b; });
    }

    isPrintView =false;
    handlePrintQuoteSummary(){
        // this.isPrintView = true;
        setTimeout(()=>{
            const { jsPDF} = window.jspdf;
            const doc = new jsPDF();
            // doc.table(0,0,this.membersList,[],{printHeaders:false,autoSize:true});
            // let innerHTML = this.template.querySelector('.quote-details-section-1').innerHTML;
            // let div = document.createElement("div");
            // div.appendChild(innerHTML);
            // doc.html("<h1>This is a test String</h1>", {
            //     callback: function (doc) {
            //       doc.save();
            //     },
            //     x: 10,
            //     y: 10
            //  }).then(res=>{
            //     console.log(res);
            //     // doc.save();
            //  }).catch(err=>{
            //     console.log(err);
                
            //  });
            doc.setTextColor(150);
            doc.text(20, 30, 'Test.');
            doc.setTextColor(255, 0, 0);
            doc.text(20, 40, 'Test.');
            doc.setTextColor(0, 255, 0);
            doc.text(20, 50, 'Test.');
            doc.setTextColor(0, 0, 255);
            doc.text(20, 60, 'Test');
            doc.autoPrint();
            this.pdfSource = doc.output('datauristring');
            this.isPrintView = false;
            // doc.save("test.pdf");


            // let quoteSection1 = this.template.querySelector('.quote-details-section-1');
            // let quoteSection1Json = doc.autoTableHtmlToJson(quoteSection1);
            // if(!!quoteSection1Json && !!quoteSection1Json.columns){
            //     doc.autoTable(quoteSection1Json.columns, quoteSection1Json.data, {
            //         theme: 'plain',
            //         margin : {
            //             top: 38,
            //             left: 13
            //         },
            //         styles: {
            //             lineWidth: 0,
            //             overflow: 'linebreak',
            //             fontStyle:'normal',
            //             font: 'custom',
            //             textColor: [0, 0, 0],
            //             fillColor: [255,255,255]
            //         },
            //         headerStyles : {
            //             fillColor: [255,255,255],
            //             fontStyle:'normal',
            //             font: 'custom',
            //             textColor: [0, 0, 0] 
            //         },
            //         columnStyles: {
            //              5:{columnWidth: 15}
            //         }
            //      });
            // }
            // doc.setPage(1);
            // doc.setProperties({
            //     title: "Quote Summary"
            // });
            //auto print and output function opens print ready PDF
            //doc.output('dataurlnewwindow');
            //Below code is needed to open print popup in same window.
          },500);
        
    }

    handleRenewalDateMonth(RenewalDateMonth){
        switch (RenewalDateMonth) { 
            case "Jan":
                this.reqRenMon = "January";
                break;
            case "Feb":
                this.reqRenMon = "February";
                break;
            case "Mar":
                this.reqRenMon = "March";
                break;
            case "Apr":
                this.reqRenMon = "April";
                break;
            case "May":
                this.reqRenMon = "May";
                break;
            case "Jun":
                this.reqRenMon = "June";
                break;
            case "Jul":
                this.reqRenMon = "July";
                break;
            case "Aug":
                this.reqRenMon = "August";
                break;
            case "Sep":
                this.reqRenMon = "September";
                break;
            case "Oct":
                this.reqRenMon = "October";
                break;
            case "Nov":
                this.reqRenMon = "November";
                break;
            case "Dec":
                this.reqRenMon = "December";
                break;
            default:
                this.reqRenMon = "";
        }
    }

    handleFormatProductData(){
        this.returnedProducts?.forEach((product, idx) => {
            if (!product.Type__c) {
                product.Type__c = product.vlocity_ins__Type__c;
                product.index = idx;
                product.Name = product.Name ? product.Name : product.ProductName__c;
                product.Price = '$' + product.Price;
            }
        });

        if (this.returnedProducts?.length > 0) {
            for (let i = 0; i < this.returnedProducts?.length; i++) {
                if (this.returnedProducts[i].Type__c === "Medical") {
                    this.medicalProducts.push(this.returnedProducts[i]);
    
                } else if (this.returnedProducts[i].Type__c === "Dental") {
                    this.dentalProducts.push(this.returnedProducts[i]);
    
                } else if (this.returnedProducts[i].Type__c === "Vision") {
                    this.visionProducts.push(this.returnedProducts[i]);
    
                } else {
                    console.info("No product type found");
                }
            }
        }
    }

    handleSectionThree(){
        this.section3.forEach((section3, idx) => {
            section3.member.lastname = section3.member.vlocity_ins__LastName__c.substring(0, 15) == section3.member.Id.substring(0, 15) ? "" : section3.member.vlocity_ins__LastName__c;
            section3.member.index = idx;
            if(section3.plans){
                section3.plans.index = idx;
                section3.plans.medicalType = section3.plans.Type__c=='Medical'? true:false;
                section3.plans.dentalType = section3.plans.Type__c=='Dental'? true:false;
                section3.plans.visionType = section3.plans.Type__c=='Vision'? true:false;
                section3.plans.isTotalPriceExists =section3.plans.vlocity_ins__TotalPrice__c ? true:false;
                section3.plans.totalPrice = section3.plans.vlocity_ins__TotalPrice__c || currency;
            }
        });
        this.possibleCombinations = this.full_Json.possibleCombinations;

        if (this.full_Json?.censusId && this.full_Json?.quoteId) {
            let request_getCensusAll = {
                type: "DataRaptor",
                value: {
                    bundleName: "getCensusAll",
                    inputMap: "{}",
                    optionsMap: "{}"
                }
            };
            request_getCensusAll.value.inputMap = JSON.stringify({ censusId: this.full_Json.censusId });
            util.getDataHandler(JSON.stringify(request_getCensusAll))
                .then(result => {
                    let censusReply = JSON.parse(result);
                    this.censusMembers = Array.isArray(censusReply) ? censusReply : [censusReply];
                    console.log('censusmembers ', this.censusMembers);
                    //code to sort dependents under respecive employee
                    this.censusMembers.map(mbr => {
                        if (!mbr.isEmployee) {
                            let emplyId = mbr.relatedMember;
                            if (!this.empFamilyMap[emplyId]) {
                                this.empFamilyMap[emplyId] = [mbr];
                            }
                            else {
                                this.empFamilyMap[emplyId] = this.empFamilyMap[emplyId].concat([mbr]);
                            }
                        }
                    });

                    this.censusMembers.map(m => {
                        if (m.isEmployee) {
                            this.membersList.push(m);
                            this.membersList.push(JSON.parse(JSON.stringify(m)));
                            this.membersList.push(JSON.parse(JSON.stringify(m)));
                            this.membersList.push(JSON.parse(JSON.stringify(m)));
                            if (!this.empFamilyMap[m.memberId]) {
                                // this.membersList = this.membersList.concat(this.empFamilyMap[m.memberId]);
                                this.membersList.forEach((member,idx)=>{
                                    member.memberEnrollingStatus = member.status == 'Enrolling' ? true:false;
                                    member.index = idx;
                                    member.familyIdentifierGreaterThanZero = member.familyIdentifier > 0? true:false;
                                    member.memberFamilyIdentifiersumMed = this.sumMed(member.familyIdentifier);
                                    member.memberFamilyIdentifiersumDent = this.sumDent(member.familyIdentifier);
                                    member.memberFamilyIdentifiersumVis = this.sumVis(member.familyIdentifier);
                                    member.memberFamilyIdentifiersumTotal = this.sumMed(member.familyIdentifier)+this.sumDent(member.familyIdentifier)+this.sumVis(member.familyIdentifier);
                                    member.isNextamilyIdentifierDifferent = idx <  this.membersList.length-1 && 
                                                                            (this.membersList[idx].familyIdentifier == this.membersList[idx+1].familyIdentifier) ? true:false;
                                    
                                })
                            }
                            console.log('this.membersList ', this.membersList);
                            m.empCounter = ++this.empCounter;
                        }
                        if (m.status === "Waiving" && m.isEmployee === true) {
                            this.expWaiving++;
                        } else if (m.status === "Enrolling" && m.isEmployee === true) {
                            this.expActiveEnroll++;
                        }
                    });
                    this.expectedActiveEnroll = this.expActiveEnroll;
                    console.log('print breakout ', this.censusMembersBreakout);
                    this.loadingSecThree = false;
                }).catch(err=>{
                    console.log('error is ',err);
                });

            let request_getQuotePlanBreakoutProducts = {
                type: "DataRaptor",
                value: {
                    bundleName: "getQuotePlanBreakoutProducts",
                    inputMap: "{}",
                    optionsMap: "{}"
                }
            };
            request_getQuotePlanBreakoutProducts.value.inputMap =JSON.stringify({ QuoteId: this.full_Json.quoteId });
            util.getDataHandler(JSON.stringify(request_getQuotePlanBreakoutProducts))
            .then(result => {
                let QuotelineBR = JSON.parse(result);
                console.log('QuotelineBR ',QuotelineBR[0]);
                this.totalMonthlyPremium = QuotelineBR[0]?.QuoteTotalPrem?.GrandTotal;
            }).catch(err=>{
                console.log('error is ',err);
            });
        }
    }

}