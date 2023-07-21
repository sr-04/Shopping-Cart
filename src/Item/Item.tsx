import React from 'react'
import {Button} from '@mui/material'

import {DisplayItemType} from '../App'

import {Wrapper} from './Item.styles'

type ItemProps = {
        Item : DisplayItemType,
        handleAddToCart: (clickedItem: DisplayItemType) => void
}


const Item : React.FC<ItemProps> = ({ Item, handleAddToCart}) => {
return (
        <Wrapper>
                <img src = {Item.image} alt = {Item.title} />
                <div>
                        <h1>{Item.title}</h1>
                        <p>{Item.description}</p>
                        <h1>{Item.price}</h1>
                </div>
                <Button
                        onClick={() => handleAddToCart(Item)}
                >
                        Add to Cart.
                </Button>
        </Wrapper>
                
);
};

export default Item;