class Queue {
    constructor(...args) {
        args.forEach(arg => this.add(arg))
    }
    isEmpty() {
        return this.head === null
    }
    add(val) {
        const node = new Node(val)
        if(this.tail) {
            this.tail.next = node;
        } 
        this.tail = node;
        if(!this.head) {
            this.head = node;
        }
    }
    remove() {
        if(!this.head) return;
        const value = this.head.value;
        this.head = this.head.next;
        if(this.head === null) {
            this.tail = null;
        }
        return value;
    }
    toString() {
        let current = this.head;
        let s = '';
        while(current) {
            s += `${current.value}`;
            if(current.next) {
                s += ' -> '
            }
            current = current.next;
        }
        return `Queue (${s})`;
    }
    getHead() {
        return this.head.value;
    }
    getTail() {
        return this.tail.value;
    }
}

class Node {
    constructor(val, next) {
        this.value = val;
        this.next = next? next: null;
    }
}
export default Queue;
