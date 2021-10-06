import './navbar.scss';
import React, { Component } from 'react'

class Nav extends Component {

    render() {
        const { speed, column } = this.props;
        return (<div className="Nav-bar">
            <div className='rearrange' ><button className='buttons' style={{ backgroundColor: 'black', color: 'white', padding: '5px 2px 5px 2px' }} onClick={() => this.props.reset()}>Re-set</button>
                <input type='number' className='buttons' value={speed} placeholder='SET SPEED' onChange={this.props.speedMod}></input>
                <input type='number' className='buttons' value={column} placeholder='SET COLUMN' onChange={this.props.columnMod}></input>
            </div>

            <div class='sorting'>
                <button className='buttons' onClick={() => this.props.mergesort()}>merge sort</button>
                <button className='buttons' onClick={() => this.props.bubblesort()}>bubble sort</button>
                <button className='buttons' onClick={() => this.props.selectionsort()}>selectionsort</button>
                <button className='buttons' onClick={() => this.props.insertionsort()}>insertionsort</button>

            </div>
        </div>);
    }
};
export default Nav;