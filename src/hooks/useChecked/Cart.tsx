import React from 'react'
import cartData from './data'
import CartItem from './CartItem'
import useChecked from './useChecked'
const Cart = () => {
    const { checkedMap, checkedAll, onCheckAllChange } = useChecked(cartData)
    const onWrapCheckedAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onCheckAllChange(e.target.checked)
    }
    return <div>
        <ul>
            {cartData.map((cartItem, index) => {
                const { id } = cartItem
                const checked = checkedMap[id] || false
                return <CartItem key={id} cartItem={cartItem} checked={checked} />
            })}
        </ul>
        <div><input type="checkbox" name="" id="" checked={checkedAll} onChange={onWrapCheckedAllChange} /> 全选/反选   总价:</div>
    </div>
}
export default Cart