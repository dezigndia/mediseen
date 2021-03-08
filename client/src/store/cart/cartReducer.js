const initialState = []

const cart = (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
		case "ADD_CART_PRODUCT":
			console.log(payload)
			let isPresent = state.find((prod) => prod.item._id === payload._id)
			const product = {
				item: payload,
				qty: 1,
			}
			console.log(isPresent)
			if (!isPresent) {
				return [...state, product]
			} else {
				const newList = state.filter(
					(prod) => prod.item._id !== isPresent.item._id
				)
				isPresent.qty = isPresent.qty + 1
				return [...newList, isPresent]
			}

		case "REMOVE_CART_PRODUCT":
			let prod = state.find((prod) => prod.item.id === payload.id)
			if (prod.qty > 1) {
				const newList = state.filter(
					(product) => product.item._id !== prod.item._id
				)
				prod.qty = prod.qty - 1
				return [...newList, prod]
			} else if (prod.qty === 1) {
				const newList = state.filter(
					(product) => product.item._id !== prod.item._id
				)
				return [...newList]
			}
			break
		case "EMPTY_CART_PRODUCT": {
			return []
		}
		default:
			return state
	}
}

export default cart
