import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles.jsx";

const CartIcon = () =>{
    const {isCartOpen, setIsCartOpen , cartCount} = useContext(CartContext);
    const toggleCartDropdown = () =>{
        setIsCartOpen(!isCartOpen)
    }

    return(
        <CartIconContainer className="cart-icon-container" onClick={toggleCartDropdown}>
            <ShoppingIcon className="shopping-icon"/>
            <ItemCount className="item-count">{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;