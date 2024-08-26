import { LightningElement, wire,track } from 'lwc';
import {gql,graphql} from 'lightning/uiGraphQLApi';
const columns = [
    { label: 'Id', fieldName: 'Id'},
    { label: 'Name', fieldName: 'Name' },
    { label: 'Email', fieldName: 'Email' },
    { label: 'Account', fieldName: 'AccountName' },
];

export default class GraphQlDataTable extends LightningElement {
    columns = columns;
    @track contactRecords = [];
    contactName;
    accountName;
    disablePreviousPage=true
    startCursor
    endCursor
    hasNextPage
    hasPreviousPage
    disablePreviousPage=true;
    disableNextPage=true;
    cursors;
    totalCount=0
    currentCursor;
    cursors = [];
    nextLabel = "Next";
    recordsPerPage = 3;
    pageResultCount;
    currentPageNumber=0;
    totalPageNumber;

    @wire(graphql,{
        "query": "$contactQuery",
        "variables":"$contactVariables"
    })

    graphQLResult({data,errors}){
        if(data){
            this.contactRecords = data?.uiapi?.query?.Contact?.edges.map(el=>{
                return {
                    Id:el.node.Id,
                    Name:el.node.Name?.value,
                    Email:el.node.Email?.value,
                    AccountName:el.node?.Account?.Name?.value
                }
            })
            this.pageResultCount = data?.uiapi?.query?.Contact?.pageResultCount;
            this.totalCount = data?.uiapi?.query?.Contact?.totalCount;
            this.startCursor = data?.uiapi?.query?.Contact?.pageInfo?.startCursor;
            this.endCursor = data?.uiapi?.query?.Contact?.pageInfo?.endCursor;
            this.hasNextPage = data?.uiapi?.query?.Contact?.pageInfo?.hasNextPage;
            this.disableNextPage = !this.hasNextPage;
            this.hasPreviousPage = data?.uiapi?.query?.Contact?.pageInfo?.hasPreviousPage;
            this.disablePreviousPage = !this.hasPreviousPage;
            // console.log('current,start,end,array : ',this.currentCursor, this.startCursor,this.endCursor,this.cursors);
            if(this.step == null) {
                this.currentPageNumber = 1;
                this.totalPageNumber = Math.ceil(parseInt(this.totalCount)/parseInt(this.recordsPerPage));
            }
        }else{
            console.error('errors : ',errors);
        }
    }

    get contactQuery(){
        if(!this.contactName && !this.accountName) return undefined;
        return  gql `query ($where: Contact_Filter, $first: Int, $after: String) {
                        uiapi {
                            query {
                            Contact(where: $where, first: $first, after: $after) {
                                edges {
                                node {
                                    ...ContactDetails
                                }
                                }
                                pageInfo {
                                hasNextPage
                                hasPreviousPage
                                startCursor
                                endCursor
                                }
                                totalCount
                                pageResultCount
                            }
                            }
                        }
                        }

                        fragment ContactDetails on Contact {
                        Id
                        Name {
                            ...StringValueFields
                        }
                        Email {
                            value
                        }
                        Account {
                            Name {
                            ...StringValueFields
                            }
                        }
                        }

                        fragment StringValueFields on StringValue {
                        value
                        }
`
    }

    get contactVariables(){
        if(!this.contactName && !this.accountName) return undefined;
        let query =  {
            "where": {
              "and": [
                {
                  "Name": {
                    "like": this.contactName
                  }
                },
                {
                  "Account": {
                    "Name": {
                      "like": this.accountName
                    }
                  }
                }
              ]
            },
            "first": this.recordsPerPage,
            "after": this.currentCursor
          }
          if(!this.contactName){
            const idxToBeDeleted = query.where.and.findIndex(obj => 'Name' in obj) 
            query.where.and.splice(idxToBeDeleted,1)
          }
          if(!this.accountName){
            const idxToBeDeleted = query.where.and.findIndex(obj => 'Account' in obj)
            query.where.and.splice(idxToBeDeleted,1)
          }
        // console.log('Search variables : ',this.contactName ,this.accountName);
        // console.log('query : ',query);
          return query;
          
    }

    handlePrevious(){
        if(this.hasPreviousPage){
            this.currentCursor =this.cursors.length<=1?null: this.cursors[this.cursors.length-2];
            this.cursors.pop();
            this.step = "prev";
            this.currentPageNumber=this.currentPageNumber-1;
        }
    }

    handleNext(){
        if(!this.hasNextPage) {
            this.currentCursor = null;
        }
        else {
            this.cursors.push(this.endCursor);
            this.currentCursor = this.endCursor;
        }
        this.step = "next";
        this.currentPageNumber=this.currentPageNumber+1;
    }

    contactHandler(e){
        this.resetVariables();
        const value = e.target?.value;
        this.contactName = !!value? `%${value}%` : null;
        
    }

    accountHandler(e){
        this.resetVariables();
        const value = e.target?.value;
        this.accountName = !!value? `${value}%` : null;
    }

    jumpToPagehandler(e){
        if (e.target.value && parseInt(e.target.value)>=1){
            this.recordsPerPage = parseInt(e.target.value);
        }else{
            this.recordsPerPage = 3;
        }
        this.resetVariables();
    }

    resetVariables(){
        this.currentCursor = null;
        this.cursors = [];
        this.step = null;
        this.currentPageNumber = 0;
        this.totalPageNumber = 0;
    }
}