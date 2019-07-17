import React, {useContext} from 'react';
import Header from './components/header';
import Forecast4Days from './components/forecast4Days';
import OneDayForecast from './components/OneDayForecast';
import ForecastNow from './components/ForecastNow';
import Maps from './components/map';
import './App.css';
import {Context} from "./Context";
import PropTypes from 'prop-types';
let coord;
class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      ready:false,
      weather:undefined,
      lat:undefined,
      len:undefined,
      self:this,
    };
  }

    componentDidMount = async (position) => {
      alert(this.props.pos);
      const allForecast = await this.getForecast(position);
      const time = new Date(allForecast.list[0].dt_txt);
      const num = ((24-time.getHours())/3);
      this.setState({
        weather: allForecast,
        ready:true,
        num:num,
      });
    }


  callbackWeth(position){
    alert(position);
    coord = position;
    // console.log(this);
    //   this.setState({
    //     lat:cords[0],
    //     len:cords[1],
    //   });
  }

  getForecast=async()=>{
    let lat = 37;
    let lon = 55;
    let apiForecast = await fetch
          (`http://api.openweathermap.org/data/2.5/forecast?lat=${lon}&lon=${lat}&appid=${process
            .env.REACT_APP_apiKey}`);
    let forecast = await apiForecast.json();
        console.log(forecast);
    return forecast;

  }

  // getPosition=async position => {
  //   if ("geolocation" in navigator) {
  //     let err = await function(error) {
  //       if (error.code !== 0) alert("We have some problems with your position");
  //     };
  //     navigator.geolocation.getCurrentPosition(this.showMap, err);
  //   } else alert("Your browser is not able to use geolocation");
  // };




  render(){
    if(!this.state.ready) return false;
    else
    return(
      <div>
        <Header />
        <div className="now-and-map">
          <div className="forecast-and-now">
            <div className="forecast-4Days">
              <a href="#"><Forecast4Days getForecast={this.state.weather.list.slice(0,this.state.num)}/></a>
              <a href="#"><Forecast4Days getForecast={this.state.weather.list.slice(this.state.num,this.state.num+8)}/></a>
              <a href="#"><Forecast4Days getForecast={this.state.weather.list.slice(this.state.num+8,this.state.num+16)}/></a>
              <a href="#"><Forecast4Days getForecast={this.state.weather.list.slice(this.state.num+16,this.state.num+24)}/></a>
            </div>
            <ForecastNow getForecast={this.state.weather.list[0]} city={this.state.weather.city.name}/>
          </div>
          <p></p>
          <Maps callbackWeth={this.callbackWeth}/>
        </div>
        <div className="main-forecast">
          <span><strong> Погода на 5 дней подробно</strong></span>
          <OneDayForecast getForecast={this.state.weather.list.slice(0,this.state.num)} index={this.state.num}/>
          <OneDayForecast getForecast={this.state.weather.list.slice(this.state.num,this.state.num+8)} index={this.state.num}/>
          <OneDayForecast getForecast={this.state.weather.list.slice(this.state.num+8,this.state.num+16)} index={this.state.num}/>
          <OneDayForecast getForecast={this.state.weather.list.slice(this.state.num+16,this.state.num+24)} index={this.state.num}/>
          <OneDayForecast getForecast={this.state.weather.list.slice(this.state.num+24,this.state.num+32)} index={this.state.num}/>
        </div>
      </div>
  );
}
}

export default App;
