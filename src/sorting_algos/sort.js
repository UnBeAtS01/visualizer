
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