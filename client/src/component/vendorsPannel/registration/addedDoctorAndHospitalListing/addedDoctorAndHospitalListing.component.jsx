import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './addedDoctorAdnHospitalListing.styles.scss';

//importing reusable components
import infoCard from '../../../reusableComponent/infoCard/infoCard.component.';


const AddedDoctorAndHospitalList = (props) => {
    return (
        <div className="addedDoctorAndHospilatListContainer">
            {
                list.map(item)
            }
        </div>
    );
}

const mapStateToProps = state => {
    currentVendor: state.currentVendor;
}

export default connect(mapStateToProps)(AddedDoctorAndHospitalList);