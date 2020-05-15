function dataSizeSort(arr, index) {
    return parseInt(arr[index].dataset.size) > parseInt(arr[index+1].dataset.size);
};

function normalSort(arr, index) {
    return arr[index] > arr[index+1];
};

function* bubbleSort(arr) {
    let index;
    let isSwapped;
    let counter = 0;
    let lastElementIndex;
    while(true) {
        isSwapped = false;
        index = 0;
        counter++;
        while(index < arr.length-1*counter) {
            if(dataSizeSort(arr, index)) {
                arr[index+1].lastChild.setAttribute('style', 'fill: 	#ffb3ba');//red
                arr[index].lastChild.setAttribute('style', 'fill: 	#ffb3ba');//red
                swap(arr, index);
                isSwapped = true;
            };
            index++;
           
            yield [index, isSwapped, lastElementIndex];
            if(index === arr.length-1*counter) {
                lastElementIndex = index;
            };
        }; 
        
        if (!isSwapped) {
            for(let i = 0; i < counter; i++) {
                arr[i].lastChild.setAttribute('style', 'fill: #bae1ff');//blue
            }
            return arr
        };
    };
};

function visualizeSwap(arr, index) {
    const temp = arr[index].getAttribute('transform');
    arr[index].setAttribute('transform', arr[index+1].getAttribute('transform'));
    arr[index+1].setAttribute('transform', temp);
};

function swap(arr, index) {
            visualizeSwap(arr, index);
            const temp = arr[index];
            arr[index] = arr[index+1];
            arr[index+1] = temp;        
}