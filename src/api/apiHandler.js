import axios from 'axios';

const locationDataEndpoint = 'https://location-data-server.wl.r.appspot.com/api/v1/solar_farms/123/technicians';

const getLocationData = (callback) => {
  axios.get(locationDataEndpoint)
    .then(results => {
        callback(results.data);
    })
    .catch(error => {
      console.log(error);
    });
}


export default getLocationData;