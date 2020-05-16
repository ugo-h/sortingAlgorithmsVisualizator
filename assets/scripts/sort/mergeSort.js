// export function mergeSort(arr) {
//     return divide(arr);

//     function divide(arr, indexLeft=0, indexRight=arr.length/2) {
//         if(arr.length <= 1){
//             return arr;
//         }
//         const left = arr.slice(0, Math.round(arr.length/2));
//         const right = arr.slice(Math.round(arr.length/2), arr.length);
        
//         return merge(divide(left, 0), divide(right, arr.length/2), arr.length/2);
//     };
    
//     function merge(left, right, index) {
//         if(right.length === 0) {
//             return left;
//         }
//         for (let i = 0; i < left.length; i++) {
//             if(right.length === 0) {
//                 break
//             }
//             if (left[i] > right[0]) {
//                 console.log(index);
//                 left.splice(i, 0, right[0]);
//                 right.splice(0, 1);
//             }
//         }
//         left.push(...right);
//         return left;
//     };
// }


export function mergeSort(arr, start, mid, end) {
    const temp = [];

    let [ i, j, k ] = [start, mid + 1, 0];

    while( i <= mid && j<= end) {
        if( arr[i] < arr[j]) {
            temp[k] = arr[i];
            k++;
            i++
        }else{
            temp[k] = arr[j];
            k++;
            j++
        }
    }

}



export function visualizeSwapMerge(arr, index, minIndex) {
    const temp = arr[index].getAttribute('transform');
    arr[index].setAttribute('transform', arr[minIndex].getAttribute('transform'));
    arr[minIndex].setAttribute('transform', temp);
};

// export function swapMerge(arr, index, minIndex) {
//             visualizeSwapSel(arr, index, minIndex);
//             const temp = arr[index];
//             arr[index] = arr[minIndex];
//             arr[minIndex] = temp;
// } 