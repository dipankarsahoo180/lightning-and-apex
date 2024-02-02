public with sharing class testgetAccounts {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String AccountName){
        try {
            return [Select Id, Name,Industry from Account where Name like:AccountName];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}