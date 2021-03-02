import React from 'react';
import './addTest.styles.scss';

//importing addTest component from pathology registration
import AddTest from '../../../../registration/registerAsPathology/addTest/addTest.component';

const AddTests = ({ setShowAddTests }) => {
    return (
        <div className="addTestPathologyProfileHome" >
            <AddTest {...{ setShowAddTests }} />
        </div>
    );
}

export default AddTests;