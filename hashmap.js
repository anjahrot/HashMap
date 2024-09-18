import LinkedList from "./linkedList.js";

class HashMap {
    constructor(bucket_size = 16) {
        this.buckets = new Array(bucket_size); 
        this.bucket_size = bucket_size;
        this.loadFactor = 0.75; 
        this.capacity = 0;
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.bucket_size;
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
            this.capacity++;
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
                this.capacity++;
            }
        }
        if(this.capacity > this.bucket_size*this.loadFactor) {
            this.growBuckets();
        }
    }

    growBuckets() {
        const newHashMap = new HashMap(2*this.bucket_size);
        const entries = this.entries();
        //change bucket_size before new hash in set-method
        this.bucket_size = 2*this.bucket_size;
        entries.forEach(item => {
            let key = item[0];
            let value = item[1]; 
            newHashMap.set(key, value);
        })
        this.buckets = newHashMap.buckets; //Copy buckets
    }

    get(key) {
        let bucketIndex = this.hash(key);
        let value = null;
        if (bucketIndex < 0 || bucketIndex >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
          }
        let bucket = this.buckets[bucketIndex]; 
        
        if(bucket.contains(key)){
            const node = bucket.at(bucket.find(key));
            value = node.value;
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
        if(!bucket.contains(key)){
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
        this.bucket_size = 16;
        this.buckets = new Array(this.bucket_size);
        this.capacity = 0;  
    }

    keys() {
        let keysArray = [];
        this.buckets.forEach(bucket => {
            if(bucket.headNode) {     //Go through each bucket that does not have headNode = null
                let tmp = bucket.head();
                keysArray.push(tmp.key);
                //add key to array, and traverse to next node if not null
                while(tmp.nextNode != null) {
                    tmp = tmp.nextNode; 
                    keysArray.push(tmp.key);
                }
            }
        });
        return keysArray;
    }

    values() {
        let valuesArray = [];
        this.buckets.forEach(bucket => {
            if(bucket.headNode) {     //Go through each bucket that is not empty - headnode truthy
                let tmp = bucket.head();
                valuesArray.push(tmp.value);
                while(tmp.nextNode != null) {
                    tmp = tmp.nextNode; 
                    valuesArray.push(tmp.value);
                }
            }
        });
        return valuesArray;
    }

    entries () {
        let array = [];
        const keys = this.keys();
        const values = this.values();
        for(let i=0;i<keys.length;i++){
            array.push([keys[i], values[i]]);
        }
        return array;
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
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('moon', 'silver');
test.set('frog', 'blue');
console.log(test.length());
console.log(test.remove('moon'));
test.clear();
console.log(test.entries());
console.log(test);
test.set('moon', 'silver');
console.log(test.entries());


