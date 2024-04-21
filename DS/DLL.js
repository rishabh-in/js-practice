// Doubly linked list
// User for LRU and MRU - cache construction

// We will need a node class
// And we need a DLL class
// Node consist of nodes
// Each node will have 3 properties
// 1. Prev pointer 2. Next pointer 3. Data

// DLL will have two properties
// Head and tail

class Node {
    constructor(val) {
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class DLL {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    
    isEmpty() {
        return (this.head == null);
    }

    addItem(val) {
        const newNode = new Node(val);
        if(this.head == null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            // Insert at the last
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode
        }
    }

    traverse(order) {
        if(order == 'reverse') {
            let pointer = this.tail;
            while(pointer !== null) {
                console.log(pointer.val);
                pointer = pointer.prev;
            }
        } else {
            let pointer = this.head;
            while(pointer !== null) {
                console.log(pointer.val);
                pointer = pointer.next;
            }
        }

    }

}

const dll = new DLL();
for(let i = 0; i <= 10; i++) {
    dll.addItem(i);
}

dll.traverse('');