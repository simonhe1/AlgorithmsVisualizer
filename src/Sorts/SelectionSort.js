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
            // Push j,j+1 once to highlight j and j+1 are being compared
            animations.push([j,j+1]);
            // Push j,j+1 a second time to set them to default color
            animations.push([j,j+1]);
            if(array[j] < array[minIndex]){
                // Push old index to be unhighlighted
                animations.push([minIndex,minIndex]);

                minIndex = j;
                // Push the new min index to be highlighted
                animations.push([minIndex,minIndex]);
            }else{
                // Means did not find it and will continue trying to look for a min index
                animations.push([-1,-1]);
                animations.push([-1,-1]);
            }
        }
        // After loop runs, we know we have the minimum ith value so we can perform a swap
        // with the ith position with the value at the position of the minimum index
        let temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
        animations.push([i,minIndex]);
    }
}