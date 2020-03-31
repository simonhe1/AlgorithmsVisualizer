import { compareArrays } from '../Testers/CompareArrays';

export const getSelectionSortAnimations = arr => {
    // Array to store the animations
    let animations = [];

    // Get a copy of the array
    // Array will have the following structure
    // [Integer1, Integer2, ..., IntegerN]
    let arrCopy = arr.slice();

    // Sort the array and update animations with values
    selectionSort(arrCopy,animations);

    const JSSortedArray = arr.slice().sort((a,b) => a - b);
    console.log('sorted correctly?',compareArrays(arrCopy,JSSortedArray));
    return animations;
}

const selectionSort = (array,animations) => {
    const length = array.length;
    for(let i=0;i<length;i++){
        let minIndex = i;
        // Iterate through rest of array and keep track of the minimum index
        for(let j=i+1;j<length;j++){
            if(array[j] < array[minIndex]){
                minIndex = j;
            }
        }
        // After loop runs, we know we have the minimum ith value so we can perform a swap
        // with the ith position with the value at the position of the minimum index
        let temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
    }
}