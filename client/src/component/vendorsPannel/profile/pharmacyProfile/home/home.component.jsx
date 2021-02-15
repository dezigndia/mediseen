import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './home.styles.scss';

///importing jss
import { blue } from '../../../../../assets/globalJSS';

//importing services 
import { GET_PRODUCTS_CATEGORY } from '../../../../../services/services';

//importing reusable components
import InfoCard from '../../../../reusableComponent/infoCard/infoCard.component.';
import Icon from '../../../../reusableComponent/icon/icon.component';
import ProductAndTestListing from '../../../../reusableComponent/productAndTestListing/productAndTestListing.component';

//importing icon
import { MdLocalOffer } from 'react-icons/md';

const Home = () => {
    const currentVendor = useSelector(state => state.currentVendor);
    const [productCategories, setProductCategories] = useState([]);

    useEffect(() => {
        axios
            .get(GET_PRODUCTS_CATEGORY)
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
                <div className="vendorProductList" onWheel={(e) => { e.preventDefault(); e.stopPropagation(); e.target.scrollLeft += parseInt(e.deltaY); console.log(e.deltaY + e.target.scrollLeft); }}>
                    {
                        productCategories.map(item => <ProductAndTestListing {...item} key={item._id} />)
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;