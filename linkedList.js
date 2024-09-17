import Node from "./node.js";

export default class LinkedList {
    constructor() {
        this.headNode = null;
        this.tailNode = null;
    }

    append(key, value) {
        if(this.headNode == null) this.prepend(key, value);
        else {
            let tmp = this.headNode;
            while(tmp.nextNode != null) tmp = tmp.nextNode;

            tmp.nextNode = new Node(key, value);
        }
        
    }

    prepend(key, value) {
        this.headNode = new Node(key, value, this.headNode)
    }

    size() {
        if(this.headNode == null) return 0;
        else {
            let tmp = this.headNode;
            let size = 1;
            while(tmp.nextNode != null) {
                tmp = tmp.nextNode;
                size += 1;
            }
        return size;
        }
    }

    head() {
        return this.headNode;
    }

    tail() {
        const length = this.size();
        let tmp = this.headNode;
        for(let i=0;i<(length-1);i++){
            tmp = tmp.nextNode;
        }
        return tmp;
    }
    
    //Return nodes value at given index in linked list //problem med denne metode, viss fleire??
    at(index) {
        let tmp = this.headNode;
        for(let i=0;i<(index-1);i++) {
            tmp = tmp.nextNode;
        }
        return tmp;
    }

    pop() {
        if(!this.headNode) return; //If list is empty
        else if(!this.headNode.nextNode) {
            this.headNode = null;
            this.tailNode = null;
        } else {
            const length = this.size();
            const prev = this.at(length-1);
            let tail = this.tail();
            prev.nextNode = tail.nextNode;
        }
    }

    contains(key) {
        const length = this.size();
        let tmp = this.headNode;
        for(let i=0;i<length;i++){
            if(tmp.key === key) return true;
            tmp = tmp.nextNode;
        }
        return false;
    }

    find(key) {
        const length = this.size();
        let tmp = this.headNode;
        for(let i=1;i<=length;i++){
            if(tmp.key === key) return i;
            tmp = tmp.nextNode;
        }
        return null;
    }

    removeAt(index){
        if(index === 1) {
            let nodeAfter = this.at(index+1);
            this.headNode = nodeAfter;
        }
        else if(index > 1 && this.size() >= index) {
            let nodeBefore = this.at(index-1);
            let nodeRemove = this.at(index);
            nodeBefore.nextNode = nodeRemove.nextNode;
        }else{
            console.error("Error occured:", "List index does not exist");
        }
    }

}

// const list = new LinkedList;
// list.append('pig', 'orange');
// list.append('rat', 'grey');
// console.log(list.size());
// console.log(list.contains('pig'));
// console.log(list.find('rat'));
// console.log(list.removeAt(list.find('rat')));
// console.log(list.size());