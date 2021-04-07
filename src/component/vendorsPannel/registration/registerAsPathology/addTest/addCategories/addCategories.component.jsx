import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './addCategories.styles.scss';

//importing reusable components
import Icon from '../../../../../reusableComponent/icon/icon.component';

//importing icons 
import { AiOutlineClose } from 'react-icons/ai';

//importing services
import { ADD_CATEGORIES } from '../../../../../../services/services';

const AddCategories = ({ setShowAddCategories }) => {

    const [categoryName, setCategoryName] = useState('');
    const auth_token = useSelector(state => state.token);

    const addCategoriesHandler = (e) => {
        let data={
            type:'test-categories',
            data:[categoryName]
        }
        axios
            .post(ADD_CATEGORIES,data,{
                headers:{
                    'Authorization':`Bearer ${auth_token.accessToken}`
                }
            })
            .then(res=>{
                setShowAddCategories(false);
            })
            .catch(err=>{
                console.log(err);
                alert(`unable to add categories`);
            })
    }

    return (
        <div className="addCategoriesContainer">
            <div className="addCategories">
                <div className="closeAddCategories">
                    <Icon onClick={(e) => setShowAddCategories(false)} >
                        <AiOutlineClose />
                    </Icon>
                </div>
                <div className="categoryName">
                    <label htmlFor="category name">Enter category Name -</label>
                    <input type='text' value={categoryName} onChange={e => setCategoryName(e.target.value)} />
                </div>
                <div className="addCategoryButton">
                    <button className='greenButton' onClick={addCategoriesHandler}>Add</button>
                </div>
            </div>
        </div>
    );
}

export default AddCategories;