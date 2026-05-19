/**
 * @description Service class to execute flows and parse their JSON output
 * @author Dipankar Sahoo
 * @date 2026-05-05
 */
public with sharing class FlowExecutorService {
    
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
            String jsonOutput = null;
            try {
                jsonOutput = (String)flowInterview.getVariableValue('jsonString');
                
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
    
}