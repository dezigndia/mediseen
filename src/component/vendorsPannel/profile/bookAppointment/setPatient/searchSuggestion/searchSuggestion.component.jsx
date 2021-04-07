import React from 'react';
import './searchSuggestion.styles.scss';

const SearchSuggestion=({searchResult,onClick})=>{
    return (
        <div className="searchSuggestionContainer">
           {
               searchResult.length && searchResult.map((item,index)=>
                   <div className="searchSuggestion" key={index} onClick={()=>onClick(item)}>
                       <div className="suggestedPatientName">
                            {item.firstName+ ' ' + item.lastName}
                       </div>
                       <div className="suggestedPatientDOB">
                            {item.gender}
                       </div>
                       <div className="suggestedPatientMobileNumber">
                            {item.mobileNumber}
                       </div>
                   </div>
               )
           }
        </div>
    );
}

export default SearchSuggestion;