import {HEIGHT, WIDTH} from '../renderArray.js';

let counter = 0;
let globalLastElement;

function setDataComparasing(arr, index1, index2) {
    return parseInt(arr[index1].dataset.size) < parseInt(arr[index2].dataset.size);
}

function* merge(arr, start, mid, end) {
    const temp = [];
    const width = Math.trunc(WIDTH/arr.length) - 1;
    let [ i, j, k ] = [start, mid + 1, 0];

    while( i <= mid && j <= end) {//comapring items of two subarrays
        if(setDataComparasing(arr, i, j)) {
            temp[k] = arr[i];
            temp[k].setAttribute('transform', `translate(${(k + k*width)}, ${HEIGHT/2.3})`);
            yield [temp, k, k-1,];
            k++;
            i++
        } else { 
            temp[k] = arr[j];
            temp[k].setAttribute('transform', `translate(${(k + k*width)}, ${HEIGHT/2.3})`);
            yield [temp, k, k-1];
            k++;
            j++
            
        };
        counter++;
    };

    while (i <= mid) {//adding what's left from left subbarray
        temp[k] = arr[i];
        temp[k].setAttribute('transform', `translate(${(k + k*width)}, ${HEIGHT/2.3})`);
        yield [temp, k, k-1];
        k++;
        i++;
        counter++;
    }

    while (j <= end) {//adding what's left from right subbarray
        temp[k] = arr[j];
        temp[k].setAttribute('transform', `translate(${(k + k*width)}, ${HEIGHT/2.3})`);
        yield [temp, k, k-1];
        k++;
        j++
        counter++;
    }

    for(let i = start; i <= end; i++) {
        arr[i] = temp[i-start];
        counter++;

        visualizeSwapMerge(arr, i);
        yield [arr, i, i-1];
        
    }
}

function visualizeSwapMerge(arr, i) {
    const width = Math.trunc(WIDTH/arr.length) - 1;
    arr[i].setAttribute('transform', `translate(${i + i*width}, 0)`);
        
};

export function* mergeSort(arr, start, end) {
    if(start < end) {
        const mid = Math.floor((start + end)/2);
        
        yield* mergeSort(arr, start, mid);
        
        yield* mergeSort(arr, mid+1, end);
        yield* merge(arr, start, mid, end);
    }
    
}

// const arr1= [4, 2, 1, 7, 3, 80, 10, 15, 22, 55, 13, 12, 74]


// const mg = mergeSort(arr1, 0, arr1.length-1);
