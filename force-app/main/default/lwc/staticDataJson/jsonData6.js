const FULL_JSON = {
    "section3": [
        {
          "plans": null,
          "member": {
            "attributes": {
              "type": "vlocity_ins__GroupCensusMember__c",
              "url": "/services/data/v55.0/sobjects/vlocity_ins__GroupCensusMember__c/a57530000008UHUAA2"
            },
            "Id": "a57530000008UHUAA2",
            "vlocity_ins__LastName__c": "ds",
            "vlocity_ins__IsPrimaryMember__c": true,
            "vlocity_ins__Birthdate__c": "1990-12-12",
            "vlocity_ins__MemberType__c": "Regular",
            "Relationship__c": "Employee",
            "MemberAge__c": 31,
            "vlocity_ins__FirstName__c": "as",
            "Status__c": "Enrolling"
          }
        }
      ],
      "updatedQLIs": [
        {
          "Type__c": "Vision",
          "Price": 123.00,
          "Name": "Blue Vision℠ 12/12/24 $0/$25"
        },
        {
          "Type__c": "Dental",
          "Price": 120.00,
          "Name": "Blue Dental PPO Plus℠ 100/50/50/50 SG $1000"
        },
        {
          "Type__c": "Medical",
          "Price": 80.00,
          "Name": "BCN HMO PCP Focus℠ Gold $1500"
        },
        {
          "Type__c": "Vision",
          "Price": 90.00,
          "Name": "Pediatric Vision SG"
        },
        {
          "Type__c": "Dental",
          "Price": 100.00,
          "Name": "Blue Dental PPO Plus℠ 80/50/50 Pediatric SG"
        }
      ]
};

export function fullJsonData6(){
  return FULL_JSON;
}