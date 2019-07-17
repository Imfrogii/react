import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { number } from "prop-types";
// import sun from '../images/sun.png'

class Forecast4Days extends React.Component {
  state={
    tempDay:undefined,
    tempNight:undefined,
    rain:undefined,
    wind:undefined,
    pressure:undefined,
    date:undefined,
    img:undefined,
    description:undefined,
    date:undefined,
  }

  componentWillMount = () =>{
    const all = this.props.getForecast;
    const date = new Date(all[0].dt_txt).toLocaleString('ru', {
      month: 'long',
      day: 'numeric',
    });
    const index = Math.floor(all.length/2);
    console.log(all);
    if(all.length>=5){
      this.setState({
        tempDay:all[index].main.temp_max,
        tempNigth:all[all.length-1].main.temp_min,
        rain:(all[index].rain)?all[index].rain["3h"]:null,
        // city:all[0].city.name,
        wind:all[index].wind.speed,
        pressure:all[index].main.pressure,
        date:all[index].dt_txt,
        img:all[index].weather[0].icon,
        description:all[index].weather[0].description,
        date:date,
      });
    }
    else
    this.setState({
      tempDay:all[0].main.temp_max,
      tempNigth:all[all.length-1].main.temp_min,
      rain:(all[0].rain)?all[0].rain["3h"]:null,
      // city:all[0].city.name,
      wind:all[0].wind.speed,
      pressure:all[0].main.pressure,
      date:all[0].dt_txt,
      img:all[0].weather[0].icon,
      description:all[0].weather[0].description,
      date:date,
    })
  }

  render(){
    return (
      <div className="forecast">
        <div className="date">{this.state.date}</div>
        <img className="imga" src={`http://openweathermap.org/img/wn/${this.state.img}@2x.png`} alt="forecast"/>
        <div className="temp">
          <span className="temp-day">{(this.state.tempDay>273)?"+":""}{Math.round(this.state.tempDay-273)}</span>/
          <span className="temp-nigth">{(this.state.tempNigth>273)?"+":""}{Math.round(this.state.tempNigth-273)}°С</span>
        </div>
        <div className="rain">{(this.state.rain)?Math.round(this.state.rain*10)/10+"мм":""}</div>
      </div>
    );
  }
}
// Forecast4Days.propTypes = {
//   tempDay: React.PropTypes.number,
//   tempNight: React.PropTypes.number,
//   rain: React.PropTypes.number,
//   wind: React.PropTypes.number,
//   pressure: React.PropTypes.number,
//   date: React.PropTypes.string,
//   img: React.PropTypes.string,
//   description: React.PropTypes.string,
// }

export default Forecast4Days;
