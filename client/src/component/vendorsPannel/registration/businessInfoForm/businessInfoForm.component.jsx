import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './businessInfoForm.styles.scss';

//importing reusable components
import Icon from '../../../reusableComponent/icon/icon.component';

//importing icon
import { ImAttachment } from 'react-icons/im';

//importing routes
import { REGISTER_AS } from '../routes';

//importing services
import {
    REGISTER_AS_DOCTOR_LINK,
    REGISTER_AS_HOSPITAL_LINK,
    REGISTER_AS_PATHOLOGY_LINK,
    REGISTER_AS_PHARMACY_LINK
} from '../../../../services/services';

//importing action
import { setCurrentVendor } from '../../../../actions/action';

const HOSPITAL = 'hospital';
const PHARMACY = 'pharmacy';
const DOCTOR = 'doctor';
const PATHOLOGY = 'pathology';

class BusinessInfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            businessType: PHARMACY,
            businessName: '',
            address: '',
            area: '',
            pincode: '',
            street: '',
            city: '',
            state: '',
            title: 'Mr.',
            firstName: '',
            middleName: '',
            lastName: '',
            password: '',
            degree: '',
            specialist: '',
            documents: null,
            country: null
        }
        this.uploadDocumentRef = React.createRef();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // will only run if country is not set 
        return prevState.country
            ? {}
            : { country: nextProps.countryCode.name }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    clickUploadDocuments = (e) => {
        this.uploadDocumentRef.current.click()
    }

    setDocuments = (e) => {
        this.setState({ documents: e.target.files[0] });
    }

    setBusinessTypes = (e) => {
        this.setState({ businessType: e.target.innerHTML });
    }

    submitHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let postRequestLink = null;

        //selecting link
        if (this.state.businessType === HOSPITAL) {
            postRequestLink = REGISTER_AS_HOSPITAL_LINK;
        }
        else
            if (this.state.businessType === PATHOLOGY) {
                postRequestLink = REGISTER_AS_PATHOLOGY_LINK;
            }
            else
                if (this.state.businessType === PHARMACY) {
                    postRequestLink = REGISTER_AS_PHARMACY_LINK;
                }
                else
                    if (this.state.businessType === DOCTOR) {
                        postRequestLink = REGISTER_AS_DOCTOR_LINK;
                    }

        axios
            .post(postRequestLink, this.state)
            .then(res => {
                this.props.setCurrentVendor({ isRegistered: true, ...res.data.payload })
                console.log(res.data.payload);
            })
            .then(() => {
                let link = this.props.match.url.split('/');
                link.pop();
                link.push(REGISTER_AS);
                link = link.join('/');
                this.props.history.push(link);
            })
            .catch(err => {
                console.log(err);
                alert('something wnet wrong');
            })


    }

    render() {
        return (
            <div className="businessInfoFormContainer">
                <div className="businessInfoFormHeader">
                    <h2>Business Info</h2>
                </div>
                <form className="businessInfoForm">
                    <div className="businessType">
                        <p
                            className={`${this.state.businessType === PHARMACY ? 'active' : null}`}
                            onClick={this.setBusinessTypes}
                        >
                            {PHARMACY}
                        </p>
                        <p
                            className={`${this.state.businessType === HOSPITAL ? 'active' : null}`}
                            onClick={this.setBusinessTypes}
                        >
                            {HOSPITAL}
                        </p>
                        <p
                            className={`${this.state.businessType === DOCTOR ? 'active' : null}`}
                            onClick={this.setBusinessTypes}
                        >
                            {DOCTOR}
                        </p>
                        <p
                            className={`${this.state.businessType === PATHOLOGY ? 'active' : null}`}
                            onClick={this.setBusinessTypes}
                        >
                            {PATHOLOGY}
                        </p>
                    </div>
                    <div className="inputInfo">
                        <div className='businessInfo businessName businessInputContainer'>
                            <label htmlFor="business name">BusinessName</label>
                            <input
                                type='text'
                                id='businessName'
                                value={this.state.businessName}
                                onChange={this.changeHandler}
                                placeholder='Business Name'
                            />
                        </div>
                        <div className='businessInfo businessAddress businessInputContainer'>
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id='address'
                                value={this.state.address}
                                onChange={this.changeHandler}
                                placeholder='address'
                            />
                        </div>
                        <div className='businessInputContainer multipleInputs'>
                            <div className='businessInfo businessArea halfWidth'>
                                <label htmlFor="area">Area</label>
                                <input
                                    type='text'
                                    id='area'
                                    value={this.state.area}
                                    onChange={this.changeHandler}
                                    placeholder='area'
                                />
                            </div>
                            <div className='businessInfo businessPincode halfWidth'>
                                <label htmlFor="pin code">Pincode</label>
                                <input
                                    type='text'
                                    id='pincode'
                                    value={this.state.pincode}
                                    onChange={this.changeHandler}
                                    placeholder='pincode'
                                />
                            </div>
                            <div className='businessInfo businessStreet halfWidth'>
                                <label htmlFor="street">Street</label>
                                <input
                                    type='text'
                                    id='street'
                                    value={this.state.street}
                                    onChange={this.changeHandler}
                                    placeholder='street'
                                />
                            </div>
                            <div className='businessInfo businessCity halfWidth'>
                                <label htmlFor="city">City</label>
                                <input
                                    type='text'
                                    id='city'
                                    value={this.state.city}
                                    onChange={this.changeHandler}
                                    placeholder='city'
                                />
                            </div>
                        </div>
                        <div className="businessInfo businessInputContainer businessInfoState">
                            <label htmlFor="State">State</label>
                            <input
                                type='text'
                                id='state'
                                value={this.state.state}
                                onChange={this.changeHandler}
                                placeholder='state'
                            />
                        </div>
                        <div className='businessInputContainer firstNameInputContainer'>
                            <div className='businessInfo businessTitle'>
                                <label htmlFor="title">Title</label>
                                {/*<input
                                    type='text'
                                    id='title'
                                    value={this.state.title}
                                    onChange={this.changeHandler}
                                    placeholder='title'
                                />*/}
                                <select>
                                    <option>Mr.</option>
                                    <option>Mrs.</option>
                                </select>
                            </div>
                            <div className='businessInfo businessFirstName'>
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type='text'
                                    id='firstName'
                                    value={this.state.firstName}
                                    onChange={this.changeHandler}
                                    placeholder='first name'
                                />
                            </div>
                        </div>
                        <div className='businessInfo businessMiddleName businessInputContainer'>
                            <label htmlFor="Middle name">Middle Name</label>
                            <input
                                type='text'
                                id='middleName'
                                value={this.state.middleName}
                                onChange={this.changeHandler}
                                placeholder='middle name'
                            />
                        </div>
                        <div className='businessInfo BusinessLastName businessInputContainer'>
                            <label htmlFor="Last Name">Last Name</label>
                            <input
                                type='text'
                                id='lastName'
                                value={this.state.lastName}
                                onChange={this.changeHandler}
                                placeholder='last name'
                            />
                        </div>
                        <div className='businessInfo businessPassword businessInputContainer'>
                            <label htmlFor="Password">Password</label>
                            <input
                                type='text'
                                id='password'
                                value={this.state.password}
                                onChange={this.changeHandler}
                                placeholder='password'
                            />
                        </div>
                        <div className='businessInfo businessDegree businessInputContainer'>
                            <label htmlFor="degree">Degree</label>
                            <input
                                type='text'
                                id='degree'
                                value={this.state.degree}
                                onChange={this.changeHandler}
                                placeholder='degree'
                            />
                        </div>
                        <div className='businessInfo businessSpeciality businessInputContainer'>
                            <label htmlFor="Speciality">Speciality</label>
                            <input
                                type='text'
                                id='specialist'
                                value={this.state.speciality}
                                onChange={this.changeHandler}
                                placeholder='speciality'
                            />
                        </div>
                    </div>
                    <div className="uploadDocuments">
                        <label htmlFor="upload documents" onClick={this.clickUploadDocuments}>
                            <Icon iconColor='#ccc'>
                                <ImAttachment />
                            </Icon>
                            Upload Documents
                        </label>
                        <p>Doctor/Hospital Registration, Pharmacy FDA Registration, Pathology/Lab Registration</p>
                        <input type='file' ref={this.uploadDocumentRef} onChange={this.setDocuments} />
                    </div>
                    <div className="buttons" onClick={this.submitHandler}>
                        <button className='greenButton'>SUBMIT</button>
                    </div>
                </form>
            </div >
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentVendor: (payload) => dispatch(setCurrentVendor(payload))
});

export default connect(null, mapDispatchToProps)(BusinessInfoForm);