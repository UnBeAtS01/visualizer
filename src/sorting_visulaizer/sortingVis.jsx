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
            quick_array: [],
            heap_array: [],
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
        this.setState({ array: newArray, color: [], colorfinal: [], selecionArray: [], quick_array: [], heap_array: [] });
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
    quicksortVisual = (moves, array, i) => {
        setTimeout(() => {
            let n = moves[i].length;
            const val = this.state.array;
            const pivot = moves[i][n - 3];
            const first = moves[i][n - 2];
            const second = moves[i][n - 1];
            console.log(pivot, first, second);
            this.setState({ quick_array: [pivot, first, second] });
            for (let j = 0; j < moves[i].length - 3; j++) {
                //console.log("main");
                val[j] = moves[i][j];
                //console.log(val[j], newarray[j]);
                this.setState({ array: val });
            }

        }, this.state.speed * (i + 1));

    }
    quicksort = async () => {
        let val = this.state.array;
        let moves = [];
        let newarray = sortingAlgo.quicksort(val, 0, val.length - 1, moves);

        for (let i = 0; i < moves.length; i++) {
            await this.quicksortVisual(moves, newarray, i);
        }

        setTimeout(() => {
            this.setState({ array: newarray });
            this.setState({ colorfinal: [0, this.state.array.length - 1], quick_array: [] })
        }, this.state.speed * (moves.length + 2));

    }
    heapsortVisual = (moves, i) => {
        setTimeout(() => {
            let n = moves[i].length;
            const val = this.state.array;
            const root = moves[i][n - 3];
            const left = moves[i][n - 2];
            const right = moves[i][n - 1];
            console.log(root, left, right);
            this.setState({ heap_array: [root, left, right] });
            for (let j = 0; j < moves[i].length - 3; j++) {
                //console.log("main");
                val[j] = moves[i][j];
                //console.log(val[j], newarray[j]);
                this.setState({ array: val });
            }

        }, this.state.speed * (i + 1));
    }
    heapsort = async () => {
        let val = this.state.array;
        const moves = [];
        let newarray = sortingAlgo.heapsort(val, moves);
        console.log(newarray);
        for (let i = 0; i < moves.length; i++) {
            await this.heapsortVisual(moves, i);
        }
        setTimeout(() => {
            this.setState({ array: newarray });
            this.setState({ colorfinal: [0, this.state.array.length - 1], heap_array: [] })
        }, this.state.speed * (moves.length + 2));
    }
    render() {
        const array = this.state.array;
        return (
            <div >
                <Nav reset={this.resetArray} heapsort={this.heapsort} bubblesort={this.Bubblesort} mergesort={this.mergesort} insertionsort={this.insertionsort} selectionsort={this.selectionsort} quicksort={this.quicksort} speedMod={this.speedMod} speed={this.state.speed} column={this.state.number} columnMod={this.columnMod} />
                <div className='base_container'>

                    {
                        array.map((value, idx) => {
                            //console.log("startend", idx, this.state.color[0], this.state.color[1]);
                            if (this.state.heap_array.length !== 0) {
                                if (idx === this.state.heap_array[0]) {
                                    return <div className='array-bars' key={idx} style={{ height: `${value}px`, backgroundColor: 'green' }}>
                                        { }
                                    </div>
                                }
                                else if (idx === this.state.heap_array[1] || idx === this.state.heap_array[2]) {
                                    return <div className='array-bars' key={idx} style={{ height: `${value}px`, backgroundColor: 'violet' }}>
                                        { }
                                    </div>
                                }
                                else {
                                    return <div className='array-bars' key={idx} style={{ height: `${value}px` }}>
                                        { }
                                    </div>
                                }
                            }
                            else if (this.state.quick_array.length !== 0) {
                                if (idx === this.state.quick_array[0]) {
                                    return <div className='array-bars' key={idx} style={{ height: `${value}px`, backgroundColor: 'green' }}>
                                        { }
                                    </div>
                                }
                                else if (idx === this.state.quick_array[1] || idx === this.state.quick_array[2]) {
                                    return <div className='array-bars' key={idx} style={{ height: `${value}px`, backgroundColor: 'violet' }}>
                                        { }
                                    </div>
                                }
                                else {
                                    return <div className='array-bars' key={idx} style={{ height: `${value}px` }}>
                                        { }
                                    </div>
                                }
                            }
                            else if (this.state.color.length === 0 && this.state.colorfinal.length === 0) {
                                if (this.state.selecionArray.length === 0 || (this.state.selecionArray[0] !== idx && this.state.selecionArray[1] !== idx))
                                    return <div className='array-bars' key={idx} style={{ height: `${value}px` }}>
                                        { }
                                    </div>
                                else
                                    return <div className='array-bars' key={idx} style={{ height: `${value}px`, backgroundColor: 'violet' }}>
                                        { }
                                    </div>
                            }
                            else if (this.state.colorfinal.length === 0) {
                                console.log("startend", this.state.color[0], this.state.color[1]);
                                if (this.state.color[0] <= idx && this.state.color[1] >= idx) {
                                    return <div className='array-bars' key={idx} style={{ height: `${value}px`, backgroundColor: 'violet' }}>
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
                                return <div className='array-bars' key={idx} style={{ height: `${value}px`, backgroundColor: '#8deaff' }}>
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
