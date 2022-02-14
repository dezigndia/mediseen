import React, { useCallback ,useEffect,useState} from 'react';
import './ListHospitals.styles.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';

//custom component
import DoctorAndHospitalRegistrationForm from '../../../../registration/doctorAndHospitalRegistrationForm/doctorAndHospitalRegistrationForm.component';


// //importing reusable components
import VendorsProfileSettingButton from '../../../../../reusableComponent/vendorsProfileSettingButton/vendorsProfileSettingButton.component';
//importing reusable components
import InfoCard from '../infoCard/infoCard.component.';
//importing icons
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BiWallet } from 'react-icons/bi';
import { FaLanguage, FaAddressCard } from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';
import { GiScooter } from 'react-icons/gi';
import {BiLogOut} from 'react-icons/bi';

//importing actions
import {
    setName,
    setPhoneNumber,
    setAddress,
    setDegree,
    setTimeSlotForpatient,
    setFees,
    setTimings,
    setFeesCollectionOnAccountOf,
    setTeleconsulting,
    setCurrentVendor
} from '../../../../../../actions/action';

//importing services
import { UPDATE_REGISTERED_USER, GET_USER_DEETAIL_BY_TOKEN, GET_MATCHING_DOCTORS_LIST, GET_MATCHING_HOSPITAL_LISTS } from '../../../../../../services/services';

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];




const ListHospitals = (props) => {

let { history, match}=props;
    const [errorFields, setErrorFields] = useState({});
    const [suggestionList, setSuggestionList] = useState([]);
    const [selectedSuggestionId,setSelectedSuggestionId]=useState('');
    const currentVendor = useSelector(state => state.currentVendor);
    const auth_token = useSelector(state => state.token);

    useEffect(() => {
        let link = currentVendor.businessType === 'doctor' ? GET_MATCHING_HOSPITAL_LISTS : GET_MATCHING_DOCTORS_LIST;
        axios
            .get(link(currentVendor.name))
            .then(res => {
                setSuggestionList(res.data.payload);
            })
            .catch(err => {
                alert('cant fetch suggestion list');
                console.log(err);
            })
    }, [currentVendor]);

    const gotoAddHospital = useCallback((e) => {
        history.push(`/vendor/profile/setting/addHospital`);
        console.log(match.url)
    }, [history, match.url]);

    const gotoPaymentSetting = useCallback((e) => {
        history.push(`${match.url}/paymentSetting`);
    }, [history, match.url]);

    const logout=useCallback(()=>{
        localStorage.removeItem('currentVendor');
        localStorage.removeItem('token');
        history.push('/');
    },[history]);
    return (
        // <DoctorAndHospitalRegistrationForm />
        <>
            <div className="settingHome">
            <VendorsProfileSettingButton
                icon={<AiOutlineClockCircle />}
                label1='Add Hospital/Clinic & Timing'
                label2='Add Doctor pannel and visit timing'
                onClick={gotoAddHospital}
            />
         <div>
         {currentVendor && currentVendor.clinic.map(item =>
          <InfoCard data={item}/>)}
       
         </div>
        </div>
        </>
    );
}

export default ListHospitals;