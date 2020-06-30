import React from 'react';
import './item-size-list.css';


const ItemSizeList = props => {
    return (
        <div className = "item-size">
            { props.StoryPoints.map(point => {
                return (<button key = {point}>{point}</button>)
            })}
        </div>
    )
}

export default ItemSizeList;