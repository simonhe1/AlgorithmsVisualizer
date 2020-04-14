import { compareArrays } from '../Testers/CompareArrays';

export const getMergeSortAnimations = arr => {
    // Array to store the animations
    let animations = [];

    // Get a copy of the array
    // Array will have the following structure
    // [Integer1, Integer2, ..., IntegerN]
    let arrCopy = arr.slice();

    // Sort the array and update animations with values
    mergeSort(arrCopy,animations);

    const JSSortedArray = arr.slice().sort((a,b) => a-b);
    console.log('sorted correctly?',compareArrays(arrCopy,JSSortedArray));
    return animations;
}

const mergeSort = (array,animations) => {
    let length = array.length;
    if(array.length > 1){
        let mid = Math.floor(length/2);
        
        // Partition left array
        let left = [];
        for(let i=0;i<mid;i++){
            left.push(array[i]);
        }

        // Partition right array
        let right = [];
        for(let i=mid;i<length;i++){
            right.push(array[i]);
        }

        mergeSort(left,animations);
        mergeSort(right,animations);

        let leftArrayPointer = 0;
        let rightArrayPointer = 0;
        let mainPointer = 0;

        // Merge left and right array
        while(leftArrayPointer < left.length && rightArrayPointer < right.length){
            if(left[leftArrayPointer] < right[rightArrayPointer]){
                array[mainPointer] = left[leftArrayPointer];
                leftArrayPointer++;
            }else{
                array[mainPointer] = right[rightArrayPointer];
                rightArrayPointer++;
            }
            mainPointer++;
        }

        // Checks whether there's still elements remaining in left array and right array
        while(leftArrayPointer < left.length){
            array[mainPointer] = left[leftArrayPointer];
            leftArrayPointer++;
            mainPointer++;
        }
        while(rightArrayPointer < right.length){
            array[mainPointer] = right[rightArrayPointer];
            rightArrayPointer++;
            mainPointer++;
        }
    }

}