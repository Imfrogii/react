import React from 'react';
import '../components/Header.css';

let Header = (props) => {
  return (
    <header className="header">
    <div className="wrapper">
    <input type="checkbox" id="checkbox" />
    <label className={"label "+props.api} htmlFor="checkbox" onClick={props.changeApi}>{props.api}</label>
    </div>
      <ul>
        <li className="logo">Сегодня</li>
        <li className="logo">Завтра</li>
        <li className="logo">3 дня</li>
        <li className="logo">5 дней</li>
      </ul>
        <span className="city">{props.api==="Apixu"?props.cityApixu:props.cityOpenWeather}</span>

    </header>
  );
}

export default Header;
