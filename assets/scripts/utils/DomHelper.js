export const Dom = {
    root            : document.getElementById('root'),
    backdrop        : document.querySelector('.backdrop'),
    selectSortMenu  : document.querySelector('.slider-menu'),
    sortBtn         : document.querySelector('.btn-sort'),
    selectSortBtn   : document.querySelector('.btn-select'),
    arraySizeRange  : document.getElementById('array-size-range'),
    arraySpeedRange : document.getElementById('array-speed-range'),


    toggleDisabledBtns() {
        //and add pretty animations to it when sorting starts
            const header = document.querySelector('header')
            
            this.sortBtn.classList.toggle('removed');
            this.selectSortBtn.classList.toggle('removed');
            this.arraySizeRange.classList.toggle('removed');
            
            document.getElementById('size-label').classList.toggle('removed');

            if(document.getElementById('size-label').classList.contains('removed')) {
                header.style.height = '150px';
            } else {
                header.style.height = '';
            }
    },

    disableSortBtn(bool=true) {
        if(typeof bool !== "boolean") {
            throw new Error('Argument must be boolean')
        }
        this.sortBtn.disabled = bool;
        this.selectSortBtn.disabled = bool;
        this.arraySizeRange.disabled = bool;
        if(bool) {
            this.sortBtn.innerText = 'sorting...';
        } else{
            this.sortBtn.innerText = 'SORT';
        };
    },

    selectSortMenuClose() {
        this.selectSortMenu.classList.add('hidden')
        this.backdrop.classList.add('removed');
        setTimeout(() => {
            this.selectSortMenu.style.display = 'none'
        }, 300);
    },
    
    selectSortMenuOpen() {
        this.selectSortMenu.style.display = 'block';
        setTimeout(()=>{//for fluidity
            this.selectSortMenu.classList.remove('hidden')
            this.backdrop.classList.remove('removed');
        }, 100)
    }
}
