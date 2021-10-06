import './navbar.scss';
import React, { Component } from 'react'

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            string: null
        }
    }
    reset = () => {
        this.props.reset();
        this.setState({ string: null });

    }
    mergesort = () => {
        this.props.mergesort();
        this.setState({ string: 'mergesort' })
    }
    bubblesort = () => {
        this.props.bubblesort();
        this.setState({ string: 'bubblesort' })
    }
    insertionsort = () => {
        this.props.insertionsort();
        this.setState({ string: 'insertionsort' })
    }
    selectionsort = () => {
        this.props.selectionsort();
        this.setState({ string: 'selectionsort' })
    }
    render() {
        const { speed, column } = this.props;
        return (<div className="Nav-bar">
            <div className='rearrange' >
                <button className='reset' onClick={this.reset}>Re-set</button>
                <div className='first'><div className='speed_content'>speed(ms)</div><input type='number' value={speed} placeholder='SET SPEED' onChange={this.props.speedMod}></input></div>
                <div className='second'><div className='number_content'>number</div><input type='number' value={column} placeholder='SET COLUMN' onChange={this.props.columnMod}></input></div>
            </div>

            <div class='sorting'>
                <button className={`buttons ${this.state.string === 'mergesort' ? 'lvl' : ''}`} onClick={() => this.mergesort()} >Merge sort</button>
                <button className={`buttons ${this.state.string === 'bubblesort' ? 'lvl' : ''}`} onClick={() => this.bubblesort()}>Bubble sort</button>
                <button className={`buttons ${this.state.string === 'selectionsort' ? 'lvl' : ''}`} onClick={() => this.selectionsort()}>Selectionsort</button>
                <button className={`buttons ${this.state.string === 'insertionsort' ? 'lvl' : ''}`} onClick={() => this.insertionsort()}>Insertionsort</button>
            </div>
        </div>);
    }
};
export default Nav;