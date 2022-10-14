const FULL_JSON = {
    "DentalPlansInit": 0.4997166820853236,
  "DentalPlans-Completed": false,
  "visionPage": {
    "VisionPlanCount": 1,
    "VirtualPlanCountInVision": 0,
    "HBLPlanCountInVision": 0,
    "MinDentalPlanVision": 1,
    "VisionPlans": null,
    "MinMedicalPlanVision": 1,
    "HBLVirtualCoexistInVision": false
  },
  "VisionPlansInit": 0.052528294366092076,
  "VisionPlans-Completed": false,
  "TrackUnselectedPlans": {
    "VisionPlans": [],
    "MedicalPlans": [],
    "DentalPlans": []
  },
  "test": "Deleted",
  "quoteId": "0Q0530000005MJ0CAM",
  "QuoteID": "0Q0530000005MJ0CAM",
  "productConfigurationDetail": {
    "records": [
      {
        "quoteLineItemId": "0QL530000007NuGGAU",
        "productName": "Blue Vision℠ 12/12/24 $0/$25",
        "Type__c": "Vision",
        "Product2Id": "01t4o000004MhKKAA0"
      },
      {
        "quoteLineItemId": "0QL530000007NuHGAU",
        "productName": "Blue Dental PPO Plus℠ 100/50/50/50 SG $1000",
        "Type__c": "Dental",
        "Product2Id": "01t4o000003jMCFAA2"
      },
      {
        "quoteLineItemId": "0QL530000007NuIGAU",
        "productName": "BCN HMO PCP Focus℠ Gold $1500",
        "Type__c": "Medical",
        "Product2Id": "01t4o000003jMBuAAM",
        "Carrier_Type__c": "BCN"
      },
      {
        "quoteLineItemId": "0QL530000007NuJGAU",
        "productName": "Pediatric Vision SG",
        "Type__c": "Vision",
        "Product2Id": "01t3s000004ir62AAA"
      },
      {
        "quoteLineItemId": "0QL530000007NuKGAU",
        "productName": "Blue Dental PPO Plus℠ 80/50/50 Pediatric SG",
        "Type__c": "Dental",
        "Product2Id": "01t4o000003jM9ZAAU"
      }
    ]
  },
  "RQLI": [
    {
      "PrdId": "01t4o000004MhKKAA0",
      "ID": "0QL530000007NuGGAU"
    },
    {
      "PrdId": "01t4o000003jMCFAA2",
      "ID": "0QL530000007NuHGAU"
    },
    {
      "PrdId": "01t4o000003jMBuAAM",
      "ID": "0QL530000007NuIGAU"
    },
    {
      "PrdId": "01t3s000004ir62AAA",
      "ID": "0QL530000007NuJGAU"
    },
    {
      "PrdId": "01t4o000003jM9ZAAU",
      "ID": "0QL530000007NuKGAU"
    }
  ],
  "QuoteNumber": "00100057",
  "RenewalPlans": [
    {
      "quoteLineItemId": "0QL530000007NuGGAU",
      "productName": "Blue Vision℠ 12/12/24 $0/$25",
      "Type__c": "Vision",
      "Product2Id": "01t4o000004MhKKAA0"
    },
    {
      "quoteLineItemId": "0QL530000007NuHGAU",
      "productName": "Blue Dental PPO Plus℠ 100/50/50/50 SG $1000",
      "Type__c": "Dental",
      "Product2Id": "01t4o000003jMCFAA2"
    },
    {
      "quoteLineItemId": "0QL530000007NuIGAU",
      "productName": "BCN HMO PCP Focus℠ Gold $1500",
      "Type__c": "Medical",
      "Product2Id": "01t4o000003jMBuAAM",
      "Carrier_Type__c": "BCN"
    },
    {
      "quoteLineItemId": "0QL530000007NuJGAU",
      "productName": "Pediatric Vision SG",
      "Type__c": "Vision",
      "Product2Id": "01t3s000004ir62AAA"
    },
    {
      "quoteLineItemId": "0QL530000007NuKGAU",
      "productName": "Blue Dental PPO Plus℠ 80/50/50 Pediatric SG",
      "Type__c": "Dental",
      "Product2Id": "01t4o000003jM9ZAAU"
    }
  ],
  "GetQuoteFirstCall:productConfigurationDetail:records": [
    {
      "quoteLineItemId": "0QL530000007NuGGAU",
      "productName": "Blue Vision℠ 12/12/24 $0/$25",
      "Type__c": "Vision",
      "Product2Id": "01t4o000004MhKKAA0"
    },
    {
      "quoteLineItemId": "0QL530000007NuHGAU",
      "productName": "Blue Dental PPO Plus℠ 100/50/50/50 SG $1000",
      "Type__c": "Dental",
      "Product2Id": "01t4o000003jMCFAA2"
    },
    {
      "quoteLineItemId": "0QL530000007NuIGAU",
      "productName": "BCN HMO PCP Focus℠ Gold $1500",
      "Type__c": "Medical",
      "Product2Id": "01t4o000003jMBuAAM",
      "Carrier_Type__c": "BCN"
    },
    {
      "quoteLineItemId": "0QL530000007NuJGAU",
      "productName": "Pediatric Vision SG",
      "Type__c": "Vision",
      "Product2Id": "01t3s000004ir62AAA"
    },
    {
      "quoteLineItemId": "0QL530000007NuKGAU",
      "productName": "Blue Dental PPO Plus℠ 80/50/50 Pediatric SG",
      "Type__c": "Dental",
      "Product2Id": "01t4o000003jM9ZAAU"
    }
  ],
  "CreateQuoteFired": "Yes",
  "censusPlanSelection": {
    "CorrectCombinationsMesage": true
  },
  "census2Random": 0.4957547349115077
};

export function fullJsonData4(){
  return FULL_JSON;
}