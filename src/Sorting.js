import React, { useState } from 'react';
import { getBubbleAnimations } from './algorithms/bubblesort';
import { getInsertionAnimations } from './algorithms/insertionsort';
import { getMergeAnimations } from './algorithms/mergesort';
import { getQuickAnimations } from './algorithms/quicksort';
import './sorting.css';

const MIN = 20;
const MAX = 500;
const SIZE = 300;
const SPEED = 3;

function getArray() {
    let a = [];
    for (let i = 0; i < SIZE; i++) {
        a.push(getRandomInt(MIN, MAX))
    }
    return a;
}

function clone(arr) {
    return JSON.parse(JSON.stringify(arr))
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Sorting = () => {
    const [arr, setArr] = useState(getArray);
    const [sorted, setSorted] = useState(false);
    const [playing, setPlaying] = useState(false);

    const reset = () => {
        const _arr = getArray;
        setArr(_arr)
        setSorted(false)
        resetColor();
    }

    const resetColor = () => {
        const bars = document.getElementsByClassName('bars');
        for(let i = 0; i < arr.length; i++) {
            const barStyle = bars[i].style;
            barStyle.backgroundColor = 'black';
        }
    }

    const handleAnimations = (animations) => {
        const bars = document.getElementsByClassName('bars')
        setTimeout(() => {
            setPlaying(true)
        }, SPEED * animations.length)
        console.log("Speed", SPEED * animations.length)

        for (let i = 0; i < animations.length; i++) {
            const [type, idx, value] = animations[i];
            const barStyle = bars[idx].style;
            if(type === 'colorChange') {
                setTimeout(() => {
                    barStyle.backgroundColor = value;
                }, i * SPEED)
            } else if(type === 'heightChange') {
                setTimeout(() => {
                    barStyle.height = `${value}px`;
                }, i * SPEED)
            }
        }
        setSorted(true)
    }

    const _handleAnimations = (animations) => {
        const bars = document.getElementsByClassName('bars')
        
        setTimeout(() => {
            setPlaying(true)
        }, SPEED * animations.length)
        console.log("Speed", SPEED * animations.length)

        for(let i = 0; i < animations.length; i++) {
            if(animations[i].length === 3) {
                setTimeout(() => {
                    const [idxOne, idxTwo, value] = animations[i];
                    const barOneStyle = bars[idxOne].style;
                    const barTwoStyle = bars[idxTwo].style;
                    barOneStyle.backgroundColor = value;
                    barTwoStyle.backgroundColor = value;
                }, i * SPEED)
            } else if(animations[i].length === 2) {
                setTimeout(() => {
                    const [idx, value] = animations[i]
                    const barOneStyle = bars[idx].style;
                    barOneStyle.height = `${value}px`;
                }, i * SPEED)
            } 
        } 
    }

    const startPlaying = () => {
        setPlaying(true)
    }

    const stopPlaying = () => {
        setPlaying(false)
    }

    const handleInsertionSort = async () => {
        const _arr = clone(arr);
        const animations = getInsertionAnimations(_arr, _arr.length);
        await handleAnimations(animations)
    }

    const handleBubbleSort = () => {
        const _arr = clone(arr)
        const animations = getBubbleAnimations(_arr, _arr.length);
        setTimeout(handleAnimations(animations), 0)
        setSorted(true)
        console.log("stop", playing)
    }

    const handleQuickSort = () => {
        const _arr = clone(arr)
        const animations = getQuickAnimations(_arr, 0, _arr.length - 1)
        _handleAnimations(animations);
        setSorted(true)
    }

    const handleMergeSort = () => {
        setPlaying(true)
        const _arr = clone(arr);
        const animations = getMergeAnimations(_arr);
        handleAnimations(animations);
        setSorted(true)
        setPlaying(false)
    }

    return (
        <div>
            <h3 className="heading">Sorting Visualizer</h3>
            <div>
                <button disabled={!playing} className="resetBtn" onClick={reset}>Randomize Bars</button>

                <button 
                    disabled={sorted} 
                    className="btn" 
                    onClick={() => {
                        setTimeout(startPlaying(), 0)
                        setTimeout(handleInsertionSort(), 0)
                        setTimeout(stopPlaying(), 0)
                    }}
                >
                    Insertion Sort
                </button>
                <button disabled={sorted} className="btn" onClick={handleBubbleSort}>Bubble Sort</button>
                <button disabled={sorted} className="btn" onClick={handleQuickSort}>Quick Sort</button>
                <button disabled={sorted} className="btn" onClick={handleMergeSort}>Merge Sort</button>
            </div>
            <div style={{display: "inline-flex", margin: "30px 20px"}}>
                {arr.map((it, idx) => {
                    return (
                        <div key={idx} className="bars" style={{height: `${it}px`}} />
                    )
                })}
            </div>
        </div>
    )
}

export default Sorting;


