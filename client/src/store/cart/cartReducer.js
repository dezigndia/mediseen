const initialState = []

const cart = (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
		case "ADD_CART_PRODUCT":
			console.log(state)
			let isPresent = state.find((prod) => prod.item.id === payload.id)
			const product = {
				item: payload,
				qty: 1,
			}
			if (!isPresent) {
				console.log(...state, product)
				return [...state, product]
			} else {
				const newList = state.filter(
					(prod) => prod.item.id !== isPresent.item.id
				)
				console.log(newList)
				isPresent.qty = isPresent.qty + 1
				return [...newList, isPresent]
			}

		case "REMOVE_CART_PRODUCT":
			let prod = state.find((prod) => prod.item.id === payload.id)
			if (prod.qty > 1) {
				const newList = state.filter((prod) => prod.item.id !== prod.item.id)
				prod.qty = prod.qty - 1
				return [...newList, prod]
			} else if (prod.qty === 1) {
				const newList = state.filter((prod) => prod.item.id !== prod.item.id)
				return [...newList]
			}

		default:
			return state
	}
}

export default cart
