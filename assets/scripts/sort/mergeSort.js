const WIDTH = 600;
let counter = 0;
const coordHolder = {}



function setDataComparasing(arr, index1, index2) {
    return parseInt(arr[index1].dataset.size) < parseInt(arr[index2].dataset.size);
}

function* merge(arr, start, mid, end) {
    const temp = [];
    const width = Math.trunc(WIDTH/arr.length) - 1;
    let [ i, j, k ] = [start, mid + 1, 0];

    while( i <= mid && j <= end) {//comapring items of two subarrays
        coordHolder[arr[i].getAttribute('transform')] = i;
        coordHolder[arr[j].getAttribute('transform')] = j;
        
        if(setDataComparasing(arr, i, j)) {
            temp[k] = arr[i];
            // temp[k].setAttribute('transform', `translate(${k + k*width}, 0)`);
            k++;
            i++
            
            
        } else { 
            temp[k] = arr[j];
            // temp[k].setAttribute('transform', `translate(${k + k*width}, 0)`);
            k++;
            j++
            
        };

        
        counter++;
    };
    while (i <= mid) {//adding whats left from left subbarray
        temp[k] = arr[i];
        // temp[k].setAttribute('transform', `translate(${k + k*width}, 0)`);
        k++;
        i++;
        counter++;
    }
    while (j <= end) {//adding whats left from right subbarray
        temp[k] = arr[j];
        // temp[k].setAttribute('transform', `translate(${k + k*width}, 0)`);
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
   
    console.log(coordHolder);
    // return(arr)
}
function visualizeSwapMerge(arr1, arrTemp, index1, index2) {
    console.log('mainArr', arr1[index1].getAttribute('transform'));
    console.log('tmpArr', arrTemp[index2].getAttribute('transform'));

    const width = Math.trunc(WIDTH/arr1.length) - 1;
    console.log(index1, coordHolder[`translate(${index1 + index1*width}, 0)`]);
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
