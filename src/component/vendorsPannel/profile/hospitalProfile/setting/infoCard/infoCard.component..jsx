import React from "react"
import { connect, useSelector } from "react-redux"
import "./infoCard.styles.scss"
import { withRouter } from "react-router-dom"

//importing actions
import { selectData ,setCurrentVendor} from "../../../../../../actions/action"
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
//importing icons
import { MdLocationOn } from "react-icons/md"
import { IconContext } from "react-icons"
import { RiStarSFill, RiWalletFill } from "react-icons/ri"
import { GrAdd } from "react-icons/gr"
import { BsCalendarFill } from "react-icons/bs"
import { IoLogoWhatsapp } from "react-icons/io"
import { DELETE_VENDOR_BY_ID,GET_VENDOR_DETAILS_BY_ID, GET_USER_DEETAIL_BY_TOKEN, GET_MATCHING_DOCTORS_LIST, GET_MATCHING_HOSPITAL_LISTS } from '../../../../../../services/services';

//verified logo
import logo from "./check.svg"
import {NotificationManager} from 'react-notifications';
import NotificationContainer from "react-notifications/lib/NotificationContainer"
//importing reusable component
import Icon from "../../../../../../component/reusableComponent/icon/icon.component"
import DeleteIcon from '@mui/icons-material/Delete';
//importing jss
import { green } from "../../../../../../assets/globalJSS"
// import { setCurrentVendor, updateAccessToken } from '../../../../../../actions/action';
const InfoCard = ({ data, reload,cancelTouch, history, stars = 5, closeBy = '10pm', distance = 3.3, small, selectData, large,setCurrentVendor }) => {
    const {
        _id,
        doctorId,
        firstName,
        address,
        name,
        status,
        teleConsulting,
        timePerSlot,
        lastName,
        businessName,
        businessType,
        type,
        photo,
        area,
        city,
        state,
        pincode,
        isVerified,
        //isActive,
        specialist
    } = data;
    const auth_token = useSelector(state => state.token);
    const gotoPage = (e) => {

   const dd= selectData(data)
   console.log(dd)
        if(doctorId){
            history.push(`/vendor/profile/setting/editHospital`);
          
        }
        // if (type === "doctor") {
        //     history.push(`/vendor/profile/setting/editHospital`);
        // } else if (type === "hospital") {
        //     history.push(`/home/hospitalBooking/${_id}`)
        // } else if (type === "pharmacy") {
        //     history.push(`/home/pharmacyOrder/${_id}`)
        // } else if (type === "pathology") {
        //     history.push(`/home/labOrder/${_id}`)
        // }
    }

    const gotoDelete = (e) => {
      selectData(data)
        axios.delete(DELETE_VENDOR_BY_ID(doctorId), {
            headers: {
                'Authorization': `Bearer ${auth_token.accessToken}`
            }
        }).then(res => {
            axios.get(GET_USER_DEETAIL_BY_TOKEN, {
                headers: {
                    'Authorization': `Bearer ${auth_token.accessToken}`
                }
            })
            .then(response => {
                setCurrentVendor(response.data.payload)
            }).catch(err => {console.log(err);alert('something went wrong2')});
            
                NotificationManager.success('success', 'Hospital Deleted !!', 2000, () => {
                });
            
        }).catch(err => {
            console.log(err);
            NotificationManager.error('error', 'something went wrong !!', 1000, () => {
            });
        });
}
           
    const share = (e, name) => {
        e.stopPropagation();
        e.cancellable = true;
        if (navigator.share) {
            navigator
				.share({
					title: `Mediseen - ${name}`,
					url: `www.mediseen.in/${name}`,
				})
				.then(() => {
					console.log('Thanks for sharing!');
				})
				.catch(() => {
					alert('something went wrong');
				});
        } else {
            alert('share permission not granted');
        }
    }

    return (
        <div className={`searchResultCard ${small ? 'small' : null} ${large ? 'large' : null} ${cancelTouch ? 'cancelTouch' : null}`} >
            <div className="name">
            {name  ?   <p>
                    {name}
                </p> :null}
            </div>
            <div className="edit" id={doctorId} onClick={gotoPage}>
               <EditIcon/>
            </div>
            <div className="delete"  id={doctorId} onClick={gotoDelete}>
               <DeleteIcon/>
            </div>
            <div className="avatar">
                {photo && <img src={photo} className='avatarImage' alt={`profile pic of ${firstName + lastName}`} />}
            </div>
            <div className="address">
                <p>{address}</p>
            </div>
            <div className="isVarified">
                {
                    isVerified ? <img src={logo} alt='verified' /> : null
                }
            </div>
            <div className="stars">
                <IconContext.Provider value={{ className: 'starIcons' }}>
                    {
                        (() => {
                            let starIcons = [];
                            for (let i = 0; i < stars; i++) {
                                starIcons.push(<RiStarSFill key={i} />);
                            }
                            return starIcons;
                        })()
                    }
                </IconContext.Provider>
            </div>
            <div className="distance">
                <IconContext.Provider value={{ className: 'distanceIcon' }}>
                    <MdLocationOn />
                </IconContext.Provider>
                <p>
                    {distance}
                </p>
            </div>
            {/* <div className="closeBy">
                <p>
                    close by {closeBy}
                </p>
            </div> */}
            {/* <div className="type">
                <div className="typeOption option1">
                    <p>Online Consulting</p>
                    <IconContext.Provider value={{ className: 'typeOptionIcon' }}>
                        <GrAdd />
                    </IconContext.Provider>
                </div>
                <div className="typeOption option2">
                    <p>Online Appointment</p>
                    <IconContext.Provider value={{ className: 'typeOptionIcon' }}>
                        <BsCalendarFill />
                    </IconContext.Provider>
                </div>
                <div className="typeOption option3">
                    <p>COD/UPI</p>
                    <IconContext.Provider value={{ className: 'typeOptionIcon' }}>
                        <RiWalletFill />
                    </IconContext.Provider>
                </div>
            </div> */}
            <div className="bio">
                {specialist}
            </div>
            <div className="location" style={{textTransform:'capitalize'}}>
                <p>{state}</p>
            </div>
            <div className="previewPersonalWebsite">
                <p>Preview Of Personal Website</p>
                <p>www.mediseen.in/{businessName}</p>
            </div>
            <div className="share">
                <Icon iconColor={green} size='40px' onClick={(e) => share(e, businessName)}>
                    <IoLogoWhatsapp />
                </Icon>
            </div>
        </div>
    );

}

const mapDispatchToProps = (dispatch) => ({
    selectData: (data) => dispatch(selectData(data)),
    setCurrentVendor: (payload) => dispatch(setCurrentVendor(payload))
})

export default connect(null, mapDispatchToProps)(withRouter(InfoCard))
