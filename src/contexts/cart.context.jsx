import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd)=>{
    const ItemAlreadyExists = cartItems.find((item)=>
        item.id === productToAdd.id
    )

    if(ItemAlreadyExists){
        return cartItems.map((cartItem)=>
            cartItem.id === productToAdd.id 
            ? {...cartItem,quantity: cartItem.quantity+1}
            : cartItem
        )
    }

    return[...cartItems,{...productToAdd, quantity:1}];
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    cartItems:[],
    addItemToCart: () =>{},
    cartCount: 0
});

export const CartProvider = ({children})=>{
    const [isCartOpen, setIsCartOpen] = useState();
    const [cartItems,setCartItems] = useState([]);
    const [cartCount,setCartCount] = useState(0);
    
    const addItemToCart = (productToAdd) =>{
        setCartItems(addCartItem(cartItems,productToAdd));
    }
    
    useEffect(()=>{
        const newCartCount = cartItems.reduce((total,cartItem)=>total+cartItem.quantity,0);
        setCartCount(newCartCount);
    },[cartItems])
    const value = {isCartOpen,setIsCartOpen, addItemToCart, cartItems, cartCount};
    return(<CartContext.Provider value={value}>{children}</CartContext.Provider>)
}