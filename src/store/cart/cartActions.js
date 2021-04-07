export const addCartProduct = (payload) => {
	return { type: "ADD_CART_PRODUCT", payload: payload }
}

export const removeCartProduct = (payload) => {
	return { type: "REMOVE_CART_PRODUCT", payload: payload }
}

export const emptyCartProduct = () => {
	return { type: "EMPTY_CART_PRODUCT" }
}
