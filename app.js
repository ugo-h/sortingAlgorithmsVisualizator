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
        element.setAttribute('transform',`translate(${index+ index*20}, 20)`);
        element.dataset.size = size;
        element.innerHTML = `<rect height="${size * 10}" width="${20}" style="fill: ${color}"></rect>`
        root.append(element);
        
    })
     
}
function dataSizeSort(arr, index) {
    return parseInt(arr[index].dataset.size) > parseInt(arr[index+1].dataset.size);
}

function normalSort(arr, index) {
    return arr[index] > arr[index+1];
}

function* bubbleSort(arr) {
    let index;
    let swaps;
    while(true) {
        swaps = 0;
        index = 0;
        while(index < arr.length-1) {
            if(dataSizeSort(arr, index)) {
                swap(arr, index);
                swaps++;
            };
            index++;
            yield [index, swaps];
        }; 
        if (swaps <=0 ) {
            return arr
        };
    };
};

function visualizeSwap(arr, index) {
    const temp = arr[index].getAttribute('transform');
    arr[index].setAttribute('transform', arr[index+1].getAttribute('transform'));
    arr[index+1].setAttribute('transform', temp);
};

function swap(arr, index) {
    visualizeSwap(arr, index);
    const temp = arr[index];
    arr[index] = arr[index+1];
    arr[index+1] = temp;
}

function renderSortStep(id, swap) {
    const el = arrElements[id];
    const prev = arrElements[id-2]
    console.log(swap)
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
}

const arr1 = [2, 10, 7, 3, 1, 6, 20, 12, 13, 11, 5];
renderArr(arr1);

let arrElements = [...document.querySelectorAll('g')];


bubble = bubbleSort(arrElements);
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
