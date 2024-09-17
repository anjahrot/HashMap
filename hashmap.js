import LinkedList from "./linkedList.js";

class HashMap {
    constructor() {
        this.buckets = new Array(16); 
        this.bucket_size = 16;
        this.loadFactor = 0.75; 
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
          hashCode = hashCode % this.bucket_size;
        }
        return hashCode;
      } 
    
    set(key, value) {
        let bucketIndex = this.hash(key);
        
        if (bucketIndex < 0 || bucketIndex >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
          }
        //New linked list in bucket if it is empty, with key-value pair as head node
        if(this.buckets[bucketIndex] === undefined) {
            const linkedList = new LinkedList();
            this.buckets[bucketIndex] = linkedList;
            linkedList.prepend(key, value);
        //Overwrite value if key already exists, else append to linked list
        } else{
            const linkedList = this.buckets[bucketIndex];  //store linked list as variable
            if(linkedList.contains(key)) {
                let tmp = linkedList.head();
                do {
                    if(tmp.key === key) tmp.value =  value; 
                    if(tmp.nextNode != null) tmp = tmp.nextNode; 
                } while(tmp.nextNode != null);
            } else {
                linkedList.append(key, value);
            }
        }
    }

    get(key) {
        let bucketIndex = this.hash(key);
        let value = null;
        if (bucketIndex < 0 || bucketIndex >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
          }
        let bucket = this.buckets[bucketIndex]; 
        if(bucket != undefined){
            if(bucket.contains(key)){
                const node = bucket.at(bucket.find(key));
                value = node.value;
            }
        }
        return value;   
    }

    has(key) {
        const keys = this.keys();
        let boolean = false;
        keys.forEach(item => {
            if(item === key) {
                boolean = true;
            } 
        });
        return boolean;
    }

    remove(key) {
        let bucketIndex = this.hash(key);
        let boolean;
        if (bucketIndex < 0 || bucketIndex >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
          }
        const bucket = this.buckets[bucketIndex];
        if(!bucket || !bucket.contains(key)){
            boolean = false;
        } else {
            const listIndex = bucket.find(key);
            bucket.removeAt(listIndex);
            boolean = true;
        }
        return boolean;   
    }

    length() {
        const keys = this.keys();
        let i=0;
        keys.forEach(item => {
            i++;
        })
        return i;
    }

    clear() {

    }

    keys() {
        let keysArray = [];
        this.buckets.forEach(bucket => {
            if(bucket.headNode) {     //Go through each bucket that is not empty or null
                let tmp = bucket.head();
                //add key to array, and traverse to next node if not null
                do {
                    keysArray.push(tmp.key);; 
                    if(tmp.nextNode != null) tmp = tmp.nextNode; 
                } while(tmp.nextNode != null);
            }
        });
        return keysArray;
    }

    values() {
        let valuesArray = [];
        this.buckets.forEach(bucket => {
            if(bucket != undefined) {     //Go through each bucket that is not empty
                let tmp = bucket.head();
                do {
                    valuesArray.push(tmp.value);; 
                    if(tmp.nextNode != null) tmp = tmp.nextNode; 
                } while(tmp.nextNode != null);
            }
        });
        return valuesArray;
    }


}

const test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('frog', 'blue');

console.log(test.get('frog'));
console.log(test.keys());
test.remove('grape');
console.log(test.keys());

