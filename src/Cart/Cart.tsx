import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import CartItem from '../CartItem/CartItem'
import {CartItemType} from '../App'

import {Wrapper} from './Cart.styles'

type CartProps = {
      cartItems: CartItemType[];
      totalAmount: number;
      addItemCount: (index: number) => void;
      removeItemCount: (index: number) => void;
}

export const Cart: React.FC<CartProps> = ({cartItems, totalAmount, addItemCount, removeItemCount}) => {
      return (
          <Wrapper>
            <div>
            <TableContainer component={Paper}>
                  <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell width={50} sx ={{textAlign:"center", fontWeight: "bold"}}>S No.</TableCell>
                            <TableCell width={150} sx ={{textAlign:"center", fontWeight: "bold"}}>Item Name</TableCell>
                            <TableCell width={100} sx ={{textAlign:"center", fontWeight: "bold"}}>Quantity</TableCell>
                            <TableCell width={100} sx ={{textAlign:"center", fontWeight: "bold"}}>Cost(Rs.)</TableCell>
                            <TableCell width={100} sx ={{textAlign:"center", fontWeight: "bold"}}>Price(Rs.)</TableCell>
                        </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>       
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
                    <TableBody>
                          {cartItems?.map((cartItem: CartItemType) => {
                                return(
                                      <CartItem 
                                        id = {cartItem.id}
                                        title = {cartItem.title}
                                        price = {cartItem.price}
                                        count = {cartItem.count}
                                        addItemCount = {addItemCount}
                                        removeItemCount = {removeItemCount}
                                      />
                                );      
                          })}
                    </TableBody>
                  </Table>
                </TableContainer>     
                <div
                  style = {{
                      margin: '20px',
                      fontWeight: 'bold',
                      fontSize: '20px'
                  }}
                > 
                    Total Amount = Rs. {totalAmount}
                </div> 
            </div>
          </Wrapper>
      )
}     

export default Cart