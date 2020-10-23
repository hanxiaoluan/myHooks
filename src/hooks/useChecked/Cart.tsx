import React from 'react'
import cartData from './data'
import CartItem from './CartItem'
import useChecked from './useChecked'
const Cart = () => {
	const { checkedMap, checkedAll, onCheckAllChange, onCheckedChange, filterChecked } = useChecked(cartData)
	const onWrapCheckedAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onCheckAllChange(e.target.checked)
	}
	const sumPrice = filterChecked()
		.reduce((pre, cur) => pre + cur.price, 0)
	return (
		<div>
			<ul>
				{cartData.map((cartItem) => {
					const { id } = cartItem
					const checked = checkedMap[id] || false
					return <CartItem key={id} cartItem={cartItem} checked={checked} onCheckedChange={onCheckedChange}/>
				})}
			</ul>
			<div><input type="checkbox" name="" id="" checked={checkedAll} onChange={onWrapCheckedAllChange} /> 全选/反选   总价:{sumPrice}</div>
		</div>
	)
}
export default Cart