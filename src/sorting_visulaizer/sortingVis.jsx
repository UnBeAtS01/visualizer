import React from 'react';
import './sortingVis.scss';
import Nav from './navbar';
import * as sortingAlgo from '../sorting_algos/sort.js';
function randomIntFromIntervals(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
class sortingVisualizer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            array: [],
            color: [],
            colorfinal: [],
            speed: 10,
            number: 80,
            selecionArray: [],
        }
    }
    componentDidMount() {
        this.resetArray();
    }
    resetArray = () => {
        const newArray = [];
        for (let i = 0; i <= this.state.number; i++) {
            newArray.push(randomIntFromIntervals(50, 500));
        }
        this.setState({ array: newArray, color: [], colorfinal: [], selecionArray: [] });
    }

    calls = async (moves, newarray, i) => {
        const val = this.state.array;

        setTimeout(() => {
            //console.log("anga");
            const start = moves[i][moves[i].length - 2];
            const end = moves[i][moves[i].length - 1];
            //console.log(start, end);
            const newcolor = [start, end];
            this.setState({ color: newcolor })
            for (let j = 0; j < moves[i].length - 2; j++) {
                //console.log("main");
                val[start + j] = moves[i][j];
                //console.log(val[j], newarray[j]);
                this.setState({ array: val });
            }


        }, this.state.speed * (i + 1));

        return;
    }
    bubbleVisual = async (moves, i) => {
        setTimeout(() => {
            const newArray = [];
            const start = moves[i][moves[i].length - 2];
            const end = moves[i][moves[i].length - 1];
            const newcolor = [start, end];
            for (let j = 0; j < moves[i].length - 2; j++) {
                newArray.push(moves[i][j]);
            }
            this.setState({ array: newArray, color: newcolor });
        }, this.state.speed * (i + 1));
    }
    selectionVisual = async (moves, i) => {
        setTimeout(() => {
            const newArray = [];
            const start = moves[i][moves[i].length - 2];
            const end = moves[i][moves[i].length - 1];

            for (let j = 0; j < moves[i].length - 2; j++) {
                newArray.push(moves[i][j]);
            }
            let newcolor = [start, end];
            this.setState({ array: newArray, selecionArray: newcolor });

        }, this.state.speed * (i + 1));
    }
    insertionsort = async () => {
        let val = this.state.array;
        let moves = [];
        let newArray = sortingAlgo.insertionsort(val, moves);
        for (let i = 0; i < moves.length; i++) {
            await this.bubbleVisual(moves, i);
        }
        setTimeout(() => {
            this.setState({ array: newArray, colorfinal: [0, val.length - 1] });

        }, this.state.speed * (moves.length + 2));

    }
    mergesort = async () => {
        let val = this.state.array;
        let moves = [];
        let newarray = sortingAlgo.mergeSort(val, 0, val.length - 1, moves);
        // console.log(moves.length);
        // console.log(moves);
        for (let i = 0; i < moves.length; i++) {
            await this.calls(moves, newarray, i);
        }
        //console.log(val);
        setTimeout(() => {
            this.setState({ array: val });
            this.setState({ colorfinal: [0, this.state.array.length - 1] })
        }, this.state.speed * (moves.length + 2));

    }
    Bubblesort = async () => {
        const moves = [];
        let val = this.state.array;
        const newArray = sortingAlgo.bubblesort(val, moves);
        console.log(newArray);
        for (let i = 0; i < moves.length; i++) {
            await this.bubbleVisual(moves, i);
        }
        setTimeout(() => {
            this.setState({ array: newArray, colorfinal: [0, val.length - 1] });

        }, this.state.speed * (moves.length + 2));
    }
    speedMod = (e) => {
        this.setState({ speed: e.target.value });
    }
    columnMod = (e) => {
        this.setState({ number: e.target.value });
    }
    selectionsort = async () => {
        const moves = [];
        let val = this.state.array;
        const newArray = sortingAlgo.selectionsort(val, moves);
        console.log(newArray);
        for (let i = 0; i < moves.length; i++) {
            await this.selectionVisual(moves, i);
        }
        setTimeout(() => {
            this.setState({ array: newArray, colorfinal: [0, val.length - 1] });

        }, this.state.speed * (moves.length + 2));
    }
    render() {
        const array = this.state.array;
        return (
            <div>
                <Nav reset={this.resetArray} bubblesort={this.Bubblesort} mergesort={this.mergesort} insertionsort={this.insertionsort} selectionsort={this.selectionsort} speedMod={this.speedMod} speed={this.state.speed} column={this.state.number} columnMod={this.columnMod} />
                <div className='base_container'>

                    {
                        array.map((value, idx) => {
                            console.log("startend", idx, this.state.color[0], this.state.color[1]);
                            if (this.state.color.length === 0 && this.state.colorfinal.length === 0) {
                                if (this.state.selecionArray.length === 0 || (this.state.selecionArray[0] !== idx && this.state.selecionArray[1] !== idx))
                                    return <div className='array-bars' key={idx} style={{ height: `${value}px` }}>
                                        { }
                                    </div>
                                else
                                    return <div className='array-bars' key={idx} style={{ height: `${value}px`, backgroundColor: 'yellow' }}>
                                        { }
                                    </div>
                            }
                            else if (this.state.colorfinal.length === 0) {
                                console.log("startend", this.state.color[0], this.state.color[1]);
                                if (this.state.color[0] <= idx && this.state.color[1] >= idx) {
                                    return <div className='array-bars' key={idx} style={{ height: `${value}px`, backgroundColor: 'yellow' }}>
                                        { }
                                    </div>
                                }
                                else {
                                    return <div className='array-bars' key={idx} style={{ height: `${value}px` }}>
                                        { }
                                    </div>
                                }
                            }
                            else {
                                return <div className='array-bars' key={idx} style={{ height: `${value}px`, backgroundColor: 'blue' }}>
                                    { }
                                </div>
                            }
                        })
                    }
                </div>

            </div>

        )
    }
};

export default sortingVisualizer;
