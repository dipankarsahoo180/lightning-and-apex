public with sharing class RunIntegrationProcedureFromApex {
    
    public static List<Map<String,String>> getPickListValuesFromIP(String AccountId){
        /* Integration Procedure type_subtype */
        String procedureName = 'sample_picklistMapCreation';

        /* Creating map for an Integration Procedure.*/
        Map<String, Object> ipInput = new Map<String, Object>();
        Map<String, Object> ipOptions = new Map<String, Object>();
        Map<String, Object> ipOutput = new Map<String, Object>();
        List<Map<String,String>> picklistValueList = new List<Map<String,String>>();
        ipInput.put('AccountId', AccountId);

        try {
            /* Call the IP via runIntegrationService, 
            and save the output to ipOutput */
            ipOutput = (Map<String, Object>) 
                        omnistudio.IntegrationProcedureService.runIntegrationService
                        (procedureName, ipInput, ipOptions);
            
            //create a map of picklist label and values
        } catch (Exception e) {
            System.debug('Exception Occured');
            System.debug(e.getMessage());
            System.debug(e.getStackTraceString());
        }
        for(Object eachValueFromIP:(List<Object>)ipOutput.get('PicklistValueList')){
            Map<String,Object>picklistMap = (Map<String,Object>)eachValueFromIP;
            String value=(String)picklistMap.get('value');
            String name=(String)picklistMap.get('name');
            picklistValueList.add(new Map<String,String>{'value'=>value,'name'=>name});

        }
        System.debug('picklistValueList');
        System.debug(picklistValueList);
        return picklistValueList;
    }
}