import { compareArrays } from '../Testers/CompareArrays';

export const getBubbleSortAnimations = arr => {
    // Array to store the animations
    let animations = [];

    // Get a copy of the array
    // Array will have the following structure
    // [Integer1, Integer2, ..., IntegerN]
    let arrCopy = arr.slice();

    // Sort the array and update animations with values
    bubbleSort(arrCopy,animations);

    const JSSortedArray = arr.slice().sort((a,b) => a - b);
    console.log('sorted correctly?',compareArrays(arrCopy,JSSortedArray));
    return animations;
}

const bubbleSort = (array, animations) => {
    const len = array.length;
    for(let i=0;i<len;i++){
        for(let j=0;j<len-i-1;j++){
            // Push i,j once to highlight i and j are being compared
            animations.push([i,j]);
            // Push i,j a second time to set i and j to default color
            animations.push([i,j]);
            if(array[j] > array[j+1]){
                // Push j and j+1 to tell the program to switch the values
                animations.push([j,j+1]);

                // Swap values
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }else{
                // If condition not met, push -1,-1 to continue onto next animation
                animations.push([-1,-1]);
            }
        }
    }
}