import { LightningElement, wire } from 'lwc';
import { gql, graphql } from "lightning/uiGraphQLApi";

export default class GraphQlPoc extends LightningElement {

    gqlData;
    gqlError;
    accountName;

    @wire(graphql,{
        query: "$recordQuery",variables: "$variables"
    })
    graphqlQueryResult({ data, errors }){
        if(data) {
            this.gqlData = JSON.stringify(data);
            this.gqlError = null;
        }
        else{
            this.gqlData = null;
            this.gqlError = JSON.stringify(errors);
        }
    }

    handleChange(e){
        this.accountName = '%'+e.target.value+'%';
    }

    get variables(){
        return {"accountName":this.accountName};
    }

    get recordQuery(){
        if(!this.accountName) return undefined;
        else 
        return gql`
            query($accountName:String) {
                uiapi {
                    query {
                    Account(where: { Name: { like: $accountName } }) {
                        edges {
                        node {
                            ...accDetails
                        }
                        }
                        pageResultCount
                        totalCount
                        pageInfo {
                        hasPreviousPage
                        hasNextPage
                        startCursor
                        endCursor
                        }
                    }
                    Object_A__c {
                        edges {
                        node {
                            ...object_A_details
                        }
                        }
                    }
                    }

                    
                    objectInfos(apiNames: ["Account"]) {
                    fields {
                        ApiName
                        label
                    }
                    recordTypeInfos {
                        name
                        defaultRecordTypeMapping
                        recordTypeId
                        master
                        available
                    }
                    }
                }
                }

                fragment AccountNameField on StringValue {
                value
                }

                fragment object_B_details on Object_B__c {
                Id
                Name {
                    value
                }
                Object_C__r {
                    Name {
                    value
                    }
                    Id
                }
                }

                fragment object_A_details on Object_A__c {
                Id
                Name {
                    value
                }
                Object_B__r {
                    edges {
                    node {
                        ...object_B_details
                    }
                    }
                }
                }

                fragment accDetails on Account {
                Contacts {
                    edges {
                    node {
                        Id
                        Name {
                        value
                        }
                        Account {
                        Name {
                            value
                        }
                        }
                    }
                    }
                }
                Id
                Name {
                    ...AccountNameField
                }
                Industry {
                    value
                }
                ShippingStreet {
                    value
                }
            }

        `
    }
}