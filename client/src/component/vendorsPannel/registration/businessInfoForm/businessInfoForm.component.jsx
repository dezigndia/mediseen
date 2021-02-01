import React from 'react';
import './businessInfoForm.styles.scss';

//importing reusable components
import Icon from '../../../reusableComponent/icon/icon.component';

//importing icon
import { ImAttachment } from 'react-icons/im';


class BusinessInfoForm extends React.Component {
    constructor() {
        super();
        this.state = {
            businessType: null,
            businessName: '',
            address: '',
            area: '',
            pincode: '',
            street: '',
            city: '',
            title: '',
            firstName: '',
            middleName: '',
            lastName: '',
            password: '',
            degree: '',
            speciality: '',
            documents: null
        }
        this.uploadDocumentRef = React.createRef();
    }

    changeHandler = (e) => {
        this.setState({ [e.target.id]: e.target.value }, () => {
            console.log(this.state)
        });
    }

    render() {
        return (
            <div className="businessInfoFormContainer">
                <div className="businessInfoFormHeader">
                    <h2>Business Info</h2>
                </div>
                <form className="businessInfoForm">
                    <div className="businessType">
                        <p>Pharmacy</p>
                        <p>Hospital</p>
                        <p>Doctor</p>
                        <p>Lab</p>
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
                        <div className='businessInputContainer'>
                            <div className='businessInfo businessTitle'>
                                <label htmlFor="title">Title</label>
                                <input
                                    type='text'
                                    id='title'
                                    value={this.state.title}
                                    onChange={this.changeHandler}
                                    placeholder='title'
                                />
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
                                id='speciality'
                                value={this.state.speciality}
                                onChange={this.changeHandler}
                                placeholder='speciality'
                            />
                        </div>
                    </div>
                    <div className="uploadDocuments">
                        <label htmlFor="upload documents">
                            <Icon iconColor='#ccc'>
                                <ImAttachment />
                            </Icon>
                            Upload Documents
                        </label>
                        <input type='file' />
                    </div>
                    <div className="buttons">
                        <button className='greenButton'>SUBMIT</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default BusinessInfoForm;