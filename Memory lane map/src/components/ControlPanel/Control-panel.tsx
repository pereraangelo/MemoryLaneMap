import * as React from "react";
import { useState, useEffect } from "react";
import Trips from "../../data/holidays.json";
import Places from "../Places/Places";
import { filterTrips } from "../../Utils";
import { TRIP } from "../../common";

interface ControlPanelProps {
  onSelectCity?: (data: TRIP) => void;
  setFiterdTrips?: (data: any) => void;
}

function ControlPanel(props: ControlPanelProps) {
  const tabs = ["Bucket List","Holidays", "Swimmings", "Projects"];

  const [showFilters, setShowFilters] = useState(false);
  const [currentTrip, setCurrentTrip] = useState(Trips[0]);
  const [selectedTab, setSelectedTab] = useState("Bucket List");

  /*-------------Toggle Filter-------------*/
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    props.onSelectCity(filterTrips(Trips, selectedTab)[0]);
    setCurrentTrip(filterTrips(Trips, selectedTab)[0]);

    if (!showFilters) {
      props.setFiterdTrips(Trips);
      console.log("fiterdTrips", Trips);
    } else {
      props.setFiterdTrips(filterTrips(Trips, selectedTab));
    }

    return () => {};
  }, [selectedTab]);

  useEffect(() => {
    setCurrentTrip(Trips[0]);
    setSelectedTab("Bucket List");
    props.onSelectCity(Trips[0]);

    if (!showFilters) {
      props.setFiterdTrips(Trips);
    } else {
      props.setFiterdTrips(filterTrips(Trips, selectedTab));
    }
    return () => {};
  }, [showFilters]);

  /*-------------Go to previous trip-------------*/
  const previous = () => {
    let previousTripIndex = Trips.indexOf(currentTrip) - 1;
    props.onSelectCity(Trips[previousTripIndex]);
    setCurrentTrip(Trips[previousTripIndex]);
  };

  /*-------------Go to next trip-------------*/
  const next = () => {
    let nextTripIndex = Trips.indexOf(currentTrip) + 1;
    props.onSelectCity(Trips[nextTripIndex]);
    setCurrentTrip(Trips[nextTripIndex]);
  };

  return (
    <div className="control-panel">
      <h3>Memory Lane</h3>
      <p>Make sure to count every moment in your life.</p>
      <div className="myBtnGroup">
        <label>Lets go </label>
        {!showFilters ? (
          <>
            <button
              onClick={previous}
              disabled={Trips.indexOf(currentTrip) === 0 || !currentTrip}
            >
              Previous
            </button>
            <button
              onClick={next}
              disabled={Trips.indexOf(currentTrip) === Trips.length - 1}
            >
              Next
            </button>
          </>
        ) : (
          <span></span>
        )}

        <button
          type="button"
          name="filterButton"
          data-test="filterButton"
          className={`myBtn  ${showFilters && "active"}`}
          onClick={toggleFilters}
        >
          {showFilters ? "Back To Journey" : "Filters"}
        </button>
      </div>

      {showFilters ? (
        <div data-test="tabs">
          <div className="tabs">
            {tabs.map((tab, id) => (
              <div
                className={`tab ${selectedTab === tab && "active"}`}
                onClick={() => setSelectedTab(tab)}
                key={id}
              >
                {tab}
              </div>
            ))}
          </div>
          {filterTrips(Trips, selectedTab).length > 0 ? (
            filterTrips(Trips, selectedTab).map((trip, index) => (
              <Places
                key={`btn-${index}`}
                trip={trip}
                index={index}
                currentTrip={currentTrip}
                OnSelectCity={() => {
                  props.onSelectCity(trip);
                  setCurrentTrip(trip);
                }}
              />
            ))
          ) : (
            <div data-test="loading">Loading.Please wait..</div>
          )}
        </div>
      ) : (
        <div data-test="allTrips">
          {Trips.map((trip, index) => (
            <Places
              key={`btn-${index}`}
              trip={trip}
              currentTrip={currentTrip}
              index={index}
              OnSelectCity={() => {
                props.onSelectCity(trip);
                setCurrentTrip(trip);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default React.memo(ControlPanel);
