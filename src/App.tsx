import { useState } from 'react'
import { useQuery } from 'react-query'

// components for styling from mui/material library.

import {Drawer} from '@mui/material'
import {LinearProgress} from '@mui/material'
import {Grid} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Badge} from '@mui/material';

// Styling for our page.

import { Wrapper } from './App.styles';
import { StyledButton } from './App.styles'

// Components of out app.

import Item from './Item/Item'
import Cart from './Cart/Cart'

// two types for our app i.e. Display Item and Cart item.

export type DisplayItemType = {
      id : number;
      category: string;
      description: string;
      image: string;
      price: number;
      title: string;
      amount: number;
      rating: {rate: number, count: number}
}

export type CartItemType = {
      id: number;
      title: string;
      price: number;
      count: number;
}

// data from API.

const getProducts = async (): Promise<DisplayItemType[]> => {
      return await (await fetch('https://fakestoreapi.com/products')).json();
}

// this is our app function.

export const App = () => {
      const {data, isLoading, error} = useQuery<DisplayItemType[]>(
            'products',
            getProducts
      );


      const [cartOpen, setCartOpen] = useState<boolean>(false)                      //setting cart open when button clicked.
      const [cartItems, setCartItems] = useState<CartItemType[]>([]);               //items present in cart.
      const [totalCartItems, setTotalCartItems] = useState<number>(0);              //total no. of items in cart.
      const [totalAmount, setTotalAmount] = useState<number>(0);                    //total amount of items in cart.

      // gets called when item is added to cart.
      const handleCart = (item: DisplayItemType): void => {
            let presentInCart: boolean = false;  

            cartItems.map((cartItem: CartItemType) => {
                  if(item.title === cartItem.title)   presentInCart = true;
            })
      
            if(!presentInCart){
                  const newCartItem: CartItemType = {
                        title: item.title,
                        price: item.price,
                        count: 1,
                        id: totalCartItems
                  }

                  setCartItems([...cartItems, newCartItem]);
                  setTotalCartItems(prev => prev + 1);
                  setTotalAmount(prev => prev + item.price);
            }
      };

      // gets called when amount is increased in cart.
      const AddItemCount = (index: number): void => {
            let newCartItems: CartItemType[] = [];

            cartItems.map((cartItem: CartItemType) => {
                  if(index === cartItem.id){   
                        cartItem.count = cartItem.count + 1;
                        setTotalAmount(prev => prev + cartItem.price);
                  }
                  newCartItems = [...newCartItems, cartItem];
            });    

            setCartItems(newCartItems);
      }

      // gets called when amount is decreased in cart. potentially item is removed from cart.
      const RemoveItemCount = (index: number): void => {
            let newCartItems: CartItemType[] = [];
            let flag: boolean = false;

            cartItems.map((cartItem: CartItemType) => {
                  if(index === cartItem.id){   
                        cartItem.count = cartItem.count - 1;
                        setTotalAmount(prev => prev - cartItem.price);
                  }

                  if(flag)    cartItem.id = cartItem.id - 1;

                  if(cartItem.count > 0){
                        newCartItems = [...newCartItems, cartItem];
                  }

                  else{
                        flag = true;
                        setTotalCartItems(prev => prev - 1);
                  }

            });    

            setCartItems(newCartItems);
      }

      //till api fetches the data we display loading.
      if(isLoading) { return <LinearProgress />; }

      //if some error occurs.
      if(error) { return <div>Something went wrong</div>; }

      
      return(
            <Wrapper>
                  <Drawer
                        anchor='right'
                        open={cartOpen}
                        onClose = {() => setCartOpen(false)}
                  >
                        <Cart 
                              cartItems = {cartItems}
                              totalAmount = {totalAmount}
                              addItemCount = {AddItemCount}
                              removeItemCount = {RemoveItemCount}
                        />
                  </Drawer>

                  <StyledButton onClick = {() => setCartOpen(true)}>
                        <Badge
                              badgeContent = {totalCartItems}
                        >
                              <ShoppingCartIcon />
                        </Badge>
                  </StyledButton>

                  <Grid
                        item container spacing = {4} 
                  >
                        {data?.map((currItem => 
                              <Grid item 
                                    key= {currItem.id}
                                    xs = {12}
                                    sm = {4}
                              >
                              
                                    <Item 
                                          Item = {currItem}
                                          handleAddToCart = {handleCart}
                                    />

                              </Grid>
                        ))}
                  </Grid>
            </Wrapper>
      );
}

export default App;
