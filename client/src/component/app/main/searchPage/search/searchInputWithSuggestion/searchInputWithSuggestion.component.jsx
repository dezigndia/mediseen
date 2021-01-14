import React, { useEffect, useRef } from 'react';
import './searchInputWithSuggestion.styles.scss';

import { AiOutlineSearch } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import { BiBook } from 'react-icons/bi';

//reusable component
import Icon from '../../../../../reusableComponent/icon/icon.component';

const SearchesAndSuggestions = ({ label, children, setSearchInput, blurHandler }) => {
    return (
        <div className="searchesAndSuggestion" onClick={(e) => { setSearchInput(label); blurHandler(); }}>
            {children}
            <p>
                {label}
            </p>
        </div>
    );
}

const SearchInputWithSuggestion = ({ recentSearches, searchInput, changeHandler, blurHandler, setSearchInput }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef) {
            inputRef.current.focus();
        }
    });

    return (
        <div className="searchInputContainer">
            <div>

                <div className="searchInput">
                    <Icon>
                        <BiArrowBack />
                    </Icon>
                    <input value={searchInput} onChange={changeHandler} ref={inputRef} />
                    <Icon onClick={blurHandler}>
                        <AiOutlineSearch />
                    </Icon>
                </div>

                <div className="recentSearchesAndSuggestion searches">
                    <p>Recent Search</p>
                    {
                        recentSearches.map((item, index) =>
                            <SearchesAndSuggestions key={index} label={item} setSearchInput={setSearchInput} blurHandler={blurHandler}>
                                <Icon size='16px' iconColor='#ccc'>
                                    <BsSearch />
                                </Icon>
                            </SearchesAndSuggestions>
                        )
                    }
                </div>

                <div className="recentSearchesAndSuggestion suggestion">
                    <p>Suggestion</p>
                    {
                        recentSearches.map((item, index) =>
                            <SearchesAndSuggestions key={index} label={item} setSearchInput={setSearchInput} blurHandler={blurHandler}>
                                <Icon size='16px' iconColor='#ccc'>
                                    <BiBook />
                                </Icon>
                            </SearchesAndSuggestions>
                        )
                    }
                </div>

            </div>
        </div>
    );
}

export default SearchInputWithSuggestion; 