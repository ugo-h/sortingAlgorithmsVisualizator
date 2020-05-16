function dataSizeSort(arr, index1, index2) {
    return parseInt(arr[index1].dataset.size) < parseInt(arr[index2].dataset.size);
};

function normalSort(arr, index1, index2) {
    return arr[index1] < arr[index2];
};

export function* insertionSort(arr) {
    let counter = 0;
    for (let i = 0; i < arr.length-1; i++) {
        arr[i].lastChild.setAttribute('style', 'fill: 	#01cdfe');//sciene
        if(arr[i-1]) {
            arr[i-1].lastChild.setAttribute('style', 'fill:#ffdfba');//red 
        }
        if(dataSizeSort(arr, i+1, i)){
            for(let j = 0; j <= i; j++) {
                counter++;
                if (dataSizeSort(arr, i+1, j)) {
                    visualizeSwap(arr, i+1, j);
                    const temp = arr[i+1];
                    arr[i+1] = arr[j];
                    arr[j] = temp;
                    arr[i+1].lastChild.setAttribute('style', 'fill: 	#ffb3ba');//red
                }else{
                    arr[i+1].lastChild.setAttribute('style', 'fill: 	#5cb85c');//dark green
                }
                
                
                yield [arr, j, j-1];
                
            }
        }
    }
    console.log(counter)
    return arr;
}


function visualizeSwap(arr, index1, index2) {
    const temp = arr[index1].getAttribute('transform');
    arr[index1].setAttribute('transform', arr[index2].getAttribute('transform'));
    arr[index2].setAttribute('transform', temp);
};
