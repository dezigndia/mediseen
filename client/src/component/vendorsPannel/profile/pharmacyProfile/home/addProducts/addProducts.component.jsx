import React from 'react';
import './addProducts.styles.scss';

//importing custom components from pharmacy registration
import AddProducts from '../../../../registration/registerAsPharmacy/addProducts/addProducts.component';

const AddProduct = ({ setShowAddProducts }) => {
    return (
        <div className="addProductPharmacyProfileHome">
            <AddProducts {...{ setShowAddProducts }} />
        </div>
    );
}

export default AddProduct;