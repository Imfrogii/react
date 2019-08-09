import React from 'react';
import '../App.css';
import PropTypes from 'prop-types'

class Forecast4Days extends React.Component {

  componentWillMount = () =>{
    const all = this.props.getForecast;
    const date = new Date(all[0].dt_txt).toLocaleString('ru', {
      month: 'long',
      day: 'numeric',
    });
    const index = Math.floor(all.length/2);
    if(all.length>=5){
      this.setState({
        tempDay:all[index].main.temp_max,
        tempNigth:all[all.length-1].main.temp_min,
        rain:(all[index].rain)?all[index].rain["3h"]:null,
        wind:all[index].wind.speed,
        pressure:all[index].main.pressure,
        img:`http://openweathermap.org/img/wn/${all[index].weather[0].icon}@2x.png`,
        description:all[index].weather[0].description,
        date:date,
      });
    }
    else
    this.setState({
      tempDay:all[0].main.temp_max,
      tempNigth:all[all.length-1].main.temp_min,
      rain:(all[0].rain)?all[0].rain["3h"]:null,
      wind:all[0].wind.speed,
      pressure:all[0].main.pressure,
      img:(all[0].weather[0].icon.length<6)?`http://openweathermap.org/img/wn/${all[0].weather[0].icon}@2x.png`:all[0].weather[0].icon,
      description:all[0].weather[0].description,
      date:date,
    });
  }

  render(){
    return (
      <div className="forecast">
        <div className="date">{this.state.date}</div>
        <img className="imga" src={this.state.img} alt="forecast"/>

          <div className="temp-day"><strong>{(this.state.tempDay>273)?"+":""}{Math.round(this.state.tempDay-273)}</strong>°С</div>
          <div className="temp-nigth"><strong>{(this.state.tempNigth>273)?"+":""}{Math.round(this.state.tempNigth-273)}</strong>°С</div>

        <div className="rain">{(this.state.rain)?Math.round(this.state.rain*10)/10+"мм":""}</div>
      </div>
    );
  }
}

Forecast4Days.propTypes= {
  getForecast: PropTypes.array,
}

export default Forecast4Days;
