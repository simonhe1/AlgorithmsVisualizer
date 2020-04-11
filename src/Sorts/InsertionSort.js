import { compareArrays } from '../Testers/CompareArrays';

export const getInsertionSortAnimations = arr => {
    // Array to store the animations
    let animations = [];

    // Get a copy of the array
    // Array will have the following structure
    // [Integer1, Integer2, ..., IntegerN]
    let arrCopy = arr.slice();

    // Sort the array and update animations with values
    insertionSort(arrCopy,animations);

    const JSSortedArray = arr.slice().sort((a,b) => a-b);
    console.log('sorted correctly?',compareArrays(arrCopy,JSSortedArray));
    return animations;
}

const insertionSort = (array,animations) => {
    const length = array.length;
    // Left side is sorted portion, right side is unsorted portion
    for(let i=1;i<length;i++){
        let valToInsert = array[i];
        let j = i-1;
        while(j >= 0 && valToInsert < array[j]){
            array[j+1] = array[j];
            j--;
        }
        array[j+1] = valToInsert;
    }
}