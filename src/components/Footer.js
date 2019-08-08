import React from 'react';
import '../App.css';
import apixuLogo from "../assets/apixu.png"
import openWeatherLogo from "../assets/openweather.png"


function Footer(props) {
  return (
    <footer className="footer">
      <div className="links">
        <p></p>
        <a href="https://www.apixu.com/"><img className="apixuLogo" src={apixuLogo} alt="Apixu"/></a>
        <a href="https://openweathermap.org/"><img className="openWeatherLogo" src={openWeatherLogo} alt="OpenWeather"/></a>
        <p></p>
      </div>
      <p></p>
      <span>Погода предоставлена исключительно для личного некоммерческого использования.</span>
      <p></p>
      <a className="mail" href="mailto:fpm.schelko@gmail.com">По вопросам сотрудничества</a>
      <span></span>
      <span>©2019 Все права защищены.</span>
    </footer>
  );
}

export default Footer;
