import {highlightSorted, renderSortStep } from './render.js'


export function sortVisualizer(sortingAlgorithm) {
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
                    sortBtn.classList.remove('removed');
                    selectSortBtn.classList.remove('removed');
                    arraySizeRange.classList.remove('removed');
                    document.getElementById('size-label').classList.remove('removed');
                    document.querySelector('header').style.height = '300px';
                }, 1300);
               
            }
           disableSortBtn(false);
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

export function useAdditionalSpace() {
    arrElements.forEach((el) => {
        el.lastChild.setAttribute('height', el.dataset.size/2.5);
    })
}

export function useNormalSpace() {
    arrElements.forEach((el) => {
        el.lastChild.setAttribute('height', el.dataset.size);
    })
}