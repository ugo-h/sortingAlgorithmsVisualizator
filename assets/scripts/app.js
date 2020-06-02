import { sortVisualizer, useAdditionalSpace, useNormalSpace } from './sortVisualizer.js';
import { bubbleSort } from './sort/bubbleSort.js';
import { selectionSort } from './sort/selectionSort.js';
import { insertionSort } from './sort/insertionSort.js';
import { mergeSort } from './sort/mergeSort.js';
import { quickSort } from './sort/quickSort.js';
import { renderArr, generateArr, HEIGHT, WIDTH} from './arrayRender.js';



const root = document.getElementById('root');
const backdrop = document.querySelector('.backdrop');
const selectSortMenu = document.querySelector('.slider-menu')
const sortBtn = document.querySelector('.btn-sort');
const selectSortBtn = document.querySelector('.btn-select');
const arraySizeRange = document.getElementById('array-size-range');
const arraySpeedRange = document.getElementById('array-speed-range');

const arr2 = generateArr(30);
const sortTypes = {
    'bubble': bubbleSort,
    'selection': selectionSort,
    'insertion': insertionSort,
    'merge': mergeSort,
    'quick': quickSort,
};

let delay = 300;
let currentSort = 'bubble';
let arrElements = [...document.querySelectorAll('g')];

root.setAttribute('height', HEIGHT);
root.setAttribute('width', WIDTH);

renderArr(arr2);

sortBtn.addEventListener('click', sortHandler);
arraySizeRange.addEventListener('input', arrSizeHandler);
arraySpeedRange.addEventListener('input', sortSpeedHandler);
selectSortMenu.addEventListener('click', selectSortMenuHandler);

selectSortBtn.addEventListener('click', selectSortMenuOpenHandler);
backdrop.addEventListener('click', selectSortMenuCloseHandler)

function selectSortMenuCloseHandler() {
    return selectSortMenuClose();
};

function selectSortMenuClose() {
    selectSortMenu.classList.add('hidden')
    backdrop.classList.add('removed');
    setTimeout(() => {
        selectSortMenu.style.display = 'none'
    }, 300);
};

function selectSortMenuOpenHandler() {
    selectSortMenu.style.display = 'block';
    setTimeout(()=>{//for fluidity
        selectSortMenu.classList.remove('hidden')
        backdrop.classList.remove('removed');
    }, 100)
};

function selectSortMenuHandler(event) {
    if(event.target.classList.contains('select-sort-btn')) {
        currentSort = event.target.id;
        selectSortBtn.innerText = currentSort + ' sort';
        sortBtn.disabled = false;

        selectSortMenuClose();
        //for merge sort we need additional space, so it will be reflected in animation
        if(currentSort === 'merge') {
            useAdditionalSpace();
        }else{
            useNormalSpace();
        };
    }
}
function arrSizeHandler(event) {
    const volume = parseInt(event.target.value);
    const arr = generateArr(volume);
    renderArr(arr);
    arrElements = [...document.querySelectorAll('g')];
    if(currentSort === 'merge') {
        useAdditionalSpace();
    }else{
        useNormalSpace();
    };
}

function sortSpeedHandler(event) {
    const volume = parseInt(event.target.value);
    delay = 602 - volume;
    if( volume > 300) {
        //if speed is too high, it is hard to notice animation, 
        //so it not only becomes pointless, but also distracts user
        if(currentSort!='merge'){//merge sort looks better with animation even at high speed
            root.classList.remove('animated');
        }
    }else{
        root.classList.add('animated');
    }
}

function disableSortBtn(bool=true) {
    if(typeof bool !== "boolean") {
        throw new Error('Argument must be boolean')
    }
    sortBtn.disabled = bool;
    selectSortBtn.disabled = bool;
    arraySizeRange.disabled = bool;
    if(bool) {
        sortBtn.innerText = 'sorting...';
    } else{
        sortBtn.innerText = 'SORT';
    };
};

function adjustToScreenSize(callback) {
    if(WIDTH <= 300){//for small screens we transform header menu
        callback()
    }
}

function toggleDisabledBtns() {
    setTimeout(()=>{//and add pretty animations to it when sorting starts
        const header = document.querySelector('header')
        sortBtn.classList.toggle('removed');
        selectSortBtn.classList.toggle('removed');
        arraySizeRange.classList.toggle('removed');
        document.getElementById('size-label').classList.toggle('removed');

        if(sortBtn.classList.contains('removed')) {
            header.style.height = '150px';
        } else {
            header.style.height = '300px';
        }
    }, 100)
};

function sortHandler() {
    adjustToScreenSize(toggleDisabledBtns);
    disableSortBtn(true);
    
    const sortingAlgorithm = sortTypes[currentSort](arrElements, 0, arrElements.length-1);
    const timeout = setTimeout(sortVisualizer.bind(null, sortingAlgorithm), delay);
}


