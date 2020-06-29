import React from 'react';
import './item-size-list.css';


const ItemSizeList = props => {
    return (
        <div className = "item-size">
            { props.StoryPoints.map(point => {
                return (<label key = {point}>{point}</label>)
            })}
        </div>
    )
}

export default ItemSizeList;