public class generateData {

   @AuraEnabled(cacheable=true)
    public static List<Contact> generateContacts(){
        return [Select Id,FirstName,LastName,CreatedDate,Email from Contact ORDER BY CreatedDate DESC];
    }

}