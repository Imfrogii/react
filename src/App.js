import React from 'react';
import Header from './components/Header';
import Forecast4Days from './components/Forecast4Days';
import OneDayForecast from './components/OneDayForecast';
import ForecastNow from './components/ForecastNow';
import Maps from './components/Map';
import Links from './components/Links';
import Footer from './components/Footer';
import './App.css';
import './assets/global.css'
import { Link, Element} from 'react-scroll'
class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      ready:false,
      api: "OpenWeather",
    };
    this.latitude = undefined;
    this.longitude = undefined;
  }

    componentDidMount = async (position) => {
      let timeNow = Date.now();
      if(!localStorage["time"])
        localStorage.setItem("time","10");
      if((timeNow-localStorage.getItem("time"))/3600000>=2){
        // alert("Запрос местоположения")
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(this.getForecast, this.error);
        } else {
          alert("Your browser is not able to use geolocation");
          this.getForecast({coords:{
            latitude:55.77,
            longitude:37.6,
          }});
        }
      }
      else{
        // alert("Без запроса местоположения");
        let pos = {};
        pos.latitude = localStorage.getItem("latitude");
        pos.longitude = localStorage.getItem("longitude");
        this.getForecast(pos);
      }
      if(localStorage.getItem("api")!=="OpenWeather")
        this.changeApi();
    }
    error = async(error) =>{
      if (error.code !== 0) {
        alert("We have some problems with your position");
        this.getForecast({coords:{
          latitude:55.77,
          longitude:37.6,
        }});
      }
    };

    getForecast = async(position)=>{
      const allForecast = await this.getForecastServer(position.coords);
      const allForecastOpenWeather = allForecast[0];
      const currentApixu = this.prepareCurrentApixu(allForecast[1]);
      const time = new Date(allForecastOpenWeather.list[0].dt_txt);
      const num = ((24-time.getHours())/3);
      this.setState({
        weather: allForecastOpenWeather,
        weatherApixu: allForecast[1],
        currentApixu: currentApixu,
        ready:true,
        num:num,
      });
    }

    getForecastServer=async(position)=>{
      let forecastOpenWeather;
      let forecastApixu;
      let timeNow = Date.now();

      if(!localStorage["time"])
        localStorage.setItem("time","10");
      if((timeNow-localStorage.getItem("time"))/3600000>=2){
        // alert("Запрос на сервер")
        this.latitude = position.latitude;
        this.longitude = position.longitude;
        let apiForecastOpenWeather = await fetch
              (`http://api.openweathermap.org/data/2.5/forecast?lat=${this.
                latitude}&lon=${this.longitude}&appid=${process.env.REACT_APP_API_KEY_OPENWEATH}`);
        forecastOpenWeather = await apiForecastOpenWeather.json();
        localStorage.setItem("forecastOpenWeather", JSON.stringify(forecastOpenWeather));

        let apiForecastApixu = await fetch
              (`http://api.apixu.com/v1/forecast.json?key=${process.env.
                REACT_APP_API_KEY_APIXU}&q=${this.latitude},${this.longitude}&days=4`)
        forecastApixu = await apiForecastApixu.json()
        localStorage.setItem("forecastApixu", JSON.stringify(forecastApixu));
        localStorage.setItem("latitude", this.latitude);
        localStorage.setItem("longitude", this.longitude);
        localStorage.setItem("api", this.state.api);
      }
      else{
        // alert("Без запроса на сервер")
        forecastOpenWeather = JSON.parse(localStorage.getItem("forecastOpenWeather"));
        forecastApixu = JSON.parse(localStorage.getItem("forecastApixu"));
        this.latitude = Number(localStorage.getItem("latitude"));
        this.longitude = Number(localStorage.getItem("longitude"));
        this.setState({
          api: localStorage.getItem("api"),
        });

      }
      localStorage.setItem("time", timeNow);

      // localStorage.removeItem("time");
      // localStorage.removeItem("forecastOpenWeather");
      // localStorage.removeItem("forecastApixu");
      // localStorage.removeItem("latitude");
      // localStorage.removeItem("longitude");

      return [forecastOpenWeather, forecastApixu];
    }

    changeApi=(event)=>{
      if(event){
        this.setState({
          api: (localStorage.getItem("api")==="Apixu")?"OpenWeather":"Apixu",
        },()=>{
          localStorage.setItem("api", this.state.api);
        });
      }
      else{
        this.setState({
          api: localStorage.getItem("api"),
        },()=>{
          localStorage.setItem("api", this.state.api);
        });
      }
      localStorage.setItem("api", this.state.api);
      if(!document.body.classList.contains("apixuImg"))
      document.body.classList.add("apixuImg");
      else
        document.body.classList.remove("apixuImg");
      document.body.style.transition= "background 0.4s ease-out";
    }

    prepareCurrentApixu=(allForecastApixu)=>{
      let newApixu = {
        main : {
          temp:allForecastApixu.current.temp_c,
          humidity:allForecastApixu.current.humidity,
          pressure:allForecastApixu.current.pressure_mb,
        },
        wind : {
          speed:Math.round(allForecastApixu.current.wind_kph/0.36)/10,
          deg:allForecastApixu.current.wind_degree,
        },
        weather:[{
          icon:allForecastApixu.current.condition.icon,
          description:allForecastApixu.current.condition.text,
        }],
        date:allForecastApixu.current.last_updated,
      };
      return newApixu;
    }

    prepare4DaysApixu=(allForecastApixu)=>{
      let newApixu = [{
        main : {
          temp_max:allForecastApixu.day.maxtemp_c+273,
          temp_min:allForecastApixu.day.mintemp_c+273,
          humidity:allForecastApixu.day.avghumidity,
          pressure:allForecastApixu.day.pressure_mb,
        },
        wind : {
          speed:Math.round(allForecastApixu.day.wind_kph/0.36)/10,
          deg:allForecastApixu.day.wind_degree,
        },
        weather:[{
          icon:allForecastApixu.day.condition.icon,
          description:allForecastApixu.day.condition.text,
        }],
        dt_txt:allForecastApixu.date,
        rain:{
          "3h":(allForecastApixu.day.totalprecip_mm)?allForecastApixu.day.totalprecip_mm:null,
        },
      }];
      return newApixu;
    }

  renderApixu = () =>{
    return(

      <div className={"full-forecast-apixu not"+this.state.api}>
        <div className="now-and-map">
          <div className="forecast-and-now">
            <div className="forecast-4Days" >
              {this.state.weatherApixu.forecast.forecastday.map((day)=>
              <a href="#" key={day.date}>
                <Forecast4Days getForecast={this.prepare4DaysApixu(day)}/>
              </a>)}
            </div>
            <ForecastNow getForecast={this.state.currentApixu}
               city={this.state.weatherApixu.location.name}/>
          </div>
          <p></p>
          <Maps latitude={this.latitude} longitude={this.longitude}/>
        </div>
      </div>

    )
  }

  renderMainForecast = () => {
    return(
      <div className="main-forecast">
        <span><strong> Погода на 5 дней подробно</strong></span>
        <Element name="section1"><OneDayForecast getForecast=
          {this.state.weather.list.slice(0,this.state.num)}/></Element>
         <Element name="section2"><OneDayForecast id="section2" getForecast=
          {this.state.weather.list.slice(this.state.num,this.state.num+8)}/></Element>
        <Element name="section3"><OneDayForecast getForecast=
          {this.state.weather.list.slice(this.state.num+8,this.state.num+16)}/></Element>
        <Element name="section4"><OneDayForecast getForecast=
          {this.state.weather.list.slice(this.state.num+16,this.state.num+24)}/></Element>
        <Element name="section5"><OneDayForecast getForecast=
          {this.state.weather.list.slice(this.state.num+24,this.state.num+32)}/></Element>
      </div>
    )
  }

  render(){
    if(!this.state.ready) return false;
    return(
      <div>
        <Header cityOpenWeather={this.state.weather.city.name}
           cityApixu={this.state.weatherApixu.location.name} changeApi={this.changeApi} api={this.state.api}/>
        <div className={"full-forecast-openWether no"+this.state.api}>
          <div className="now-and-map">
            <div className="forecast-and-now">
              <div className="forecast-4Days">
                <Links to="section1"><Forecast4Days getForecast=
                  {this.state.weather.list.slice(0,this.state.num)}/></Links>
                <Links to="section2"><Forecast4Days getForecast=
                  {this.state.weather.list.slice(this.state.num,this.state.num+8)}/></Links>
                <Links to="section3"><Forecast4Days getForecast=
                  {this.state.weather.list.slice(this.state.num+8,this.state.num+16)}/></Links>
                <Links to="section4"><Forecast4Days getForecast=
                  {this.state.weather.list.slice(this.state.num+16,this.state.num+24)}/></Links>
              </div>
              <ForecastNow getForecast={this.state.weather.list[0]} city={this.state.weather.city.name}/>
            </div>
            <p></p>
            <Maps latitude={this.latitude} longitude={this.longitude}/>
          </div>
          {this.renderMainForecast()}
        </div>
        {this.renderApixu()}
        <Footer />
      </div>
    );
  }
}

export default App;
