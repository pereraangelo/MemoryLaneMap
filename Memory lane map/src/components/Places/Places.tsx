import React from "react";
import { TRIP } from "../../common";

type Props = {
  trip: TRIP;
  index: number;
  currentTrip: TRIP;
  OnSelectCity?: () => void;
};

export const Places: React.FC<Props> = ({
  trip,
  index,
  OnSelectCity,
  currentTrip,
}) => {
  return (
    <div className=" input">
      <input
        type="radio"
        name="city"
        className=" tripList"
        id={`city-${index}`}
        checked={trip.location === currentTrip.location}
        onChange={OnSelectCity}
      />
      <label className=" tripList" htmlFor={`city-${index}`}>
        {trip.title}
      </label>
    </div>
  );
};

export default Places;
