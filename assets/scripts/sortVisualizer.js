import {highlightSorted, renderSortStep } from './renderVisuals.js'
import { WIDTH} from './renderArray.js';
import { Dom } from './utils/DomHelper.js';

export let delay = 300;

export function sortVisualizer(sortingAlgorithm) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(sortingAlgorithm.next())
        }, delay*0.2)
    })
    .then((data) => {
        const { value, done } = data;
        console.log(done)
        if(!done) {
            setTimeout(sortVisualizer.bind(null, sortingAlgorithm), delay);
            
        }else{
            Dom.disableSortBtn(false);
            highlightSorted(arrElements);
            adjustToScreenSize(() => {
                setTimeout(()=>{
                    Dom.toggleDisabledBtns();
                }, 1300)
            });
            return;
        };
        new Promise((resolve, reject) => {
            setTimeout(()=>{
                console.log(value)
                resolve(renderSortStep(...value));
            }, delay*0.6)
            
        }).then(()=> {
            return
        });
    })
}

export function useAdditionalSpace(arr) {
    arr.forEach((el) => {
        el.lastChild.setAttribute('height', el.dataset.size/2.5);
    })
}

export function useNormalSpace(arr) {
    arr.forEach((el) => {
        el.lastChild.setAttribute('height', el.dataset.size);
    })
}