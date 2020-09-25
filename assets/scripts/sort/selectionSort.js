import { sortByDataSize } from './helperFunctions.js';


export function* selectionSort(arr) {
    console.log('selection sort started!')
    let totallSwaps = 0;
    for (let i = 0; i < arr.length; i++) {
        
        let minIndex = i
        for (let j = i+1; j < arr.length; j++) {
            if(sortByDataSize(arr, j, minIndex)) {
                arr[minIndex].lastChild.setAttribute('style', 'fill: 	#ffdfba');//basic
                minIndex = j;
            };
            arr[i].lastChild.setAttribute('style', 'fill: 	#01cdfe');//sciene
            yield [arr, j, j-1];
            arr[i].lastChild.setAttribute('style', 'fill: 	#ffdfba');//basic
            arr[minIndex].lastChild.setAttribute('style', 'fill: 	#ffb3ba');//red
            if(j+1 === arr.length) {
                arr[j].lastChild.setAttribute('style', 'fill: 	#ffdfba');//basic
            };
        };
        arr[minIndex].lastChild.setAttribute('style', 'fill: 	#5cb85c');//dark green
        
        swapSel(arr, i, minIndex);
        arr[i].lastChild.setAttribute('style', 'fill: 	#5cb85c');//dark green
    }
    console.log('--------------');
    console.log('totall swaps', totallSwaps);
    return arr;
}

export function visualizeSwapSel(arr, index, minIndex) {
    const temp = arr[index].getAttribute('transform');
    arr[index].setAttribute('transform', arr[minIndex].getAttribute('transform'));
    arr[minIndex].setAttribute('transform', temp);
};

export function swapSel(arr, index, minIndex) {
            visualizeSwapSel(arr, index, minIndex);
            const temp = arr[index];
            arr[index] = arr[minIndex];
            arr[minIndex] = temp;
} 