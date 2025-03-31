public class ObjectCompare {
    Private String key;
    public ObjectCompare(String key){
        this.key = key;
    }
    /**
    ObjectCompare obj1 = new ObjectCompare('Dipankar');
    ObjectCompare obj2 = new ObjectCompare('Dipankar');
    System.debug(obj1 == obj2); //false
    */
    
    //solution--> override equals and hashCode method of Object Class;
    public Boolean equals(Object obj){
        // Check if obj is an instance of EqualKey
        if(obj instanceOf ObjectCompare){
            // Cast obj to EqualKey
            ObjectCompare other = (ObjectCompare) obj;
            // Compare the key values
            return this.key.equals(other.key);
        }
        return false;
    }
    
    public Integer hashCode(){
        // Return the hash code of the key
        return this.key.hashCode();
    }
    
    /**
    ObjectCompare obj1 = new ObjectCompare('Dipankar');
    ObjectCompare obj2 = new ObjectCompare('Dipankar');
    System.debug(obj1 == obj2); //true
    obj2 = new ObjectCompare('Dipankar Sahoo');
    System.debug(obj1 == obj2); //false
    */
    
}