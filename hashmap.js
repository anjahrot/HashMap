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
        let index = this.hash(key);
        
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
          }
        
          if(this.buckets[index] === undefined) {
            const linkedList = new LinkedList();
            this.buckets[index] = linkedList;
            linkedList.prepend(key, value);

        } else {
            const linkedList = this.buckets[index];
            linkedList.append(key, value);
        }
    }

    get(key) {
        let index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
          }

        //use method has(key) to check if exists first
        //if exists --> go through bucket finding the value/index in linked list?

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

    }

    length() {
        //use keys() count
    }

    clear() {

    }

    keys() {
        const keysArray = [];
        this.buckets.forEach(bucket => {
            if(bucket != undefined) {     //Go through each bucket that is not empty
                let tmp = bucket.head();
                keysArray.push(tmp.key);
                while(tmp.nextNode != null){
                    keysArray.push(tmp.key);
                    tmp = tmp.nextNode;
                }
            }
        });
        return keysArray;
    }

    values() {
        const valuesArray = [];
        this.buckets.forEach(bucket => {
            if(bucket != undefined) {     //Go through each bucket that is not empty
                let tmp = bucket.head();
                keysArray.push(tmp.values);
                while(tmp.nextNode != null){    //Go through each node in linked list adding keys
                    keysArray.push(tmp.values);
                    tmp = tmp.nextNode;
                }
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
console.log(test.has('cat'));
console.log(test.has('grape'));
