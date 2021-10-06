
export const mergesort_util = (array1, array2, moves, start, end, mid) => {
    let i = 0;
    let j = 0;
    let element = [];
    while (i < array1.length && j < array2.length) {
        if (array2[j] < array1[i]) {
            element.push(array2[j]);
            j++;
        }
        else {
            element.push(array1[i]);

            i++;
        }
    }
    while (i < array1.length) {
        element.push(array1[i]);
        i++;
    }
    while (j < array2.length) {
        element.push(array2[j]);
        j++;
    }
    let temp = [...element, start, end];
    moves.push(temp);
    //console.log(...element, start, end);
    return element;
}
export const mergeSort = (array, start, end, moves) => {
    if (start >= end) {
        return array.slice(start, end + 1);
    }
    const mid = Math.floor((start + end) / 2);
    const array1 = mergeSort(array, start, mid, moves);
    const array2 = mergeSort(array, mid + 1, end, moves);
    return mergesort_util(array1, array2, moves, start, end, mid);
}


export const bubblesort = (array, moves) => {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 1; j < array.length - i; j++) {
            let temp = [...array, j - 1, j];
            moves.push(temp);
            if (array[j] < array[j - 1]) {

                let temp = array[j];
                array[j] = array[j - 1];
                array[j - 1] = temp;
                temp = [...array, j - 1, j];
                moves.push(temp);
            }
        }
    }
    return array;

}


export const selectionsort = (array, moves) => {
    for (let i = 0; i < array.length - 1; i++) {
        let min_idx = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[min_idx]) {
                min_idx = j;
            }
        }
        let temp_arr = [...array, i, min_idx];
        moves.push(temp_arr);
        let temp = array[min_idx];
        array[min_idx] = array[i];
        array[i] = temp;
        temp_arr = [...array, i, min_idx];
        moves.push(temp_arr);
    }
    return array;
}
export const insertionsort = (array, moves) => {
    for (let i = 1; i < array.length; i++) {
        for (let j = i - 1; j >= 0; j--) {
            let temp_array = [...array, j, j + 1];
            moves.push(temp_array);
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                temp_array = [...array, j, j + 1];
                moves.push(temp_array);
            }
            else {
                break;
            }
        }
    }
    return array;
}
const partition = (array, start, end, moves) => {
    let pivot = array[end];
    let i = start;
    for (let j = start; j < end; j++) {
        let temp_arr = [...array, end, i, j];
        console.log(end, i, j);
        moves.push(temp_arr);
        if (array[j] < pivot) {
            let temp = array[j];
            array[j] = array[i];
            array[i] = temp;
            temp_arr = [...array, end, i, j];
            moves.push(temp_arr);
            i++;
        }

    }
    let temp = array[i];
    array[i] = array[end];
    array[end] = temp;
    let temp_arr = [...array, end, i, end];
    moves.push(temp_arr);
    return i;
}
export const quicksort = (array, start, end, moves) => {
    if (start < end) {
        let pi = partition(array, start, end, moves);
        quicksort(array, start, pi - 1, moves);
        quicksort(array, pi + 1, end, moves);
    }
    return array;
}