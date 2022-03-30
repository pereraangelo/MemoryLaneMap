import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
import { filterTrips, SortFunctionAscending } from "../Utils";
import Trips from "../data/holidays.json";
configure({ adapter: new Adapter() });

describe("Filter function test", () => {
  test("filter returns correct results ", () => {
    const expectedAction = [
      {
        "location": "Rangala",
        "longitude": 80.7755,
        "latitude": 7.323,
        "title": "The one with river cross",
        "description": "It was a Last minute trip,and we were urged to watch sundown or sunrise.Among 3 places we finally chose a 4th place :) to visit, and ended up in a small river place to enjoy our evening, while enjoying a nice sunkissed sunset.",
        "type": "Swimmings",
        "date": "2021-08-19"
      },
      {
        "location": "Kahanwita river",
        "latitude": 7.0009905,
        "longitude": 80.26241083,
        "title": "The one with fat lier",
        "description": "After so many times postponing our fatty friend finally took us to a promised river while leaving another good memory in our hearts.",
        "type": "Swimmings",
        "date": "2021-10-23"
      },
    ];

    expect(filterTrips(Trips, "Swimmings")).toEqual(expectedAction);
  });

  test("sort trips by time ", () => {
    const fetchedSample = [
      {
        location: "Kahanwita river",
        latitude: 7.0009905,
        longitude: 80.26241083,
        title: "The one with fat lier",
        description: "",
        type: "Swimmings",
        date: "2021-10-23",
      },
      {
        location: "Rangala",
        longitude: 80.7755,
        latitude: 7.323,
        title: "The one with river cross",
        description: "Trip with tetra",
        type: "Swimmings",
        date: "2021-08-19",
      },
    ];

    const expectedAction = {
      location: "Rangala",
      longitude: 80.7755,
      latitude: 7.323,
      title: "The one with river cross",
      description: "Trip with tetra",
      type: "Swimmings",
      date: "2021-08-19",
    };

    let sortedArray = fetchedSample.sort(SortFunctionAscending)[0];
    expect(sortedArray).toEqual(expectedAction);
  });
});
