import React, { useState,useEffect } from 'react';
import Rectangle from './Rectangle';
import { getBubbleSortAnimations } from './Sorts/BubbleSort';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';

const SortingVisualizer = props => {
    const [rectangleElements,setRectangleElements] = useState([]);
    const [numElements,setNumElements] = useState(100);

    useEffect(() => {
        generateArray();
    },[])

    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const RECT_COLOR_PRIMARY = 'black';
    const RECT_COLOR_SECONDARY = 'green';
    const ANIMATION_SPEED = 1;
    const BUTTON_SIZE = 15;

    const [running,setRunning] = useState(false);
    const [RECT_WIDTH,SET_RECT_WIDTH] = useState(Math.floor(windowWidth/numElements)-1.5);

    const containerStyling = {
        textAlign: 'center',
    }

    const generateArray = () => {
        const arr = [];
        for(let i = 0;i<numElements;i++){
            arr.push(randomNumber(5,windowHeight - BUTTON_SIZE*3));
        }
        console.log(arr)
        setRectangleElements(arr);
    }

    const bubbleSort = () => {
        let animations = getBubbleSortAnimations(rectangleElements);
        for(let i=0;i<animations.length;i++){
            setTimeout(() => {
                const rectangles = document.getElementsByClassName('rectangle');
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
                    }
                }
            }, i * ANIMATION_SPEED);
        }
    }

    const randomNumber = (min,max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const updateNumElements = (event,value) => {
        setNumElements(value);
        SET_RECT_WIDTH(Math.floor(windowWidth/value)-1.5)
    }

    return (
        <div style={containerStyling}>
            {rectangleElements.map((val,index) => (
                <Rectangle 
                    height={val}
                    width={RECT_WIDTH}
                    key={index}
                />
            ))}
            <Grid container spacing={3}>
                <Grid item>
                    <button className="sortName" onClick={e => bubbleSort()}>Bubble Sort</button>
                </Grid>
                <Grid item>
                    <button className="sortName" >Selection Sort</button>                
                </Grid>
                <Grid item xs>
                    <Slider value={numElements} min={100} max={300} onChange={(e,v) => updateNumElements(e,v)} valueLabelDisplay="on" />
                </Grid>
                <Grid item>
                    <button className="sortName" >Insertion Sort</button>
                </Grid>
            </Grid>
        </div>
    );
}
export default SortingVisualizer;