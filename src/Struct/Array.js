import Rect from '../Graphics/Rect';

import Queue from './Queue';

class VisualArray {
    constructor(array) {
        this.array = array;
        this.length = array.length;
        this.currentIndex = 0;
        this.queue = this.createQueue();
        console.log(this.queue.isEmpty())

    }

    createQueue() {
        const queueOfRects = new Queue();
        this.array.forEach((size, index) => {
            queueOfRects.add(new Rect(index*30, 200, 25, size*10))
        })
        return queueOfRects;
    }

    

    render(ctx) {
        if(this.queue.isEmpty()) return;
            const rect = this.queue.head.value;
            rect.draw(ctx)
            this.queue.remove();
    }

}

export default VisualArray;