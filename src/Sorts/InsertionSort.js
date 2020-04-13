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
        // Push once to highlight comparison
        animations.push(['outter',j,i]);
        // Push second time to unhighlight
        animations.push(['outter',j,i]);
        while(j >= 0 && valToInsert < array[j]){
            // Highlight compared values
            animations.push(['inner',j,j+1]);
            // Unhighlight compared values
            animations.push(['inner',j,j+1]);
            // Switch values
            animations.push(['inner',j,j+1]);
            array[j+1] = array[j];
            j--;
        }
        array[j+1] = valToInsert;
        // Third iteration will insert value into correct position
        animations.push(['outter',j+1,valToInsert]);
    }
}