// import { delay, sortVisualizer, useAdditionalSpace, useNormalSpace } from './sortVisualizer.js';
import { bubbleSort } from './sort/bubbleSort.js';
import { selectionSort } from './sort/selectionSort.js';
import { insertionSort } from './sort/insertionSort.js';
import { mergeSort } from './sort/mergeSort.js';
import { quickSort } from './sort/quickSort.js';
import {highlightSorted, renderSortStep } from './render.js';
import { renderArr, generateArr, HEIGHT, WIDTH} from './arrayRender.js';
import { Dom } from './utils/DomHelper.js';

const arr2 = generateArr(30);
const sortingAlgorithms = {
    'bubble': bubbleSort,
    'selection': selectionSort,
    'insertion': insertionSort,
    'merge': mergeSort,
    'quick': quickSort,
};

let delay = 300;
let currentSort = 'bubble';
let arrElements = [...document.querySelectorAll('g')];

Dom.root.setAttribute('height', HEIGHT);
Dom.root.setAttribute('width', WIDTH);

renderArr(arr2);

Dom.sortBtn.addEventListener('click', sortHandler);
Dom.arraySizeRange.addEventListener('input', arrSizeHandler);
Dom.arraySpeedRange.addEventListener('input', sortSpeedHandler);
Dom.selectSortMenu.addEventListener('click', selectSortMenuHandler);

Dom.selectSortBtn.addEventListener('click', selectSortMenuOpenHandler);
Dom.backdrop.addEventListener('click', selectSortMenuCloseHandler)

function sortHandler() {
    adjustToScreenSize(Dom.toggleDisabledBtns.bind(Dom));
    Dom.disableSortBtn(true);
    
    const sortingAlgorithm = sortingAlgorithms[currentSort](arrElements, 0, arrElements.length-1);
    const timeout = setTimeout(sortVisualizer.bind(null, sortingAlgorithm), delay);
}

function adjustToScreenSize(callback) {
    if(WIDTH <= 300){//for small screens we transform header menu
        callback()
    }
}

function arrSizeHandler(event) {
    const volume = parseInt(event.target.value);
    const arr = generateArr(volume);
    renderArr(arr);
    arrElements = [...document.querySelectorAll('g')];
    if(currentSort === 'merge') {
        useAdditionalSpace(arrElements);
    }else{
        useNormalSpace(arrElements);
    };
}

function sortSpeedHandler(event) {
    const volume = parseInt(event.target.value);
    delay = 602 - volume;
    if( volume > 300) {
        //if speed is too high, it is hard to notice animation, 
        //so it not only becomes pointless, but also distracts user
        if(currentSort!='merge'){//merge sort looks better with animation even at high speed
            Dom.root.classList.remove('animated');
        }
    }else{
        Dom.root.classList.add('animated');
    }
}

function selectSortMenuHandler(event) {
    if(event.target.classList.contains('select-sort-btn')) {
        currentSort = event.target.id;
        Dom.selectSortBtn.innerText = currentSort + ' sort';
        Dom.sortBtn.disabled = false;

        Dom.selectSortMenuClose();
        //for merge sort we need additional space, so it will be reflected in animation
        if(currentSort === 'merge') {
            useAdditionalSpace(arrElements);
        }else{
            useNormalSpace(arrElements);
        };
    }
}

function selectSortMenuCloseHandler() {
    return Dom.selectSortMenuClose();
};

function selectSortMenuOpenHandler() {
    return Dom.selectSortMenuOpen();
};




function sortVisualizer(sortingAlgorithm) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(sortingAlgorithm.next())
        }, delay*0.2)
    })
    .then((data)=>{
        const { value, done } = data;
        console.log(done)
        if(!done) {
            setTimeout(sortVisualizer.bind(null, sortingAlgorithm), delay);
            
        }else{
            if(WIDTH <= 300){
                setTimeout(()=>{
                    Dom.toggleDisabledBtns()
                }, 1300);
               
            }
           Dom.disableSortBtn(false);
            const  finalRun = highlightSorted(arrElements);
            const finalRunInterval = setInterval(()=>{
                const {done} =  finalRun.next();
                if(done) {
                    clearInterval(finalRunInterval);
                    console.log('done')
                    const tempArr = []
                    arrElements.forEach((el)=>{
                        tempArr.push(el.dataset.size)
                    })
                    console.log(tempArr);
                }
            }, 30 * 10/arrElements.length);
            return;
        };
        new Promise((resolve, reject) => {
            setTimeout(()=>{
                console.log(value)
                resolve(renderSortStep(...value));
            }, delay*0.6)
            
        }).then(()=> {return});
    })
}

function useAdditionalSpace(arr) {
    arr.forEach((el) => {
        el.lastChild.setAttribute('height', el.dataset.size/2.5);
    })
}
function useNormalSpace(arr) {
    arr.forEach((el) => {
        el.lastChild.setAttribute('height', el.dataset.size);
    })
}






