@isTest
public class ContentDocumentUpdaterTest {
    @isTest
    static void testCreateUpdateAndLinkContentDocument() {
        // Create a test Account
        Account testAccount = new Account(Name = 'Test Account');
        insert testAccount;

        // Create a test Contact
        Contact testContact = new Contact(LastName = 'Test Contact', AccountId = testAccount.Id);
        insert testContact;

        // Call the method to create, update, and link the ContentDocument
        Test.startTest();
        ContentDocumentUpdater.createUpdateAndLinkContentDocument(testAccount.Id, testContact.Id);
        Test.stopTest();

        // Query the ContentDocument
        ContentVersion cv = [SELECT Id, ContentDocumentId, VersionData FROM ContentVersion WHERE IsLatest = true LIMIT 1];
        Id contentDocumentId = cv.ContentDocumentId;

        // Verify the ContentDocument is linked to the Account
        List<ContentDocumentLink> accountLinks = [
            SELECT Id 
            FROM ContentDocumentLink 
            WHERE ContentDocumentId = :contentDocumentId AND LinkedEntityId = :testAccount.Id
        ];
        System.assertEquals(1, accountLinks.size(), 'ContentDocument is not linked to the Account.');

        // Verify the ContentDocument is linked to the Contact
        List<ContentDocumentLink> contactLinks = [
            SELECT Id 
            FROM ContentDocumentLink 
            WHERE ContentDocumentId = :contentDocumentId AND LinkedEntityId = :testContact.Id
        ];
        System.assertEquals(1, contactLinks.size(), 'ContentDocument is not linked to the Contact.');

        // Verify the updated version is visible
        System.assertEquals('This is the updated version of the file.', cv.VersionData.toString(), 'ContentDocument version was not updated.');
    }
}