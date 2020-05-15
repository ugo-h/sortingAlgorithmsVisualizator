function renderArr(arr, multiplyer = 1, color='	#ffdfba') {
    root.innerHTML = '';
    const width =  WIDTH/arr.length - 1;
    arr.forEach((size, index) => {
        const element = document.createElementNS("http://www.w3.org/2000/svg", 'g');
        element.setAttribute('transform',`translate(${index + index*width}, ${0})`);
        element.dataset.size = size;
        element.innerHTML = `<rect height="${size * multiplyer}" width="${width}" style="fill: ${color}"></rect>`
        root.append(element);
    });
};

function generateArr(size) {
    newArr = [];
    for (let i = 0; i < size; i++) {
        newArr.push(Math.random()*HEIGHT);
    }
    return newArr;
}