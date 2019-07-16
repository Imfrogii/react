import React, {useContext} from 'react';
import Header from './components/header';
import Forecast4Days from './components/forecast4Days';
import MainForecast from './components/MainForecast';
import ForecastNow from './components/ForecastNow';
import Maps from './components/map';
import './App.css';
import {Context} from "./Context";

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      ready:false,
      weather:undefined,
    };
  }

    componentDidMount = async () => {
      const allForecast = await this.getForecast();
      const time = new Date(allForecast.list[0].dt_txt);
      const num = ((24-time.getHours())/3);
      this.setState({
        weather: allForecast,
        ready:true,
        num:num,
      });

    }

  getForecast=async()=>{
    let lat = 37;
    let lon = 55;
    let cnt = 1;
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
          <Maps getPosition={this.getPosition}/>
        </div>
        <div className="main-forecast">
          <MainForecast getForecast={this.state.weather}/>
        </div>
      </div>

  );
}
}

export default App;
