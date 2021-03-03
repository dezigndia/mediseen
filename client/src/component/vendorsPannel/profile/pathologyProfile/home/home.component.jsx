import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './home.styles.scss';

import xlsx from 'xlsx';

//importing jss
import { blue } from '../../../../../assets/globalJSS';

//importing services 
import { GET_TEST_AND_PRODUCTS, ADD_BULK_TEST } from '../../../../../services/services';

//importing reusable components
import InfoCard from '../../../../reusableComponent/infoCard/infoCard.component.';
import Icon from '../../../../reusableComponent/icon/icon.component';
import ProductAndTestListing from '../../../../reusableComponent/productAndTestListing/productAndTestListing.component';
import RegistrationFormButton from '../../../../reusableComponent/registrationFormButton/registrationFormButton.component';

//importing icon
import { MdLocalOffer } from 'react-icons/md';
import { FaUpload } from 'react-icons/fa';

//importing custom components
import AddTest from './addTest/addTest.component';

const Home = () => {
    const currentVendor = useSelector(state => state.currentVendor);
    const auth_token = useSelector(state => state.token);
    const [testCategories, setTestCategories] = useState([]);
    const [showAddTests, setShowAddTests] = useState(false);
    const [excelData, setExcelData] = useState(null);
    const excelUploadInputRef = useRef(null);

    const changeHandler = (e) => {
        setExcelData(e.target.files[0]);
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(e.target.files[0]);
        fileReader.onload = (event) => {
            let data = event.target.result;
            let workBook = xlsx.read(data, { type: 'binary' });
            let result = [];
            //console.log(workBook);
            workBook.SheetNames.forEach(sheet => {
                result.push(xlsx.utils.sheet_to_row_object_array(workBook.Sheets[sheet]));
            });
            //console.log(result[0]);
            axios
                .post(ADD_BULK_TEST, result[0], {
                    headers: {
                        'Authorization': `Bearer ${auth_token.accessToken}`
                    }
                })
                .then(res => {
                    console.log(res.data.payload);
                    setTestCategories(prevState => [...prevState, ...result[0]]);
                })
                .catch(err => {
                    console.log(err);
                    alert('cant add tests in bulk');
                });
        };
    }

    useEffect(() => {
        axios
            .get(GET_TEST_AND_PRODUCTS, {
                headers: {
                    'Authorization': `Bearer ${auth_token.accessToken}`
                }
            })
            .then(res => {
                setTestCategories(res.data.payload);
            })
            .catch(err => {
                alert("unable to fetch test categories");
                console.log(err);
            });
    }, [setTestCategories]);

    return (
        <div className="vendorHome">
            <div className="infoContainer">
                <InfoCard data={currentVendor} large />
            </div>
            <div className="vendorTestListContainer">
                <div className="vendorTestListHeader">
                    <Icon iconColor={blue}>
                        <MdLocalOffer />
                    </Icon>
                    <p>Offers</p>
                </div>
                <div className="vendorTestList">
                    {
                        testCategories.map(item => <ProductAndTestListing {...item} key={item._id} />)
                    }
                </div>
            </div>
            <div className="VendorHomePageButton">
                <button className="greenButton" onClick={(e) => { setShowAddTests(true) }}>Add Tests</button>
            </div>
            <div className="vendorHomeUploadExcel">
                <RegistrationFormButton
                    icon1={<FaUpload />}
                    label={[<p>Or upload test list excel to Mediseen Whatsaap</p>]}
                    onClick={(e) => { excelUploadInputRef.current.click(); }}
                />
                <input
                    type='file'
                    //accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    style={{ display: 'none' }}
                    ref={excelUploadInputRef}
                    onChange={changeHandler}
                />
            </div>
            {
                showAddTests ? <AddTest {...{ setShowAddTests, setTestCategories }} /> : null
            }
        </div>
    );
}

export default Home;
