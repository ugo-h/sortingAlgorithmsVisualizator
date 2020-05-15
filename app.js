const root = document.getElementById('root');

const WIDTH = 600;
const HEIGHT = 600;

root.setAttribute('height', HEIGHT)
root.setAttribute('width', WIDTH)

function renderArr(arr, multiplyer = 1, color='	#ffdfba') {
    root.innerHTML = '';
    const width =  WIDTH/arr.length;
    arr.forEach((size, index) => {
        const element = document.createElementNS("http://www.w3.org/2000/svg", 'g');
        element.setAttribute('transform',`translate(${index + index*width}, 20)`);
        element.dataset.size = size;
        element.innerHTML = `<rect height="${size * multiplyer}" width="${width}" style="fill: ${color}"></rect>`
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
    let isSwapped;
    let counter = 0;
    while(true) {
        isSwapped = false;
        index = 0;
        counter++;
        while(index < arr.length-1*counter) {
            if(dataSizeSort(arr, index)) {
                arr[index+1].lastChild.setAttribute('style', 'fill: 	#ffb3ba');//red
                arr[index].lastChild.setAttribute('style', 'fill: 	#ffb3ba');//red
                swap(arr, index);
                isSwapped = true;
            };
            index++;
            yield [index, isSwapped];

            if(index === arr.length-1*counter) {
                lastElementIndex = index;
            };
        }; 
        
        if (!isSwapped) {
            for(let i = 0; i < counter; i++) {
                arr[i].lastChild.setAttribute('style', 'fill: #bae1ff');//blue
            }
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
            // console.log('swap!')
                

               
}

let lastElementIndex;
function renderSortStep(id, isSwapped) {
    const prev = arrElements[id-1]
    console.log(isSwapped)

    

    if(prev) {
        prev.lastChild.setAttribute('style', 'fill: 	#ffdfba');
    };
    if(arrElements[id+1] && arrElements[id+1].getAttribute('style')!=='fill: 	#bae1ff') {//blue
        arrElements[id+1].lastChild.setAttribute('style', 'fill: 	#baffc9');//green
    }
    if(arrElements[id].getAttribute('style')!=='fill: blue') {
        arrElements[id].lastChild.setAttribute('style', 'fill: 	#baffc9');//green
    }
    
    if(lastElementIndex) {
        arrElements[lastElementIndex].lastChild.setAttribute('style', 'fill: 	#bae1ff');//blue
    }
}

function generateArr(size) {
    newArr = [];
    for (let i = 0; i < size; i++) {
        newArr.push(Math.random()*HEIGHT);
    }
    return newArr;
}

const arr1 = [2, 10, 7, 3, 1, 6, 20, 12, 13, 11, 5];
const arr2 = generateArr(30);
renderArr(arr2);

let arrElements = [...document.querySelectorAll('g')];

const sortBtn = document.querySelector('button');
const arraySizeRange = document.getElementById('array-size-range');

sortBtn.addEventListener('click', sortHandler);
arraySizeRange.addEventListener('input', arrSizeHandler);
let delay = 600;

function arrSizeHandler(event) {
    const volume = parseInt(event.target.value);
    const arr = generateArr(volume);
    renderArr(arr);
    arrElements = [...document.querySelectorAll('g')];
}

function sortHandler() {
    sortBtn.disabled = true;
    arraySizeRange.disabled = true;
    sortBtn.innerText = 'sorting...'
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
                sortBtn.disabled = false;
                arraySizeRange.disabled = false;
                return;
            };
            new Promise((resolve, reject) => {
                setTimeout(()=>{
                    resolve(renderSortStep(...value));
                }, delay*0.7)
                
            }).then(()=> {return});
        })
    }, delay);
}




