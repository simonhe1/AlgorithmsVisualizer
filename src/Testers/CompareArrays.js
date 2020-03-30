// Compares two arrays of ints. Returns true if all values of arr1 equals arr2
export const compareArrays = (arr1,arr2) => {
    // First check if they're same length before doing calculations
    if(arr1.length !== arr2.length) return false;

    const length = arr1.length;
    for(let i=0;i<length;i++){
        if(arr1[i] !== arr2[i]) return false;
    }
    return true;
}