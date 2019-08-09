import React from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import PropTypes from 'prop-types'

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
      geometry: [56.848217, 53.236675],
      options:{
        draggable:false,
      },
    };
    this.cord={};

    this.showMap = this.showMap.bind(this);
    this.render = this.render.bind(this);
  }

  showMap(latitude, longitude) {
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
  }


  componentDidMount = async position => {
    this.showMap(this.props.latitude, this.props.longitude);
  };


  render() {
    if (!this.state.ready) {
      return false;
    }
      return (
        <YMaps>
          <Map defaultState={this.mapData} className="y_map">
            <Placemark {...this.placeMark} />
          </Map>
        </YMaps>
      );
    }
}

Maps.propTypes= {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
}

export default Maps;
