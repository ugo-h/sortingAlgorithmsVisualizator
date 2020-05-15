const root = document.getElementById('root');

const WIDTH = 600;
const HEIGHT = 600;

const sortBtn = document.querySelector('button');
const arraySizeRange = document.getElementById('array-size-range');
const arraySpeedRange = document.getElementById('array-speed-range');

const arr1 = [2, 10, 7, 3, 1, 6, 20, 12, 13, 11, 5];
const arr2 = generateArr(30);

root.setAttribute('height', HEIGHT);
root.setAttribute('width', WIDTH);

renderArr(arr2);
let arrElements = [...document.querySelectorAll('g')];

sortBtn.addEventListener('click', sortHandler);
arraySizeRange.addEventListener('input', arrSizeHandler);
arraySpeedRange.addEventListener('input', sortSpeedHandler);

let delay = 200;

function renderSortStep(id, lastElementIndex) {
    if(arrElements[id-1]) {
        arrElements[id-1].lastChild.setAttribute('style', 'fill: #ffdfba');//main(orange)
    };
    if(arrElements[id].getAttribute('style')!=='fill: blue') {
        arrElements[id].lastChild.setAttribute('style', 'fill: 	#baffc9');//green
    };
    if(arrElements[id+1] && arrElements[id+1].getAttribute('style')!=='fill: 	#bae1ff') {//blue
        arrElements[id+1].lastChild.setAttribute('style', 'fill: 	#baffc9');//green
    };
    if(arrElements[lastElementIndex]) {
        arrElements[lastElementIndex].lastChild.setAttribute('style', 'fill: 	#bae1ff');//blue
    };
};

function arrSizeHandler(event) {
    const volume = parseInt(event.target.value);
    const arr = generateArr(volume);
    renderArr(arr);
    arrElements = [...document.querySelectorAll('g')];
}

function sortSpeedHandler(event) {
    const volume = parseInt(event.target.value);
    delay = 606 - volume;
}

function sortHandler() {
    sortBtn.disabled = true;
    arraySizeRange.disabled = true;
    sortBtn.innerText = 'sorting...'
    bubble = bubbleSort(arrElements);
    const timeout = setTimeout(seeSort, delay);
}

function seeSort() {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(bubble.next())
        }, delay*0.7)
    })
    .then((data)=>{
        const {value, done} = data;
        console.log(done)
        if(!done) {
            setTimeout(seeSort, delay);
            
        }else{
            sortBtn.innerText = 'SORT';
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
}



