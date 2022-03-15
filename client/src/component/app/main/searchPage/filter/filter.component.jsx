import React, { useState, useCallback, useEffect } from "react"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import "./filter.styles.scss"

import fetchCall from "../../../../../fetchCall/fetchCall"

import { useSelector } from "react-redux"

//importing actions
import {
	setSearchCategory,
	setSearchFilterLocation,
	setSearchFilterSpeciality,
} from "../../../../../actions/action"
//importing categories
import { HOSPITAL, PHARMACY, PATHOLOGY, DOCTOR } from "../../categories"
//custom components
import CustomFilter from "./customFilter/customFilter.cmponent"
//importing icon
import { FaFilter } from "react-icons/fa"
//reusable component
import Icon from "../../../../reusableComponent/icon/icon.component"

const FilterItem = ({ label, highlight, category, setSearchCategory }) => {
	return (
		<Link to={`/home/search/${label}`}>
			<div className="filterItem" onClick={(e) => setSearchCategory(label)}>
				<div className={`filterLabel ${category === label ? "active" : null}`}>
					<p style={{ textTransform: "capitalize" }}>{label}</p>
				</div>
				{highlight ? (
					<div className="highlight">
						<p>{highlight}</p>
					</div>
				) : null}
			</div>
		</Link>
	)
}

const Filter = ({ match, setSearchCategory, category, query }) => {
	const [count, setCount] = useState({
		hospital: 0,
		doctor: 0,
		pharmacy: 0,
		phathology: 0,
	})

	const [all, setAll] = useState(0)

	const city = useSelector((state) => state.location.city)

	useEffect(() => {
		const fetchCount = async () => {
			const data = await fetchCall(`business/count?city=${city}`, "GET")

			setCount(data.data.payload)
		}

		if (city) {
			fetchCount()
		}
	}, [city])

	useEffect(() => {
		const all =
			count.doctor + count.hospital + count.pharmacy + count.phathology
		setAll(all)
	}, [count])

	const [showCustomFilterModal, setShowCustomFilterModal] = useState(false)

	const toggleCustomFilterModal = useCallback(() => {
		setShowCustomFilterModal((prevState) => !prevState)
	}, [setShowCustomFilterModal])

	useEffect(() => {
		setSearchCategory(match.params.category)
	}, [])

	return (
		<div className="filter">
			{/* <FilterItem label={"All"} {...{ category, setSearchCategory }} /> */}
			<FilterItem
				label={DOCTOR}
				highlight={count.doctor}
				{...{ category, setSearchCategory }}
			/>
			<FilterItem
				label={HOSPITAL}
				highlight={count.hospital}
				{...{ category, setSearchCategory }}
			/>
		
			<FilterItem
				label={PHARMACY}
				highlight={count.pharmacy}
				{...{ category, setSearchCategory }}
			/>
			<FilterItem
				label={PATHOLOGY}
				highlight={count.pathology}
				{...{ category, setSearchCategory }}
			/>
			{/* {query !== "" ? (
				<div className="customFilterButton">
					<Icon size="12px" onClick={toggleCustomFilterModal}>
						<FaFilter />
					</Icon>
					<p>Filter</p>
				</div>
			) : null} */}
			{showCustomFilterModal ? (
				<CustomFilter toggleCustomFilterModal={toggleCustomFilterModal} />
			) : null}
		</div>
	)
}

const mapStateToProps = (state) => ({
	category: state.search.category,
	query: state.search.query,
	filter: state.search.filter //{location:bool,speciality:bool,value:any}
})

const mapDispatchToProps = (dispatch) => ({
	setSearchCategory: (val) => dispatch(setSearchCategory(val)),
	setSearchFilterLocation: location => dispatch(setSearchFilterLocation(location)),
	setSearchFilterSpeciality: speciality=> dispatch(setSearchFilterSpeciality(speciality))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Filter))
