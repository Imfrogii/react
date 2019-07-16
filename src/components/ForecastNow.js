import React from 'react';
import '../App.css';

class ForecastNow extends React.Component {
  state={
    temp:undefined,
    rain:undefined,
    city:undefined,
    wind:undefined,
    pressure:undefined,
    date:undefined,
    img:undefined,
    description:undefined,
  }

  componentWillMount = async() =>{
    let all = this.props.getForecast;
    this.setState({
      temp:all.main.temp,
      humidity:all.main.humidity,
      city:this.props.city,
      windSpeed:all.wind.speed,
      windDeg:all.wind.deg,
      pressure:all.main.pressure,
      date:all.dt_txt,
      img:all.weather[0].icon,
      description:all.weather[0].description,
    })
  }

  render(){
    return (
        <div className="all-weather-now">
          <h3 className="weather-in">Сейчас в {this.state.city}</h3>
          <div className="weather-now">
            <img src={`http://openweathermap.org/img/wn/${this.state.img}@2x.png`} alt="description"/>
            <div className="main">
              <h1>{(this.state.temp>273)?"+":""}{Math.round(this.state.temp-273)}°С</h1>
              <p>{this.state.description}</p>
            </div>
            <div className="wind-pres">
              <p>Ветер: {this.state.windSpeed+" м/с"}, направление: {Math.round(this.state.windDeg)}°</p>
                <p>Влажность: {this.state.humidity}%</p>
                <p>Давление: {Math.round(this.state.pressure*0.75)+" мм.рт.ст"}</p>
            </div>
            <div className="sun-moon"></div>
          </div>
        </div>
    );
  }
}

export default ForecastNow;
