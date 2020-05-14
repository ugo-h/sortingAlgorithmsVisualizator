const root = document.getElementById('root');

function renderArr(arr) {
    const color = 'orchid';
    root.innerHTML = '';
    arr.forEach((size, index) => {
        const element = document.createElementNS("http://www.w3.org/2000/svg", 'g');
        element.setAttribute('transform',`translate(${index+ index*20}, 20)`);
        element.dataset.size = size;
        element.innerHTML = `<rect height="${size * 10}" width="${20}" style="fill: ${color}"></rect>`
        root.append(element);
    })
}

function dataSizeSort(arr, index) {
    return parseInt(arr[index].dataset.size) > parseInt(arr[index+1].dataset.size);
}

function normalSort(arr, index) {
    return arr[index] > arr[index+1];
}

function* bubbleSort(arr) {
    let index;
    let swaps;
    let counter = 0;
    while(true) {
        swaps = 0;
        index = 0;
        counter++;
        while(index < arr.length-1*counter) {
            if(dataSizeSort(arr, index)) {
                arrElements[index+1].lastChild.setAttribute('style', 'fill: green');
                arrElements[index].lastChild.setAttribute('style', 'fill: green');
                console.log('waiting fo swap!')
                swap(arr, index);
                console.log('after swap')
                swaps++;
            };
            index++;
            yield [index, swaps];
           
        }; 
        if (swaps <=0 ) {
            return arr
        };
    };
};

function visualizeSwap(arr, index) {
    const temp = arr[index].getAttribute('transform');
    arr[index].setAttribute('transform', arr[index+1].getAttribute('transform'));
    arr[index+1].setAttribute('transform', temp);
};

function swap(arr, index) {
            visualizeSwap(arr, index);
            const temp = arr[index];
            arr[index] = arr[index+1];
            arr[index+1] = temp;
            console.log('swap!')
                

               
}

function renderSortStep(id, swap) {
    const prev = arrElements[id-1]
    console.log(swap)
    if(prev) {
        prev.lastChild.setAttribute('style', 'fill: orchid');
    };
    
        arrElements[id+1].lastChild.setAttribute('style', 'fill: red');
        arrElements[id].lastChild.setAttribute('style', 'fill: red');
    
    
}

const arr1 = [2, 10, 7, 3, 1, 6, 20, 12, 13, 11, 5];
renderArr(arr1);

let arrElements = [...document.querySelectorAll('g')];

const delay = 600;

bubble = bubbleSort(arrElements);
const interval = setInterval( ()=>{
    new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(bubble.next())
        }, delay*0.7)
    })
    .then((data)=>{
        const {value, done} = data;
        console.log(done)
        if(done) {
            clearInterval(interval);
            return;
        };
        new Promise((resolve, reject) => {
            setTimeout(()=>{
                resolve(renderSortStep(...value));
            }, delay*0.7)
            
        }).then(()=> {return});
    })
    

}, delay)
