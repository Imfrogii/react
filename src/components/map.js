import React from "react";
import "../App.css";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import {Context} from "../Context";
// let cord;

class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      coordinates: [55.751574, 37.573856],
    };
    this.mapData = {
      center: [55.751574, 37.573856],
      zoom: 9,
    };
    this.placeMark = {
      geometry: [56.848217, 53.236675]
    };
    this.cord={};

    this.showMap = this.showMap.bind(this);
    this.render = this.render.bind(this);
  }

  showMap(position) {
    let {latitude, longitude} = position.coords;
    this.placeMark = {
      geometry: [latitude, longitude]
    };
    this.cord = this.placeMark;
    this.mapData = {
      center: [latitude, longitude],
      zoom: 9,
    };
    this.setState({
      ready: true,
      coordinates: [latitude, longitude],
     });
     let coor = this.state.coordinates;
     this.props.callbackWeth(coor);
  }


  componentDidMount = async position => {
    if ("geolocation" in navigator) {
      let err = await function(error) {
        if (error.code !== 0) alert("We have some problems with your position");
      };
      navigator.geolocation.getCurrentPosition(this.showMap, err);
    } else alert("Your browser is not able to use geolocation");
  };


  render() {
    if (!this.state.ready) {
      return false;
    }
      return (
            // <Context.Provider value={{this.cord}}>
        <YMaps>
          <Map defaultState={this.mapData} className="y_map">
            <Placemark {...this.placeMark} />
          </Map>
        </YMaps>
        // </Context.Provider>
      );
    }
}
export default Maps;
