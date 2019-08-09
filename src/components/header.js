import React from 'react';
import '../components/Header.css';
import PropTypes from 'prop-types'

let Header = (props) => {
  return (
    <header className="header">
    <div className="wrapper">
    <input type="checkbox" id="checkbox" />
    <label className={"label "+props.api} htmlFor="checkbox" onClick={props.changeApi}>{props.api}</label>
    </div>
    <span className="text-line">Погода в Вашем городе</span>
    <span className="city">{props.api==="Apixu"?props.cityApixu:props.cityOpenWeather}</span>

    </header>
  );
}

Header.propTypes= {
  api: PropTypes.string,
  changeApi: PropTypes.func,
  cityOpenWeather: PropTypes.string,
  cityApixu: PropTypes.string,
}

export default Header;
