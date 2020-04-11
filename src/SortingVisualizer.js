import React, { useState,useEffect } from 'react';
import Rectangle from './Rectangle';
import { getBubbleSortAnimations } from './Sorts/BubbleSort';
import { getSelectionSortAnimations } from './Sorts/SelectionSort';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';

const SortingVisualizer = props => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const RECT_COLOR_PRIMARY = 'pink';
    const RECT_COLOR_SECONDARY = 'black';
    const ANIMATION_SPEED = 10;
    const BUTTON_SIZE = 15;

    const [rectangleElements,setRectangleElements] = useState([]);
    const minElementsAllowed = parseInt((windowWidth-200)/8);
    const [numElements,setNumElements] = useState(minElementsAllowed);
    const [running,setRunning] = useState(false);

    useEffect(() => {
        generateArray();
    },[])

    const [RECT_WIDTH,SET_RECT_WIDTH] = useState(Math.floor(windowWidth/(numElements*1.5)));

    const containerStyling = {
        textAlign: 'center',
    }

    const generateArray = () => {
        const arr = [];
        for(let i = 0;i<numElements;i++){
            arr.push(randomNumber(5,windowHeight - BUTTON_SIZE*5));
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
                const [pass,rectOneIndex, rectTwoIndex] = animations[i];
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

    const randomNumber = (min,max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const updateNumElements = (event,value) => {
        if(value !== numElements){
            SET_RECT_WIDTH(Math.floor(windowWidth/(value*1.5)))
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
                    <button className="sortName" >Insertion Sort</button>
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