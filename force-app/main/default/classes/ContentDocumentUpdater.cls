public class ContentDocumentUpdater {
    /**
     * Creates a ContentDocument, links it to an Account, updates the version, and links it to a Contact.
     *
     * @param accountId The ID of the Account to link the file to.
     * @param contactId The ID of the Contact to link the file to.
     */
    public static void createUpdateAndLinkContentDocument(Id accountId, Id contactId) {
        // Step 1: Create a ContentVersion (and ContentDocument)
        ContentVersion cv = new ContentVersion(
            Title = 'Test File',
            PathOnClient = 'TestFile.txt',
            VersionData = Blob.valueOf('This is the first version of the file.'),
            FirstPublishLocationId = UserInfo.getUserId()  //optional, can also be sobject,library Id as well
        );
        insert cv;

        // Query the ContentDocumentId
        cv = [SELECT Id, ContentDocumentId FROM ContentVersion WHERE Id = :cv.Id];
        Id contentDocumentId = cv.ContentDocumentId;

        // Step 2: Link the ContentDocument to the Account
        ContentDocumentLink cdlAccount = new ContentDocumentLink(
            ContentDocumentId = contentDocumentId,
            LinkedEntityId = accountId,
            ShareType = 'V', // View access
            Visibility = 'AllUsers' // Visible to all users
        );
        insert cdlAccount;

        // Step 3: Update the ContentDocument with a new version
        ContentVersion newCv = new ContentVersion(
            Title = 'Updated Test File',
            PathOnClient = 'UpdatedTestFile.txt',
            VersionData = Blob.valueOf('This is the updated version of the file.'),
            ContentDocumentId = contentDocumentId // Link to the same ContentDocument
        );
        insert newCv;

        // Step 4: Link the updated ContentDocument to the Contact
        ContentDocumentLink cdlContact = new ContentDocumentLink(
            ContentDocumentId = contentDocumentId,
            LinkedEntityId = contactId,
            ShareType = 'V', // View access
            Visibility = 'AllUsers' // Visible to all users
        );
        insert cdlContact;

        System.debug('ContentDocument updated and linked to Account and Contact.');
    }
}