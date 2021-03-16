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
import LabAddAddress from "./labOrder/LabAddAddress"
import LabAbout from "./labOrder/LabAbout"
import LabBooking from "./labOrder/LabBooking"
import LabBookTime from "./labOrder/LabBookTime"
import LabConfirm from "./labOrder/LabConfirm"
import LabBook from "./labOrder/LabBook"
import LabSuccess from "./labOrder/LabSuccess"
import DocTiming from "./doctorBooking/DocTiming"
import DocCheckout from "./doctorBooking/DocCheckout"
import DoctorBook from "./doctorBooking/DoctorBook"
import DocSuccess from "./doctorBooking/DocSuccess"
import HosTiming from "./hospitalBooking/HosTiming"
import HospitalCheckout from "./hospitalBooking/HospitalCheckout"
import HospitalBook from "./hospitalBooking/HospitalBook"
import HosSuccess from "./hospitalBooking/HosSuccess"

const main = ({ match }) => {
	return (
		<main className="appMain">
			<Switch>
				<Route exact path={`${match.url}/`} component={Home} />

				<Route
					path={`${match.url}/doctorBooking/doc-timing`}
					component={DocTiming}
				/>
				<Route
					path={`${match.url}/doctorBooking/checkout`}
					component={DocCheckout}
				/>
				<Route
					path={`${match.url}/doctorBooking/book`}
					component={DoctorBook}
				/>
				<Route
					path={`${match.url}/doctorBooking/success`}
					component={DocSuccess}
				/>
				<Route
					path={`${match.url}/doctorBooking/:id`}
					component={DoctorBooking}
				/>
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
					path={`${match.url}/hospitalBooking/hos-timing`}
					component={HosTiming}
				/>
				<Route
					path={`${match.url}/hospitalBooking/book`}
					component={HospitalBook}
				/>
				<Route
					path={`${match.url}/hospitalBooking/success`}
					component={HosSuccess}
				/>
				<Route
					path={`${match.url}/hospitalBooking/checkout`}
					component={HospitalCheckout}
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
					path={`${match.url}/labOrder/add-address`}
					component={LabAddAddress}
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
			</Switch>
		</main>
	)
}

export default withRouter(main)
