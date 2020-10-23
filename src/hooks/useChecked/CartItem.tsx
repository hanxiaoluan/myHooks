import React from 'react'


interface CartItemProps {
    cartItem: { id: number, price: number, name: string }
    checked: boolean
    // eslint-disable-next-line no-unused-vars
    onCheckedChange: (cartItem: {id: number, price: number, name: string}, checked: boolean)=> void
}
const CartItem: React.FC<CartItemProps> = ({ cartItem, checked, onCheckedChange }) => {
	const onCheckedChangeWrap = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = e.target
		onCheckedChange(cartItem, checked)
	}
	const { price, name } = cartItem
	return (
		<li>
			<input type="checkbox" name="" id="" checked={checked} onChange={onCheckedChangeWrap}/>
			<p>{name}</p>
			<p>售价：${price}</p>
		</li>
	)
}
export default CartItem