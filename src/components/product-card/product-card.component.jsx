import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import "./product-card.styles.scss";
import Button, { BUTTON_TYPES } from "../button/button.component";
const ProductCard = ({product})=>{
    const {name, price, imageUrl} = product;
    const {addItemToCart} = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product)
    return(
        <div className="product-card-container">
            <img src={imageUrl} alt=""/>
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType={BUTTON_TYPES.inverted} onClick={addProductToCart} >Add to cart</Button>
        </div>
    )
}

export default ProductCard;
