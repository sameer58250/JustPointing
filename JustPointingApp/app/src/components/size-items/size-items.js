import React from 'react';

const ItemSize = props =>{
    return (
        <div>
            {props.match.params.id}
        </div>
    )
}

export default ItemSize;