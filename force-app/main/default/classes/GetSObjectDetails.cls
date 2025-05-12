public with sharing class GetSObjectDetails {
    
    @AuraEnabled(cacheable=true)
    public static Map<String,List<Map<String,String>>> getAccountInfos(){
        try {
            List<Map<String,String>> rectypeList = getRecordTypeDetails('Account');
            List<Map<String,String>> picklistValueList = getPicklistFields('Account');
            Map<String,List<Map<String,String>>> returnMap = new Map<String,List<Map<String,String>>>();
            returnMap.put('recordTypes', rectypeList);
            returnMap.put('picklists', picklistValueList);
            return returnMap;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    public static List<Map<String,String>> getRecordTypeDetails(String objectName){
        Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe();
        Schema.SObjectType accountType = gd.get(objectName);
        Schema.DescribeSObjectResult r = accountType.getDescribe();
        
        // Get RecordTypeInfos
        List<Schema.RecordTypeInfo> rtInfos = r.getRecordTypeInfos();
        List<Map<String,String>> rcList = new List<Map<String,String>>();
        
        // Iterate over the RecordTypeInfos
        for (Schema.RecordTypeInfo rtInfo : rtInfos) {
            Map<String,String> rcMap = new Map<String,String>();
            rcMap.put('RecordTypeName', rtInfo.getName());
            rcMap.put('RecordTypeId', rtInfo.getRecordTypeId());
            rcList.add(rcMap);
        }
        return rcList;
    }
    
    
    public static List<Map<String,String>> getPicklistFields(String objectName) {
        // Get the global describe map
        Map<String, Schema.SObjectType> globalDescribe = Schema.getGlobalDescribe();
        
        // Get the SObjectType for the object
        Schema.SObjectType sObjectType = globalDescribe.get(objectName);
        
        // Get the describe result
        Schema.DescribeSObjectResult describeResult = sObjectType.getDescribe();
        
        // Get all fields
        Map<String, Schema.SObjectField> fieldMap = describeResult.fields.getMap();
        
        List<Map<String,String>> picklistFields = new List<Map<String,String>>();
        
        // Loop through fields and check if the type is Picklist
        for (String fieldName : fieldMap.keySet()) {
            Schema.DescribeFieldResult fieldDesc = fieldMap.get(fieldName).getDescribe();
            
            if (fieldDesc.getType() == Schema.DisplayType.Picklist) {
                Map<String,String>  picklistFieldMap = new Map<String,String>();
                picklistFieldMap.put('fieldName',fieldDesc.getName());
                picklistFieldMap.put('fieldLabel',fieldDesc.getLabel());
                picklistFields.add(picklistFieldMap);
            }
        }
        return picklistFields;
    }
    
    @AuraEnabled(cacheable= true)
    public static List<Account> getAccounts(String picklist,String picklistvalue, String recordTypeId){
        try {
            String query = 'SELECT Id, Name, Industry,IsActive__c FROM Account WHERE ' + picklist + ' = \'' + picklistvalue + '\' ' +
                'AND RecordTypeId = \'' + recordTypeId + '\'';
            System.debug('query: ' + query);
            return Database.query(query);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Map<String, String>> getPicklistValueByRecordType(String objectName, String fieldName, String recordTypeId) {
        List<Map<String, String>> picklistContainer = new List<Map<String, String>>();
        
        try {
            // Get SObject describe
            Schema.SObjectType objType = Schema.getGlobalDescribe().get(objectName);
            Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
            
            // Get field describe
            Map<String, Schema.SObjectField> fieldMap = objDescribe.fields.getMap();
            
            if (!fieldMap.containsKey(fieldName)) {
                throw new AuraHandledException('Field not found on object.');
            }
            
            Schema.DescribeFieldResult fieldResult = fieldMap.get(fieldName).getDescribe();
            
            // Get picklist values specific to RecordTypeId
            List<Schema.PicklistEntry> picklistValues = fieldResult.getPicklistValues();
            
            for (Schema.PicklistEntry entry : picklistValues) {
                picklistContainer.add(new Map<String, String>{
                    'label' => entry.getLabel(),
                    'name' => entry.getValue()
                });
            }
            
        } catch (Exception ex) {
            throw new AuraHandledException('Error fetching picklist values: ' + ex.getMessage());
        }
        
        return picklistContainer;
    }
    
}