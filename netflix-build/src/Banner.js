import React from 'react';
import './Banner.css'
function Banner() {

  function truncateText (string, n) {
    return string?.length > n ? string.substr(0,n-1) + '...' : string;
  }
  return (
    <header className="banner" style = {{
      backgroundSize: "cover",
      backgroundImage:`url("https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Black_flag.svg/1200px-Black_flag.svg.png")`,
      backgroundPosition:"center center"
    }}>
      <div className="banner__contents">
       <h1 className="banner__title">Title</h1>
       <div className="banner__buttons">
         <button className="banner__button">Play</button>
         <button className="banner__button">My list</button>
       </div>
       <h1 className="banner__description">
         {truncateText(
           `Test description that will be updated with fetched data. 
           Test description that will be updated with fetched data. 
           Test description that will be updated with fetched data. 
           Test description that will be updated with fetched data.
           Test description that will be updated with fetched data.
           Test description that will be updated with fetched data. 
           Test description that will be updated with fetched data. 
           Test description that will be updated with fetched data. 
           Test description that will be updated with fetched data. 
           Test description that will be updated with fetched data.`, 120)}
         </h1>
      </div>
      <div className="banner--fadeBottom"/>
    </header>
  );
}

export default Banner;