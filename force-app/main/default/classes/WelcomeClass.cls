@RestResource(urlMapping='/v1/welcome/*')
global with sharing class WelcomeClass {
    global final static String WelcomeString = 'Welcome to rest calout by Dipankar';
    @HttpGet
    global static string getGreetingMessage(){
        return WelcomeString;
    }

    @HttpPost
    global static String postGreetingMessage(String Message){
        return Message;
    }

}