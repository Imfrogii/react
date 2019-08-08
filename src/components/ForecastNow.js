import React from 'react';
import '../App.css';

class ForecastNow extends React.Component {

  componentWillMount = async() =>{
    let all = this.props.getForecast;
    this.setState({
      temp:all.main.temp<100?all.main.temp+273:all.main.temp,
      humidity:all.main.humidity,
      city:this.props.city,
      windSpeed:all.wind.speed,
      windDeg:all.wind.deg,
      pressure:all.main.pressure,
      date:all.dt_txt,
      img:(all.weather[0].icon.length<6)?`http://openweathermap.org/img/wn/${all.weather[0].icon}@2x.png`:all.weather[0].icon,
      description:all.weather[0].description,
    });
  }

  render(){
    return (
        <div className="all-weather-now">
          <h3 className="weather-in">Сейчас в {this.state.city}</h3>
          <div className="weather-now">
            <img src={this.state.img} alt="description"/>
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
