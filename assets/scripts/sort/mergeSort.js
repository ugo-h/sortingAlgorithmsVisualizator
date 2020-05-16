const WIDTH = 600;
let counter = 0;

function setDataComparasing(arr, index1, index2) {
    return parseInt(arr[index1].dataset.size) < parseInt(arr[index2].dataset.size);
}

function* merge(arr, start, mid, end) {
    const temp = [];

    let [ i, j, k ] = [start, mid + 1, 0];

    while( i <= mid && j <= end) {//comapring items of two subarrays
        if(setDataComparasing(arr, i, j)) {
            temp[k] = arr[i];
            k++;
            i++
            
        } else { 
            temp[k] = arr[j];
            k++;
            j++
        };
        
        counter++;
    };
    while (i <= mid) {//adding whats left from left subbarray
        temp[k] = arr[i];
        k++;
        i++;
        counter++;
    }
    while (j <= end) {//adding whats left from right subbarray
        temp[k] = arr[j];
        k++;
        j++
        counter++;
    }

    for(let i = start; i <= end; i++) {
        visualizeSwapMerge(arr, temp, i, i-start);
        arr[i] = temp[i-start];
        counter++;
        yield [arr, i, i-1];
    }
   
    // return(arr)
}
function visualizeSwapMerge(arr1, arrTemp, index1, index2) {
        const width = WIDTH/arr1.length - 1;
        console.log(arrTemp[index2].getAttribute('transform'));
        arr1[index1].setAttribute('transform', `translate(${index1 + index1*width}, 0)`);
        
};

export function* mergeSort(arr, start, end) {
    if(start < end) {
        
        const mid = Math.floor((start + end)/2);
        
        yield* mergeSort(arr, start, mid);
        
        yield* mergeSort(arr, mid+1, end);
        yield* merge(arr, start, mid, end);
        yield* merge(arr, start, mid, end);
        
        // console.log(arr) 
    }
    
}
// const arr1= [4, 2, 1, 7, 3, 80, 10, 15, 22, 55, 13, 12, 74]


// const mg = mergeSort(arr1, 0, arr1.length-1);
