import React from 'react';
import './productAndtestListing.styles.scss';

const ProductAndTestListing = ({ label, price }) => {
    return (
        <div className="vendorTestAndProductListItem">
            <div className="vendorTestAndProductListItemHeader">
                <div className="vendorTestAndProductListItemHeaderCount">
                    count
                </div>
                <div className="vendorTestAndProductListItemHeaderLabel">
                    label
                </div>
            </div>
        </div>
    );
}

export default ProductAndTestListing;