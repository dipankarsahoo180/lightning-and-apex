@RestResource(urlMapping='/askAgent')
global without sharing class AgentService {
    
    @HttpPost
    global static String askAgent(String accountName) {
        String wildCard = '%'+accountName+'%';
        List<Account> acc = [Select Id from Account where Name like :wildCard];
        if(acc.size()>0){
            String accountId = acc[0].Id;
            return LiveAgentInteraction.getPromptResponse(accountId);
        }
        	
        else{
            return JSON.serialize(new Map<String, List<Map<String,String>>>{
            'askAgentOutput' => new List<Map<String,String>>{
                					new Map<String,String>{'content'=>'No account found in Salesforce for ' + accountName}
            					}
			});

        }
    }
}