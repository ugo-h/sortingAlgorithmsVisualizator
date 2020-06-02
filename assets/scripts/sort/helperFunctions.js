export function sortByDataSize(arr, index1, index2) {
    return parseInt(arr[index1].dataset.size) < parseInt(arr[index2].dataset.size);
};
