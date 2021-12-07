import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"

import locationReducer from "./location/locationReducer"
import tokenReducer from "./token/tokenReducer"
import loginReducer from "./login/loginReducer"
import searchReducer from "./search/searchReducer"
import availableTimingsReducer from "./availablity/availableTimingsReducer"
import doctorAndHospitalRegistration from "./doctorAndHospitalRegistration/doctorAndRegistrationReducer"
import paymentDetailsReducer from "./paymentDetails/paymentDetailsReducer"
import staffTimingReducer from "./staffTiming/staffTimingReducer"
import deliveryAndCollectionReducer from "./deliveryAndCollection/deliveryAndCollecrionReducer"
import addStaffReducer from "./addStaff/addStaffReducer"
import currentVendorReducer from "./currentVendor/currentVendorReducer"
import prescription from "./prescription/prescription-reducer"
import cart from "./cart/cartReducer"
import timing from "./book-timing/timingReducer"
import lab from "./lab/labReducer"
import myProductAndTestReducer from "./myProductsAndTests/myProductsAndTestReducer"
import currentStore from "./currentStore/currentStoreReducer"
import user from "./user/userReducer"
import patient from "./patient/patientReducer"

const rootReducer = combineReducers({
	location: locationReducer,
	user:user,
	token: tokenReducer,
	login: loginReducer,
	search: searchReducer,
	availableTimings: availableTimingsReducer,
	doctorAndHospitalRegistration: doctorAndHospitalRegistration,
	paymentDetails: paymentDetailsReducer,
	timingAndStaff: staffTimingReducer,
	deliveryAndCollection: deliveryAndCollectionReducer,
	addStaff: addStaffReducer,
	currentVendor: currentVendorReducer,
	myProductsAndTests: myProductAndTestReducer,
	prescription,
	cart,
	timing,
	lab,
})

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
)

export default store
