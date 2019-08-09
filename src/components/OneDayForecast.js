import React from 'react';
import For3Hours from './For3Hours';
import '../App.css';
import PropTypes from 'prop-types'

class OneDayForecast extends React.Component {

  componentWillMount = async() =>{
    const all = this.props.getForecast;

    this.setState({
      temp:all[0].main.temp,
      rain:(all[0].rain)?all[0].rain["3h"]:null,
      wind:all[0].wind.speed,
      pressure:all[0].main.pressure,
      date:all[0].dt_txt,
      img:all[0].weather[0].icon,
      description:all[0].weather[0].description,
      count: all.length,
    });
  }

  render3Hours(){
    return this.props.getForecast.map(item=>{
      return(
      <For3Hours key={item.dt} weather = {item}/>
    )
  });
}

  render(){
    return (

        <div className="daily-forecast">
          <p><strong>{ new Date(this.state.date).toLocaleString('ru', {
                month: 'long',
                day: 'numeric',
              }) }
          </strong></p>
          <div className="all-day">
          {this.render3Hours()}
          </div>
        </div>
    )
  }
}

OneDayForecast.propTypes= {
  getForecast: PropTypes.array,
}

export default OneDayForecast;
