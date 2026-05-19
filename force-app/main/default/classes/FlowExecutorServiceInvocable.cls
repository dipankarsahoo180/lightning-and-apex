/**
 * @description Service class to execute flows and parse their JSON output
 * @author Dipankar Sahoo
 * @date 2026-05-05
 */
public with sharing class FlowExecutorServiceInvocable {
    
    /**
     * @description Invocable method to execute flow from another Flow
     * @param requests List of FlowRequest objects containing input parameters
     * @return List of FlowResponse objects containing parsed results
     */
    @InvocableMethod(label='Execute Flow and Parse JSON'
                     description='Executes a flow with ContentDocument ID and parses the JSON output'
                     category='Document Processing')
    public static List<FlowResponse> executeFromFlow(List<FlowRequest> requests) {
        List<FlowResponse> responses = new List<FlowResponse>();
        
        for (FlowRequest request : requests) {
            FlowResponse response = new FlowResponse();
            try {
                Map<String, Object> result = executeFlowAndParseOutput(
                    request.contentDocumentId,
                    request.flowName
                );
                
                // Convert Map to individual fields for Flow accessibility
                if (result != null) {
                    response.degreeName = (String) result.get('DegreeName');
                    response.institutionName = (String) result.get('InstitutionName');
                    response.degreeType = (String) result.get('DegreeType');
                    response.scoreType = (String) result.get('ScoreType');
                    response.marksObtained = result.get('MarksObtained') != null ? 
                        Integer.valueOf(result.get('MarksObtained')) : null;
                    response.totalMarks = result.get('TotalMarks') != null ? 
                        Integer.valueOf(result.get('TotalMarks')) : null;
                    response.isOCRSuccess = (Boolean) result.get('IsOCRSuccess');
                    response.success = true;
                    response.resultJson = JSON.serialize(result);
                } else {
                    response.success = false;
                    response.errorMessage = 'Flow returned null or empty result';
                }
            } catch (Exception e) {
                response.success = false;
                response.errorMessage = e.getMessage();
            }
            responses.add(response);
        }
        
        return responses;
    }
    
    /**
     * @description Executes a flow with ContentDocument ID and returns parsed JSON as Map
     * @param contentDocumentId The ID of the ContentDocument to process
     * @param flowName The API name of the flow to execute
     * @return Map<String, Object> Parsed JSON output from the flow
     * @throws AuraHandledException if flow execution or parsing fails
     */
    @AuraEnabled
    public static Map<String, Object> executeFlowAndParseOutput(
        String contentDocumentId, 
        String flowName
    ) {
        try {
            // Validate inputs
            if (String.isBlank(contentDocumentId)) {
                throw new IllegalArgumentException('ContentDocument ID cannot be blank');
            }
            if (String.isBlank(flowName)) {
                throw new IllegalArgumentException('Flow name cannot be blank');
            }
            
            // Prepare flow input parameters
            Map<String, Object> flowInputs = new Map<String, Object>();
            flowInputs.put('fileID', contentDocumentId);
            
            // Execute the flow
            Flow.Interview flowInterview = Flow.Interview.createInterview(flowName, flowInputs);
            flowInterview.start();
            
            // Retrieve the output from the prompt action
            // The flow uses storeOutputAutomatically which creates variables based on action name
            String jsonOutput = null;
            
            // Try to get the response from the generatePromptResponse action
            // Pattern: {ActionName}.generatedText or {ActionName}.responseText
            try {
                jsonOutput = (String)flowInterview.getVariableValue('jsonString');
                System.debug('jsonOutput==>'+ jsonOutput);
                
            } catch (Exception e) {
                System.debug('Could not find ' + flowName + '.generatedText: ' + e.getMessage());
            }            
            // Parse JSON string to Map
            Map<String, Object> resultMap = parseJsonToMap(jsonOutput?.replace('json',''));
            
            return resultMap;
            
        } catch (Exception e) {
            // Log the error for debugging
            System.debug(LoggingLevel.ERROR, 'Error executing flow: ' + e.getMessage());
            System.debug(LoggingLevel.ERROR, 'Stack trace: ' + e.getStackTraceString());
            
            // Throw AuraHandledException for LWC
            throw new AuraHandledException('Failed to execute flow and parse output: ' + e.getMessage());
        }
    }
    
    /**
     * @description Parses JSON string to Map with proper type handling
     * @param jsonString The JSON string to parse
     * @return Map<String, Object> Parsed map with proper data types
     */
    @TestVisible
    private static Map<String, Object> parseJsonToMap(String jsonString) {
        try {
            // Remove any leading/trailing whitespace
            jsonString = jsonString?.trim();
            
            // Check if jsonString is blank - return null early
            if (String.isBlank(jsonString)) {
                return null;
            }
            
            // Remove markdown code blocks if present (```json ... ```)
            if (jsonString.startsWith('```')) {
                Integer firstNewline = jsonString.indexOf('\n');
                if (firstNewline > 0) {
                    jsonString = jsonString.substring(firstNewline + 1);
                }
                if (jsonString.endsWith('```')) {
                    jsonString = jsonString.substring(0, jsonString.length() - 3);
                }
                jsonString = jsonString.trim();
            }
            
            // Parse JSON using standard JSON deserialization
            Map<String, Object> rawMap = (Map<String, Object>) JSON.deserializeUntyped(jsonString);
            
            // Create result map with proper type conversion
            Map<String, Object> resultMap = new Map<String, Object>();
            
            for (String key : rawMap.keySet()) {
                Object value = rawMap.get(key);
                
                // Handle different data types appropriately
                if (value instanceof String) {
                    resultMap.put(key, (String) value);
                } else if (value instanceof Integer) {
                    resultMap.put(key, (Integer) value);
                } else if (value instanceof Decimal) {
                    // Convert Decimal to Integer if it's a whole number
                    Decimal decValue = (Decimal) value;
                    if (decValue == decValue.intValue()) {
                        resultMap.put(key, decValue.intValue());
                    } else {
                        resultMap.put(key, decValue);
                    }
                } else if (value instanceof Boolean) {
                    resultMap.put(key, (Boolean) value);
                } else {
                    // Keep the value as-is for other types
                    resultMap.put(key, value);
                }
            }
            
            return resultMap;
            
        } catch (JSONException e) {
            throw new FlowExecutionException('Invalid JSON format: ' + e.getMessage());
        }
    }
    
    /**
     * @description Custom exception for flow execution errors
     */
    public class FlowExecutionException extends Exception {}
    
    /**
     * @description Input wrapper class for Flow invocable method
     */
    public class FlowRequest {
        @InvocableVariable(label='Content Document ID' description='ID of the ContentDocument to process' required=true)
        public String contentDocumentId;
        
        @InvocableVariable(label='Flow Name' description='API name of the flow to execute' required=true)
        public String flowName;
    }
    
    /**
     * @description Output wrapper class for Flow invocable method
     */
    public class FlowResponse {
        @InvocableVariable(label='Success' description='Whether the operation succeeded')
        public Boolean success;
        
        @InvocableVariable(label='Error Message' description='Error message if operation failed')
        public String errorMessage;
        
        @InvocableVariable(label='Degree Name' description='Extracted degree name')
        public String degreeName;
        
        @InvocableVariable(label='Institution Name' description='Extracted institution name')
        public String institutionName;
        
        @InvocableVariable(label='Degree Type' description='Type of degree (e.g., Undergraduate, Graduate)')
        public String degreeType;
        
        @InvocableVariable(label='Score Type' description='Type of scoring system (e.g., Marks, GPA)')
        public String scoreType;
        
        @InvocableVariable(label='Marks Obtained' description='Marks obtained by the student')
        public Integer marksObtained;
        
        @InvocableVariable(label='Total Marks' description='Total marks possible')
        public Integer totalMarks;
        
        @InvocableVariable(label='OCR Success' description='Whether OCR was successful')
        public Boolean isOCRSuccess;
        
        @InvocableVariable(label='Result JSON' description='Full result as JSON string')
        public String resultJson;
    }
    
}