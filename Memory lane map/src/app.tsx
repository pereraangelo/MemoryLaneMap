import React, { useEffect } from "react";
import Pin from "./components/Pin/Pin";
import { render } from "react-dom";
import Trips from "./data/holidays.json";
import ControlPanel from "./components/ControlPanel/Control-panel";
import Map, { MapRef, Marker, Popup } from "react-map-gl";
import { useRef, useCallback, useMemo, useState } from "react";
import { TRIP } from "./common";
const MAPBOX_TOKEN =
  "pk.eyJ1IjoicGVyZXJhYW5nZWxvIiwiYSI6ImNsMTdna2NlejAzeGIzY21tM244NGl3cHkifQ.TNQvuS714MDGDbQkEYlekQ"; // Set your mapbox token here

const initialViewState = {
  latitude: 7.2602,
  longitude: 80.652,
  zoom: 11,
  bearing: 0,
  pitch: 0,
};

export default function App() {
  const mapRef = useRef<MapRef>();
  const [info, setInfo] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [fiterdTrips, setFiterdTrips] = useState(Trips);
  const [viewState, setViewState] = React.useState(initialViewState);

  const onSelectCity = useCallback((props) => {
    setInfo(props);
    setPopupInfo(null);
    mapRef.current?.flyTo({
      center: [props.longitude, props.latitude],
      duration: 2000,
    });
  }, []);

  /*-------------Show pins the locations -------------*/
  const pins = useMemo(
    () =>
      fiterdTrips.map((trip: TRIP, index: number) => (
        <Marker
          key={`marker-${index}`}
          longitude={trip.longitude}
          latitude={trip.latitude}
          anchor="bottom"
        >
          <Pin onClick={() => setPopupInfo(trip)} />
        </Marker>
      )),
    [fiterdTrips]
  );

  /*-------------only show popups when zoom below 3 -------------*/
  useEffect(() => {
    if (viewState.zoom < 3) {
      setInfo(null);
      setPopupInfo(null);
    }
  }, [viewState.zoom]);

  return (
    <>
      <Map
        {...viewState}
        ref={mapRef}
        onMove={(evt) => setViewState(evt.viewState)}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <ControlPanel
          onSelectCity={onSelectCity}
          setFiterdTrips={(data) => setFiterdTrips(data)}
        />

        {pins}
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              <div>{popupInfo.location}</div>
              <div>{popupInfo.title}</div>
              <small>{popupInfo.description}</small>
            </div>
          </Popup>
        )}

        {info && (
          <Popup
            anchor="top"
            longitude={Number(info.longitude)}
            latitude={Number(info.latitude)}
            closeOnClick={false}
            onClose={() => setInfo(null)}
          >
            <div>
              <div>{info.location}</div>
              <div>{info.title}</div>
              <small>{info.description}</small>
            </div>
          </Popup>
        )}
      </Map>
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
