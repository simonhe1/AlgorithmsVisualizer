import React, { useState, useEffect } from 'react';
import Rectangle from './Rectangle';
import { getBubbleSortAnimations } from './Sorts/BubbleSort';
import { getSelectionSortAnimations } from './Sorts/SelectionSort';
import { getInsertionSortAnimations } from './Sorts/InsertionSort';
import { getMergeSortAnimations } from './Sorts/MergeSort';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';

const SortingVisualizer = props => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const RECT_COLOR_PRIMARY = 'pink';
    const RECT_COLOR_SECONDARY = 'black';
    const ANIMATION_SPEED = 5;
    const BUTTON_SIZE = 15;

    const [rectangleElements,setRectangleElements] = useState([]);
    const minElementsAllowed = parseInt((windowWidth-200)/8);
    const [numElements,setNumElements] = useState(minElementsAllowed);
    const [running,setRunning] = useState(false);
    const [windowDimensions,setWindowDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    })

    useEffect(() => {
        generateArray();
    },[windowDimensions]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    },[]);

    const [RECT_WIDTH,SET_RECT_WIDTH] = useState(Math.floor(windowWidth/(numElements*1.5)));

    const containerStyling = {
        textAlign: 'center',
    }

    const handleResize = () =>{
        setWindowDimensions({
            height: window.innerHeight,
            width: window.innerWidth,
        });
        SET_RECT_WIDTH(Math.floor(window.innerWidth/(numElements*1.5)))
    }

    const generateArray = () => {
        const arr = [];
        for(let i = 0;i<numElements;i++){
            arr.push(randomNumber(5,windowDimensions.height - BUTTON_SIZE*5));
        }
        setRectangleElements(arr);
    }

    const bubbleSort = () => {
        let animations = getBubbleSortAnimations(rectangleElements);
        for(let i=0;i<animations.length;i++){
            const rectangles = document.getElementsByClassName('rectangle');
            setTimeout(() => {
                const [rectOneIndex, rectTwoIndex] = animations[i];
                const changeColor = i%3 !== 2;               
                const color = i%3 === 0 ? RECT_COLOR_SECONDARY : RECT_COLOR_PRIMARY;
                if(changeColor){
                    const rectOneStyle = rectangles[rectOneIndex].style;
                    const rectTwoStyle = rectangles[rectTwoIndex].style;
                    rectOneStyle.backgroundColor = color;
                    rectTwoStyle.backgroundColor = color;
                }else{
                    if(!(rectOneIndex === -1 || rectTwoIndex === -1)){
                        const rectOneStyle = rectangles[rectOneIndex].style;
                        const rectTwoStyle = rectangles[rectTwoIndex].style;
                        const height1 = rectOneStyle.height;
                        const height2 = rectTwoStyle.height;
                        rectOneStyle.height = height2;
                        rectTwoStyle.height = height1;

                        rectOneStyle.backgroundColor = RECT_COLOR_PRIMARY;
                        rectTwoStyle.backgroundColor = RECT_COLOR_SECONDARY;
                    }
                }
            }, i * ANIMATION_SPEED);
        }
    }

    const selectionSort = () => {
        let animations = getSelectionSortAnimations(rectangleElements);
        // j is used to keep track of outer loop to keep i in check
        let j = 0;
        for(let i=0;i<animations.length;i++){
            const rectangles = document.getElementsByClassName('rectangle');
            setTimeout(() => {
                const [pass, rectOneIndex, rectTwoIndex] = animations[i];
                if(pass === 'inner'){
                    // Only 4 passes inside inner loop
                    // 1st pass represents highlight the 2 indexes we're working with
                    // 2nd pass unhighlights the 2 indexes
                    // 3rd pass unhighlights the min index if we found a new min index
                    // 4th pass highlights new min index if there is
                    const changeColor = !(rectOneIndex === -1 || rectTwoIndex === -1);
                    if(changeColor){
                        const rectOneStyle = rectangles[rectOneIndex].style;
                        const rectTwoStyle = rectangles[rectTwoIndex].style;
                        // 1st and 4th pass
                        if((i+j)%4 === 0 || (i+j)%4 === 3){
                            rectOneStyle.backgroundColor = RECT_COLOR_SECONDARY;
                            rectTwoStyle.backgroundColor = RECT_COLOR_SECONDARY;
                        }else{
                            rectOneStyle.backgroundColor = RECT_COLOR_PRIMARY;
                            rectTwoStyle.backgroundColor = RECT_COLOR_PRIMARY;
                        }
                    }
                }else{
                    const rectOneStyle = rectangles[rectOneIndex].style;
                    const rectTwoStyle = rectangles[rectTwoIndex].style;
                    const height1 = rectOneStyle.height;
                    const height2 = rectTwoStyle.height;
                    rectOneStyle.height = height2;
                    rectTwoStyle.height = height1;

                    rectOneStyle.backgroundColor = RECT_COLOR_PRIMARY;
                    rectTwoStyle.backgroundColor = RECT_COLOR_PRIMARY;
                    j+=3;
                }
            }, i * ANIMATION_SPEED);
        }
    }

    const insertionSort = () => {
        let animations = getInsertionSortAnimations(rectangleElements);
        // j is used to keep track of outer loop to keep i in check
        let j = 0;
        for(let i=0;i<animations.length;i++){
            const rectangles = document.getElementsByClassName('rectangle');
            setTimeout(() => {
                const[pass, rectOneIndex, rectTwoIndex] = animations[i];
                const changeColor = (i+j)%3 !== 2;
                const color = (i+j)%3 === 0 ? RECT_COLOR_SECONDARY : RECT_COLOR_PRIMARY;
                if(pass === 'inner'){
                    const rectOneStyle = rectangles[rectOneIndex].style;
                    const rectTwoStyle = rectangles[rectTwoIndex].style;    
                    if(changeColor){
                        rectOneStyle.backgroundColor = color;
                        rectTwoStyle.backgroundColor = color;
                    }else{
                        const height1 = rectOneStyle.height;
                        const height2 = rectTwoStyle.height;
                        rectOneStyle.height = height2;
                        rectTwoStyle.height = height1;
                    }
                }else{
                    if(changeColor){
                        const rectOneStyle = rectangles[rectOneIndex].style;
                        const rectTwoStyle = rectangles[rectTwoIndex].style;
                        rectOneStyle.backgroundColor = color;
                        rectTwoStyle.backgroundColor = color;
                        j++;
                    }else{
                        // Instead of swapping index with another rectangle
                        // Will just make the index with the given height
 
                        const rectOneStyle = rectangles[rectOneIndex].style;
                        // Although name is rectTwoIndex, since it's outer loop,
                        // it's actually the height of the value we're trying to insert
                        const height = rectTwoIndex;
                        rectOneStyle.height = height;
                        j+=2;
                    }
                }
            }, i * ANIMATION_SPEED);
        }
    }

    const mergeSort = () => {
        const animations = getMergeSortAnimations(rectangleElements);
    }

    const randomNumber = (min,max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const updateNumElements = (event,value) => {
        if(value !== numElements){
            SET_RECT_WIDTH(Math.floor(windowDimensions.width/(value*1.5)))
            setNumElements(value);
            generateArray();
        }
    }

    return (
        <div style={containerStyling}>
            <Grid container spacing={2}>
                <Grid item>
                    <button className="sortName" onClick={e => bubbleSort()}>Bubble Sort</button>
                </Grid>
                <Grid item>
                    <button className="sortName" onClick={e => selectionSort()}>Selection Sort</button>                
                </Grid>
                <Grid item xs>
                    <Slider value={numElements} min={minElementsAllowed} max={250} onChange={(e,v) => updateNumElements(e,v)} />
                </Grid>
                <Grid item>
                    <button className="sortName" onClick={e => insertionSort()}>Insertion Sort</button>
                </Grid>
                <Grid item>
                    <button className="sortName" onClick={e => mergeSort()}>Merge Sort</button>
                </Grid>
            </Grid>
            <div className="rectangle-container">
                {rectangleElements.map((val,index) => (
                    <Rectangle 
                        height={val}
                        width={RECT_WIDTH}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
}
export default SortingVisualizer;