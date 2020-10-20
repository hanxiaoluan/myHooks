const cartData = Array(5).fill(undefined).map((item, index) => ({ id: index, name: `商品${index}`, price: Math.round(Math.random() * 300) }))

export default cartData