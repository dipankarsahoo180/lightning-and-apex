public with sharing class GetFilteredContacts {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> filterContacts(String firstName,String lastName,String Mobile){
        try {
            String queryString = 'Select Id,FirstName,LastName,Phone from Contact WHERE';
            String firstNamequery=String.isNotBlank(firstName)?' AND FirstName like:firstName':'';
            String lastNamequery= String.isNotBlank(lastName)?' AND LastName like:lastName':'';
            String MobileNamequery=String.isNotBlank(Mobile)?' AND Phone like:Mobile':'';

            String query= (queryString+firstNamequery+lastNamequery+MobileNamequery).replace('WHERE AND','WHERE');
            System.debug('queryString '+query);
            return Database.query(query);
                        
            /*
            String queryString = 'Select Id,FirstName,LastName,Phone from Contact WHERE';
            String firstNamequery=String.isNotBlank(firstName)?' AND FirstName like '+'\'%'+firstName+'%\'':'';
            String lastNamequery= String.isNotBlank(lastName)?' AND LastName like '+'\'%'+lastName+'%\'':'';
            String MobileNamequery=String.isNotBlank(Mobile)?' AND Phone like '+'\'%'+Mobile+'%\'':'';
            
            String query= (queryString+firstNamequery+lastNamequery+MobileNamequery).replace('WHERE AND','WHERE');
            System.debug('queryString '+query);
            return Database.query(query);
            */
                
        } catch (Exception e) {
            System.debug(e.getMessage());
            System.debug(e.getStackTraceString());
            return null;
        }
    }
    
}