/*-------------Find By TestAtrr for testing------------*/
export const findByTestAtrr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);

  
  return wrapper.sort(SortFunctionAscending);
};

/*-------------Sort trips by date-------------*/

export const SortFunctionAscending = (a, b) => {
  var dateA = new Date(a.date).getTime();
  var dateB = new Date(b.date).getTime();
  return dateA > dateB ? 1 : -1;
};

/*-------------Filter trip category-------------*/
export const filterTrips = (Trips, selectedTab) => {
  let res = Trips.filter((trip) => trip.type === selectedTab);
  return res;
};
