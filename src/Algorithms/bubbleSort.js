function normalSort(arr, index) {
    return arr[index] > arr[index+1];
};

function sortByDataSize(arr, index) {
    return arr[index].height < arr[index+1].height;
}

export function* bubbleSortG(arr) {
    let counter = 0;
    for(let j = 0; j < arr.length-1; j++)  {
        for(let i = 0; i < arr.length-j-1; i++) {
            if(arr[arr.length-j]) arr[arr.length-j].color = 'green';
            let swaped = false;
            counter++;
            if(counter> 1000) throw new Error('Overflow')
            if(sortByDataSize(arr, i))  {
                yield {index: i, isSwaped: false};
                yield {index: i, isSwaped: true};
                visualSwap(arr[i], arr[i+1]);
                swap(arr, i);
                swaped = true; 
            }
            yield {index: i, isSwaped: swaped};
        }
    } 
}

function visualSwap(first, second) {
    const temp = first.x;
    first.x = second.x;
    second.x = temp;
}

function swap(arr, index) {
            const temp = arr[index];
            arr[index] = arr[index+1];
            arr[index+1] = temp;        
}