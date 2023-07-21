import React from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


import {Wrapper} from './CartItem.styles'

type cartItemProps = {
      id: number;
      title: string;
      price: number;
      count: number;
      addItemCount: (index: number) => void;
      removeItemCount: (index: number) => void
}

export const CartItem: React.FC<cartItemProps> = ({id, title, price, count, addItemCount, removeItemCount}) => {
      //console.log(itemsCount);

      return (
      <Wrapper>
            <div>
                  <TableRow>
                        <TableCell width={50} sx ={{textAlign:"center"}}>{id + 1}</TableCell>
                        <TableCell align="right" width={150} sx ={{textAlign:"center"}}> {title} </TableCell>
                        <TableCell align="right" width={100} sx ={{textAlign:"center"}}>
                              <button 
                                    onClick={() => { 
                                          addItemCount(id); 
                                    }}
                                    style = {{margin: "0 10px 0 10px"}}
                              > 
                                    + 
                              </button>
                        
                              {count} 
                        
                              <button
                                    onClick={() => {
                                          removeItemCount(id);
                                    }}
                                    style = {{margin: "0 10px 0 10px"}}
                              >
                                    -
                              </button>
                        </TableCell>
                        <TableCell align="right" width={100} sx ={{textAlign:"center"}}> {price} </TableCell>
                        <TableCell align="right" width={100} sx ={{textAlign:"center"}}> {count * price} </TableCell>
                  </TableRow>
            </div>
    </Wrapper>
  )   
}     
      
export default CartItem;