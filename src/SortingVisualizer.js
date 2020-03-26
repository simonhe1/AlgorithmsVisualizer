import React, { useState,useEffect } from 'react';
import Rectangle from './Rectangle';

const SortingVisualizer = props => {
    const [rectangleElements,setRectangleElements] = useState([]);
    const [numElements,setNumElements] = useState(200);
    useEffect(() => {
        generateArray();
    },[])


    useEffect(() => {
        bubbleSort();    
    },[])
    const [running,setRunning] = useState(false);
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const containerStyling = {
        textAlign: 'center',
    }

    const generateArray = () => {
        const arr = [];
        for(let i = 0;i<numElements;i++){
            arr.push(
                {
                    height: randomNumber(5,windowHeight-5),
                    width: Math.floor(windowWidth/numElements)-1.5,
                }
            );
        }
        setRectangleElements(arr);
    }

    const bubbleSort = () => {
        console.log('called');
        let arr = rectangleElements;
        console.log(arr)
        for(let i=0;i<arr.length;i++){
            for(let j=0;j<arr.length-i-1;i++){
                console.log(arr[j].height);
                console.log(arr[j+1].height);
                if(arr[j].height > arr[j+1].height){
                    let temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                    setRectangleElements(arr);
                }
            }
        }
    }

    const randomNumber = (min,max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    return (
        <div style={containerStyling}>
            {rectangleElements.map((obj,index) => (
                <Rectangle 
                    height={obj.height}
                    width={obj.width}
                    key={index}
                />
            ))}
            <div>
                <button onClick={e => bubbleSort()}>Click me</button>
            </div>
        </div>
    );
}
export default SortingVisualizer;