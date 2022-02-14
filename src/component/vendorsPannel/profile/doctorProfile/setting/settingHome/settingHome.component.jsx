import React, { useCallback } from 'react';
import './settingHome.styles.scss';

//importing icons
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BiWallet } from 'react-icons/bi';
import { FaLanguage, FaAddressCard } from 'react-icons/fa';
import {BiLogOut} from 'react-icons/bi';

//importing reusable components
import VendorsProfileSettingButton from '../../../../../reusableComponent/vendorsProfileSettingButton/vendorsProfileSettingButton.component';

const SettingHome = ({ history, match }) => {

    const gotoAddHospital = useCallback((e) => {
        history.push(`${match.url}/listHospital`);
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
        <div className="settingHome">
            <VendorsProfileSettingButton
                icon={<AiOutlineClockCircle />}
                label1='Add Hospital/Clinic & Timing'
                label2='Add Doctor pannel and visit timing'
                onClick={gotoAddHospital}
            />
            <VendorsProfileSettingButton
                icon={<BiWallet />}
                label1='PaymentSetting'
                label2='Option to receive online payment through upi or bank transfer'
                onClick={gotoPaymentSetting}
            />
            <VendorsProfileSettingButton
                icon={<FaLanguage />}
                label1='Change Language'
                label2='Set up your local language to access and communicate with customer'
            />
            <VendorsProfileSettingButton
                icon={<FaAddressCard />}
                label1='Website Profile'
                label2='Customize website for visitors with coverpage, images, signboard, logo, About you, Specialization'
            />
            <VendorsProfileSettingButton
                icon={<BiLogOut />}
                label1='Logout from the session'
                label2='logout out from the current session, all settings and info will be saved in server.'
                onClick={logout}
            />
        </div>
    );
}

export default SettingHome;