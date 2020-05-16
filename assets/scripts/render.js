export function* highlightSorted(arr) {
    for(const element of arr.slice(0, arr.length/2)) {
        element.lastChild.setAttribute('style', 'fill: #5cb85c');//blue
        yield;
    }
    for(const element of arr) {
        element.lastChild.setAttribute('style', 'fill: #f1cbff');//highlighted(sorted)
        yield;
    }
}

export function renderSortStep(arr, currentIndex, prevIndex, nextIndex, lastElementIndex) {
    if(arr[prevIndex]) {
        arr[prevIndex].lastChild.setAttribute('style', 'fill: #ffdfba');//main(orange)
    };
    if(arr[currentIndex]) {
        arr[currentIndex].lastChild.setAttribute('style', 'fill: 	#baffc9');//green
    };
    if(arr[nextIndex]) {
        arr[nextIndex].lastChild.setAttribute('style', 'fill: 	#baffc9');//green
    };
    if(arr[lastElementIndex]) {
        arr[lastElementIndex].lastChild.setAttribute('style', 'fill:  #5cb85c');//blue
    };
};
