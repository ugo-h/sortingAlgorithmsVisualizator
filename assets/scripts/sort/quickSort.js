import {dataSizeSort} from './utils.js'

let counter = 0;
// arr[j] <= pivot



 export function* quickSort(arr, start=0, end=arr.length-1) {
    if(start >= end) {
        return ;
    }
    let pivot = arr[end];
    
    console.log('pivot', pivot);
    console.log(arr)
    console.log('subArr', arr.slice(start, end))
    let [i, j] = [start-1, start];

    while (i < end && j < end ) {
        if(dataSizeSort(arr, j, end)) {
           i++; 
           visualize(arr, i, j);
           const temp = arr[j]
           arr[j] = arr[i];
           arr[i] = temp;
        }
        yield [arr, j, j-1];
        j++;
    }
    visualize(arr, i+1, end);
    const temp = arr[i+1]
    arr[i+1] = arr[end];
    arr[end] = temp;
    console.log(i+1);
    yield* quickSort(arr, start, i);
    yield* quickSort(arr, i+2, end);
    return arr;
}


function visualize(arr, i, j) {
    const temp = arr[i].getAttribute('transform');
    arr[i].setAttribute('transform', arr[j].getAttribute('transform'));
    arr[j].setAttribute('transform', temp);
}

// const arr1 = [5, 2, 1 , 8, 4, 24, 11, 23, 12, 41, 15, 10];

// console.log(arr1);
// const sortage = quickSort(arr1)
// while(true) {
//     if(sortage.next().done){
//         console.log(arr1)
//         break
//     }
// }