import React from 'react';
import '../App.css';

class MainForecast extends React.Component {
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
    // console.log(all);
    this.setState({
      temp:all.list[0].main.temp,
      humidity:all.list[0].main.humidity,
      city:all.city.name,
      windSpeed:all.list[0].wind.speed,
      windDeg:all.list[0].wind.deg,
      pressure:all.list[0].main.pressure,
      date:all.list[0].dt_txt,
      img:all.list[0].weather[0].icon,
      description:all.list[0].weather[0].description,
    })
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
      <div className="main-forecast">
        <span>Погода на 5 дней подробно</span>
        <div className="hourly-forecast">
          <p>Время {this.state.date}</p>

        </div>
      </div>
    )
  }
}
export default MainForecast;
