import React, { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import './checkout-items.styles.scss';

const CheckoutItems = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { clearItemFromCart, addItemsToCart, removeItemFromCart } = useContext(CartContext);

    const clearItemHandler = () => clearItemFromCart(cartItem)

    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt=""/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div onClick={() => removeItemFromCart(cartItem)} className='arrow'>
                    &#10094;
                </div>
                <span className='value'>
                   {quantity} 
                </span>
                <div onClick={() => addItemsToCart(cartItem)}className='arrow'>
                   &#10095;
                </div>
            </span>
            <span className='price'>{price}</span>
            <div onClick={clearItemHandler} className='remove-button'>
                &#10005;
            </div>
        </div>
    )
}

export default CheckoutItems