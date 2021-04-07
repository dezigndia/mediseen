import React from 'react';
import { useSelector } from 'react-redux';
import './totalCostDetails.styles.scss';

//importing icon
import { BiRupee } from 'react-icons/bi';

//importing reusable components
import Icon from '../../../../reusableComponent/icon/icon.component';

const TotalCostDetails = ({ totalItems, cost }) => {
    const deliveryDetails = useSelector(state => state.currentVendor.deliveryDetails);
    const collectionDetails = useSelector(state => state.currentVendor.collections);
    const businessType = useSelector(state => state.currentVendor.businessType);

    return (
        <div className="vendorTotalCostDetails">
            <div className="vendorPopupTotalItems">
                <div>Total Items:{totalItems}</div>
                <div>
                    <Icon>
                        <BiRupee />
                    </Icon>
                    <p>
                        {cost}
                    </p>
                </div>
            </div>
            <div className="vendorPopupDeliveryCharges">
                <div>Delivery Charges</div>
                <div>
                    <Icon>
                        <BiRupee />
                    </Icon>
                    {
                        businessType === 'pharmacy'
                            ? <p>
                                {deliveryDetails && deliveryDetails.deliveryCharges}
                            </p>
                            : <p>
                                {collectionDetails && collectionDetails.collectionChargesPerVisit}
                            </p>
                    }
                </div>
            </div>
            <div className="vendorPopupTotalCharges">
                <div>Grand Total</div>
                <div>
                    <Icon>
                        <BiRupee />
                    </Icon>
                    {
                        businessType === 'pharmacy'
                            ? <p>
                                {cost + (deliveryDetails && deliveryDetails.deliveryCharges)}
                            </p>
                            : <p>
                                {cost + (collectionDetails && collectionDetails.collectionChargesPerVisit)}
                            </p>
                    }
                </div>
            </div>
        </div>
    );
}

export default TotalCostDetails;