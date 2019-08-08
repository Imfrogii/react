import React from 'react';
import For3Hours from './For3Hours';
import '../App.css';

class OneDayForecast extends React.Component {

  componentWillMount = async() =>{
    const all = this.props.getForecast;
    // console.log("1");
    // console.log(all);
    // const {index} = this.props;
    // const date = new Date(all[0].dt_txt).toLocaleString('ru', {
    //   month: 'long',
    //   day: 'numeric',
    // });
    // console.log(all);
    this.setState({
      temp:all[0].main.temp,
      rain:(all[0].rain)?all[0].rain["3h"]:null,
      // city:all[0].city.name,
      wind:all[0].wind.speed,
      pressure:all[0].main.pressure,
      date:all[0].dt_txt,
      img:all[0].weather[0].icon,
      description:all[0].weather[0].description,
      count: all.length,
      // about:all[Math.round(all.length/2)].weather[0].main,
      // date:date,
    })
  }

  render3Hours(){
    return this.props.getForecast.map(item=>{
      return(
      <For3Hours key={item.dt} weather = {item}/>
    )
  });
}
  // <p>Город {this.state.city}</p>
  // <p>Температура {this.state.temp-273}*C</p>
  // <p>Влажность {this.state.humidity}%</p>
  // <p>Давление {this.state.pressure}мм.рт.ст</p>
  // <p>Ветер {this.state.wind}м/с</p>
  // <p>Восход</p>
  // <p>Закат</p>

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
export default OneDayForecast;
