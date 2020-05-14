const dragons = [
    'cool dragon',
    'angry dragon',
    'nasty dragon'
];

const iterator = dragons[Symbol.iterator]();
// iterator { [Iterator] } ;
console.log(iterator);
function* zeus(index) {
    while (index < 3) {
        yield index++
    }
}


const company = {
    // curEmployee:0,
    employees: ['Ugo', 'Uzo', 'Udo', 'Uno'],
    // next() {
    //     if (this.curEmploye >= this.employees.length) {
    //         return {value: this.curEmployee, done: true}
    //     }
    //     const returnValue = { value: this.employees[this.curEmployee], done: false};
    //     this.curEmployee++;
    //     return returnValue;
    // }
    getEmployee: function* employeeGenerator() {
        let currentEmployee = 0;
        while(currentEmployee < this.employees.length) {
            yield this.employees[currentEmployee];
            currentEmployee++;
        }
    }
}
// const emp = company.getEmployee();
// console.log(emp.next());
// console.log(emp.next());
// console.log(emp.next());
const root = document.getElementById('root');
console.log(root)


function renderArr(arr) {
    
    const color = 'orchid';
    root.innerHTML = '';
    arr.forEach((size, index) => {
        const element = document.createElementNS("http://www.w3.org/2000/svg", 'g');
        element.setAttribute('transform',`translate(${index+ index*20}, 20)`)
        element.innerHTML = `<rect height="${size * 10}" width="${20}" style="fill: ${color}"></rect>`
        root.append(element);
        
    })
     
}


function* bubbleSort(arr) {
    let index;
    let swaps;
    while(true) {
        swaps = 0;
        index = 0;
        while(index < arr.length-1) {
            yield [index+1, swaps];
            if(arr[index] > arr[index+1]) {
                // visualizeSwap(id);
                const temp = arr[index];
                arr[index] = arr[index+1];
                arr[index+1] = temp;
                swaps++;
               
            }
            
        index++;
        } 
        if (swaps <=0 ) {
            return arr
        }
    }
}
function visualizeSwap(id) {
    arrElements.forEach((el)=>{
        el.lastChild.setAttribute('style', 'fill: orchid');
    })
    const current = arrElements[id];
    const next = arrElements[id+1];
    const temp = current.getAttribute('transform');

    current.setAttribute('transform', next.getAttribute('transform'));
    next.setAttribute('transform', temp);

    const newTemp = arrElements[id];
    arrElements[id] = arrElements[id+1];
    arrElements[id+1] = newTemp;

}


function renderSortStep(id, swap) {

    const el = arrElements[id];
    const prev = arrElements[id-2]
    
    if(prev) {
        prev.lastChild.setAttribute('style', 'fill: orchid');
    };
    if(swap <= 0) {
        arrElements[id-1].lastChild.setAttribute('style', 'fill: green');
        el.lastChild.setAttribute('style', 'fill: green');
        return;
    };
    
    arrElements[id-1].lastChild.setAttribute('style', 'fill: red');
    el.lastChild.setAttribute('style', 'fill: red');
    
    const temp = arrElements[id-1].getAttribute('transform');
    arrElements[id-1].setAttribute('transform', arrElements[id].getAttribute('transform'));
    arrElements[id].setAttribute('transform', temp);

    const newTemp = arrElements[id-1];
    arrElements[id-1] = arrElements[id];
    arrElements[id] = newTemp;
}

const arr1 = [2, 10, 7, 3, 1, 6, 20, 12, 13, 11, 5];
renderArr(arr1);

let arrElements = [...document.querySelectorAll('g')];

bubble = bubbleSort(arr1);
const delay = setInterval(()=>{
    const {value, done} = bubble.next();
    console.log(done)
    if(done) {
        clearInterval(delay);
        return;
    };
    console.log(value)
    renderSortStep(...value);

}, 100)
