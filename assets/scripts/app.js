// import { delay, sortVisualizer, useAdditionalSpace, useNormalSpace } from './sortVisualizer.js';
import { bubbleSort } from './sort/bubbleSort.js';
import { selectionSort } from './sort/selectionSort.js';
import { insertionSort } from './sort/insertionSort.js';
import { mergeSort } from './sort/mergeSort.js';
import { quickSort } from './sort/quickSort.js';
import { renderHighlightSorted, renderSortStep } from './renderVisuals.js';
import { renderArr, generateArr, HEIGHT, WIDTH} from './renderArray.js';
import { Dom } from './utils/DomHelper.js';
import { promisifyIteratorWithDelay } from './utils/utils.js';

const arr2 = generateArr(30);
const sortingAlgorithms = {
    'bubble': bubbleSort,
    'selection': selectionSort,
    'insertion': insertionSort,
    'merge': mergeSort,
    'quick': quickSort,
};

// renderArr(arr2);

let delay = 300;
let currentSort = 'bubble';
let arrElements = renderArr(arr2);

Dom.root.setAttribute('height', HEIGHT);
Dom.root.setAttribute('width', WIDTH);

Dom.sortBtn.addEventListener('click', sortHandler);
Dom.arraySizeRange.addEventListener('input', arrSizeHandler);
Dom.arraySpeedRange.addEventListener('input', sortSpeedHandler);
Dom.selectSortMenu.addEventListener('click', selectSortMenuHandler);

Dom.selectSortBtn.addEventListener('click', selectSortMenuOpenHandler);
Dom.backdrop.addEventListener('click', selectSortMenuCloseHandler);

function sortHandler() {
    adjustToScreenSize(Dom.toggleDisabledBtns.bind(Dom));
    Dom.disableSortBtn(true);
    
    const sortingAlgorithm = sortingAlgorithms[currentSort](arrElements, 0, arrElements.length-1);
    const timeout = setTimeout(visualieIteration.bind(null, sortingAlgorithm, arrElements), delay);
};

async function visualieIteration(sortingAlgorithm, arr) {
    //one iteration of sortingAlgorithm delayed (red color)
        const { 
            value, 
            done 
        } = await promisifyIteratorWithDelay(sortingAlgorithm, delay*0.2);
    
        if(done) {
            Dom.disableSortBtn(false);
            await highlightSorted(arr);
            adjustToScreenSize(Dom.toggleDisabledBtns.bind(Dom));
            return; 
        } else{
    //one step highlights the current element (green color), 
    //which algorithm is working with
            await promisifyIteratorWithDelay(renderSortStep.bind(null, ...value), delay*0.6, false);
            setTimeout(visualieIteration.bind(null, sortingAlgorithm, arr), delay);
        };
    };
    
    function highlightSorted(arr) {
        return new Promise((resolve, reject) => {
            const  finalRun = renderHighlightSorted(arr);
            const finalRunInterval = setInterval(()=>{
                const { done } =  finalRun.next();
                if(done) {
                    clearInterval(finalRunInterval);
                    resolve();
                }
            }, 30 * 10/arr.length);
        });
    };

function adjustToScreenSize(callback) {
    if(WIDTH <= 300){//for small screens we transform header menu
        callback()
    };
};

function arrSizeHandler(event) {
    const volume = parseInt(event.target.value);
    const arr = generateArr(volume);

    arrElements = renderArr(arr);
    if(currentSort === 'merge') {
        useAdditionalSpace(arrElements);
    }else{
        useNormalSpace(arrElements);
    };
};

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
    };
};

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
    };
};

function selectSortMenuCloseHandler() {
    return Dom.selectSortMenuClose();
};

function selectSortMenuOpenHandler() {
    return Dom.selectSortMenuOpen();
};

function useAdditionalSpace(arr) {
    arr.forEach((el) => {
        el.lastChild.setAttribute('height', el.dataset.size/2.5);
    });
};
function useNormalSpace(arr) {
    arr.forEach((el) => {
        el.lastChild.setAttribute('height', el.dataset.size);
    });
};






