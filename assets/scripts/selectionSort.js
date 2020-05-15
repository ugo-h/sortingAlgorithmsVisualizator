export function dataSizeSortSel(arr, index, minIndex) {
    return parseInt(arr[index].dataset.size) < parseInt(arr[minIndex].dataset.size);
};

export function* selectionSort(arr) {
    console.log('selection sort started!')
    let totallSwaps = 0;
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i
        for (let j = i+1; j < arr.length; j++) {
            if(dataSizeSortSel()) {
                minIndex = j;
            };
            yield(arr, j, i);
        };
        const temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
        totallSwaps++;
    }
    console.log('--------------');
    console.log('totall swaps', totallSwaps);
    return arr;
}