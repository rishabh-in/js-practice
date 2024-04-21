// We have to implement LRU cache
// Size of cache will be 5
// You have to store the data in key value format
// If there are already 5 items in cache and we tried to add more then the LRU item will be rempoved
// For this we need two data structure. First to store cache item, second to store the order
// To store the cache item we can use map
// To store the order we can use DLL (Doubly linked list)

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class DLL {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    addItemInFront(key) {
        const newNode = new Node(key);
        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
    }

    moveItemToFront(key) {
        // traverse the DLL and find the node
        if(key == this.head.val) {
            return;
        }
        let cursor = this.head;
        while(cursor.val !== key) {
            cursor = cursor.next;
        };
        if(cursor.next == null) {
            cursor.prev.next = null;
        }
        if(cursor.prev && cursor.next) {
            cursor.prev.next = cursor.next;
            cursor.next.prev = cursor.prev;
        }
        cursor.next = this.head;
        cursor.prev = null;
        this.head.prev = cursor;
        this.head = cursor;
    }

    removeTail() {
        this.tail = this.tail.prev;
        this.tail.next = null;
    }

    traverse() {
        let cursor = this.head;
        while(cursor!= null) {
            console.log(cursor.val);
            cursor = cursor.next;
        }
    }
}

class LRUCache {
    constructor() {
        this.capacity = 5;
        this.cache = new Map();
        this.order = new DLL();
    }

    getItem(key) {
        const item = this.cache.has(key) ? this.cache.get(key) : null;
        if(item) {
            // move this item  in front of DLL
            this.order.moveItemToFront(key)
        }
        return item;
    }

    setItem(key, value) {
        // check if item already there. If yes then update else add new item
        if(this.cache.has(key)) {
            this.cache.set(key, value)
            // move this key in front of DLL
            this.order.moveItemToFront(key)
        } else {
            // check size of map
            // If less then capacity then add it in map and add this item  in front of DLL
            // If more then capacity then remove the LRU from map, and add this item in map and also
            // in front of the DLL
            if(this.cache.size >= 5) {
                // get LRU key from DLL
                const lruKey = this.order.tail;
                // Remove it from map
                this.cache.delete(lruKey.val);
                // remove the key from DLL
                this.order.removeTail();
                // add the new item in map
                this.cache.set(key, value)
                // add the new item key in DLL
                this.order.addItemInFront(key)
            } else {
                // add the item in map
                this.cache.set(key, value);
                // add the item in front of DLL
                this.order.addItemInFront(key)
            }
        }
    }

    showOrder() {
        this.order.traverse();
    }

    displayAllItem() {
        this.cache.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        })
    }
}

const lru = new LRUCache();
lru.setItem("key1", "value1");
lru.setItem("key2", "value2");
lru.setItem("key3", "value2");
lru.setItem("key4", "value2");
lru.setItem("name", "rishabh");
lru.setItem("name 2", "shruti");

lru.getItem("key3")
lru.showOrder();
