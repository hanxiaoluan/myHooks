import React from 'react'


interface CartItemProps {
    cartItem: { id: number, price: number, name: string }
    checked: boolean
}
const CartItem: React.FC<CartItemProps> = ({ cartItem, checked }) => {
    const { id, price, name } = cartItem
    return <li>
        <input type="checkbox" name="" id="" checked={checked} />
        <p>{name}</p>
        <p>售价：${price}</p>
    </li>
}
export default CartItem