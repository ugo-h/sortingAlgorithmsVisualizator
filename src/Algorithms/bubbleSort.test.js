
function bSort(arr) {
    let counter = 0;
    let swapped = false;
    for(let j = 0; j < arr.length-1; j++)  {
        for(let i = 0; i < arr.length-j-1; i++) {
            counter++;
            if(counter> 200) throw new Error('Overflow')
            if(arr[i] > arr[i+1])  {
                const temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
                // swapped = true;
            }
        }
    } 
}

const array = [22, 4, 1, 3, 6, 7, 3, 2, 19];
console.log(array)
bSort(array);
console.log(array)