import React from "react"
import { Redirect, Route, Switch, withRouter } from "react-router-dom"
import "./main.styles.scss"

// importing custom components
import Home from "./home/home.component"
import DoctorBooking from "./doctorBooking/doctorBooking.component"
import PharmacyOrder from "./pharmacyOrder/pharmacyOrder.component"
import HospitalBooking from "./hospitalBooking/hospitalBooking.component"
import LabOrder from "./labOrder/labOrder.component"
import SearchPage from "./searchPage/searchPage.component"
import UploadPrescription from "./uploadPrescription/uploadPrescription.component"
import BookOrder from "./bookOrder/bookOrder.component"
import AboutPage from "./aboutPage/aboutPage.component"
import PharmOrderConfirm from "./pharmacyOrder/PharmOrderConfirm"
import PharmacyAbout from "./pharmacyOrder/PharmacyAbout"
import PharmOrderSuccess from "./pharmacyOrder/PharmOrderSuccess"
// import Checkout from "./pharmacyOrder/CheckoutPharm"
import PaymentPharm from "./pharmacyOrder/PaymentPharm"
import CheckoutPharm from "./pharmacyOrder/CheckoutPharm"
import PharmAddAddress from "./pharmacyOrder/PharmAddAddress"
import LabOrderConfirm from "./labOrder/LabOrderConfirm"
import LabAbout from "./labOrder/LabAbout"
import LabBooking from "./labOrder/LabBooking"
import LabBookTime from "./labOrder/LabBookTime"
import LabConfirm from "./labOrder/LabConfirm"
import LabBook from "./labOrder/LabBook"
import LabSuccess from "./labOrder/LabSuccess"

const main = ({ match }) => {
	return (
		<main className="appMain">
			<Switch>
				<Route exact path={`${match.url}/`} component={Home} />
				<Route path={`${match.url}/doctorBooking`} component={DoctorBooking} />
				<Route
					exact
					path={`${match.url}/pharmacyOrder/confirm`}
					component={PharmOrderConfirm}
				/>
				<Route
					exact
					path={`${match.url}/pharmacyOrder/checkout`}
					component={CheckoutPharm}
				/>
				<Route
					exact
					path={`${match.url}/pharmacyOrder/payment`}
					component={PaymentPharm}
				/>
				<Route
					exact
					path={`${match.url}/pharmacyOrder/confirm`}
					component={PharmOrderConfirm}
				/>
				<Route
					exact
					path={`${match.url}/pharmacyOrder/add-address`}
					component={PharmAddAddress}
				/>
				<Route
					exact
					path={`${match.url}/pharmacyOrder/success`}
					component={PharmOrderSuccess}
				/>
				<Route
					exact
					path={`${match.url}/pharmacyOrder/about`}
					component={PharmacyAbout}
				/>
				<Route
					path={`${match.url}/pharmacyOrder/:pharmId`}
					component={PharmacyOrder}
				/>
				<Route
					path={`${match.url}/hospitalBooking/:id`}
					component={HospitalBooking}
				/>
				<Route
					confirm
					path={`${match.url}/labOrder/confirm`}
					component={LabOrderConfirm}
				/>
				<Route
					confirm
					path={`${match.url}/labOrder/about/:labId`}
					component={LabAbout}
				/>
				<Route
					confirm
					path={`${match.url}/labOrder/info`}
					component={LabBooking}
				/>
				<Route
					confirm
					path={`${match.url}/labOrder/booking-time`}
					component={LabBookTime}
				/>
				<Route
					confirm
					path={`${match.url}/labOrder/checkout`}
					component={LabConfirm}
				/>
				<Route path={`${match.url}/labOrder/book`} component={LabBook} />
				<Route path={`${match.url}/labOrder/success`} component={LabSuccess} />
				<Route path={`${match.url}/labOrder/:labId`} component={LabOrder} />
				<Route path={`${match.url}/search/:category`} component={SearchPage} />
				<Route
					path={`${match.url}/uploadPrescription`}
					component={UploadPrescription}
				/>
				<Route path={`${match.url}/about/:id`} component={AboutPage} />
				<Route
					path={`${match.url}/bookOrder/:category/:subCategory`}
					component={BookOrder}
				/>
				<Redirect to="/404" />
			</Switch>
		</main>
	)
}

export default withRouter(main)
