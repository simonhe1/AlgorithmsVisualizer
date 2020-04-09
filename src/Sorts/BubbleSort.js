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
            // Push j,j+1 once to highlight they are being compared
            animations.push([j,j+1]);
            // Push j,j+1 a second time to set them back to default color
            animations.push([j,j+1]);
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