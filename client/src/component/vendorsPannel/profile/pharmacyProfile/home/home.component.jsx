import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './home.styles.scss';

///importing jss
import { blue } from '../../../../../assets/globalJSS';

//importing services 
import { GET_TEST_AND_PRODUCTS } from '../../../../../services/services';

//importing reusable components
import InfoCard from '../../../../reusableComponent/infoCard/infoCard.component.';
import Icon from '../../../../reusableComponent/icon/icon.component';
import ProductAndTestListing from '../../../../reusableComponent/productAndTestListing/productAndTestListing.component';
import RegistrationFormButton from '../../../../reusableComponent/registrationFormButton/registrationFormButton.component';

//importing icon
import { MdLocalOffer } from 'react-icons/md';
import { FaUpload } from 'react-icons/fa';

//importing custom components
import AddProducts from './addProducts/addProducts.component';

const Home = () => {
    const currentVendor = useSelector(state => state.currentVendor);
    const auth_token = useSelector(state => state.token);
    const [productCategories, setProductCategories] = useState([]);
    const [showAddProducts, setShowAddProducts] = useState(false);

    useEffect(() => {
        axios
            .get(GET_TEST_AND_PRODUCTS, {
                headers: {
                    'Authorization': `Bearer ${auth_token.accessToken}`
                }
            })
            .then(res => {
                setProductCategories(res.data.payload);
            })
            .catch(err => {
                alert("can't fetch products categories");
                console.log(err);
            })
    }, []);

    return (
        <div className="vendorHome">
            <div className="infoContainer">
                <InfoCard data={currentVendor} large />
            </div>
            <div className="vendorProductListContainer">
                <div className="vendorProductListHeader">
                    <Icon iconColor={blue}>
                        <MdLocalOffer />
                    </Icon>
                    <p>Products</p>
                </div>
                <div className="vendorProductList">
                    {
                        productCategories.map((item, index) => <ProductAndTestListing {...item} key={item._id} />)
                    }
                </div>
            </div>
            <div className="VendorHomePageButton">
                <button className="greenButton" onClick={(e) => { setShowAddProducts(true) }}>Add Products</button>
            </div>
            <div className="vendorHomeUploadExcel">
                <RegistrationFormButton
                    icon1={<FaUpload />}
                    label={[<p>Or upload closing stock excel to Mediseen Whatsaap</p>]}
                />
            </div>
            {
                showAddProducts ? <AddProducts {...{ setShowAddProducts }} /> : null
            }
        </div>
    );
}

export default Home;
