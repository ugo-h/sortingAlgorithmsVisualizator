import {highlightSorted, renderSortStep } from './renderVisuals.js'
import { WIDTH} from './renderArray.js';
import { Dom } from './utils/DomHelper.js';

export let delay = 300;

export function sortVisualizer(sortingAlgorithm, arr) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(sortingAlgorithm.next())
        }, delay*0.2)
    })
    .then((data)=>{
        const { value, done } = data;
        console.log(done)
        if(!done) {
            setTimeout(sortVisualizer.bind(null, sortingAlgorithm, arr), delay);
            
        }else{
            if(WIDTH <= 300){
                setTimeout(()=>{
                    Dom.toggleDisabledBtns()
                }, 1300);
               
            }
           Dom.disableSortBtn(false);
            const  finalRun = highlightSorted(arr);
            const finalRunInterval = setInterval(()=>{
                const {done} =  finalRun.next();
                if(done) {
                    clearInterval(finalRunInterval);
                    console.log('done')
                    const tempArr = []
                    arr.forEach((el)=>{
                        tempArr.push(el.dataset.size)
                    })
                    console.log(tempArr);
                }
            }, 30 * 10/arr.length);
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