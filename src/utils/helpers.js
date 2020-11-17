import mapboxgl from 'mapbox-gl';
import 'react-toastify/dist/ReactToastify.css';
import './various.css';
import { toast, Zoom } from 'react-toastify';

const DISTANCE_THRESHOLD_METERS = 304.8;

const EARTH_RADIUS_KMS = 6371;

const degreeToRadians = (deg) => deg * (Math.PI/180);

const getGeometry = (feature) => {
    const geometry = feature.geometry;
    const longitude = parseFloat(geometry.coordinates[0]);
    const latitude = parseFloat(geometry.coordinates[1]);
    return {
        longitude,
        latitude
    }
}

export const getTechnicianData = (technicianFeatures) => {
    const features = technicianFeatures.features;
    const markers = [];
    let sumOfLongitudes = 0;
    let sumOfLatitudes = 0;
    let avgOfLongitudes = 0;
    let avgOfLatitudes = 0;
    features.forEach((feature) => {
        const geometry = getGeometry(feature);
        sumOfLongitudes += geometry.longitude;
        sumOfLatitudes += geometry.latitude;
        const marker = new mapboxgl.Marker();
        markers.push(marker.setLngLat([geometry.longitude, geometry.latitude]));
    })
    avgOfLongitudes = sumOfLongitudes / parseFloat(features.length);
    avgOfLatitudes = sumOfLatitudes / parseFloat(features.length)
    return {
        avgOfLongitudes,
        avgOfLatitudes,
        markers
    }
}

export const getDistance = (coordOne, coordTwo) => {
    const dLat = degreeToRadians(coordTwo.latitude-coordOne.latitude);  
    const dLon = degreeToRadians(coordOne.longitude-coordTwo.longitude); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(degreeToRadians(coordOne.latitude)) * Math.cos(degreeToRadians(coordTwo.latitude)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = EARTH_RADIUS_KMS * c;
    return d * 1000;
  }

export const checkClosePairs = ({ features }) => {
    for(let i = 0; i < features.length; i++){
        const coordA = getGeometry(features[i]);
        for(let j = i + 1; j < features.length; j++){
        const coordB = getGeometry(features[j]);
        const distance = getDistance(coordA, coordB);
        if(distance <= DISTANCE_THRESHOLD_METERS){
            const tech1 = features[i].properties.name;
            const tech2 = features[j].properties.name;
            const message = `${tech1} and ${tech2} are ${Math.round(distance)} meters apart`;
            customToast(message);
        }
        }
    }
  }

export const customToast = (message) => {
    toast(message,{
        className: 'custom-toast',
        bodyClassName: 'custom-toast',
        hideProgressBar: true,
        draggable: false,
        position: toast.POSITION.TOP_CENTER,
        transition: Zoom,
        autoClose: 2000,
    })
}

export const createPopup = ({ properties }) => {
    const popup = new mapboxgl.Popup({ offset: 25 });
    const popupContainer = createPopupHTMLElement(properties);
    popup.setDOMContent(popupContainer);
    return popup;
}

const createPopupHTMLElement = (properties) => {
    const { name, bearing, tsecs } = properties;
    const actualUpdatedDate = convertEpochToDate(tsecs);
    const popupContainer = document.createElement('div');
    const nameField = document.createElement('div');
    const bearingField = document.createElement('div');
    const lastUpdatedField = document.createElement('div');
    nameField.innerHTML = `<strong>Name:</strong> ${ name }`;
    bearingField.innerHTML = `<strong>Bearing:</strong> ${ bearing }°`;
    lastUpdatedField.innerHTML = `<strong>Last updated:</strong> ${ actualUpdatedDate }`;
    popupContainer.appendChild(nameField);
    popupContainer.appendChild(bearingField);
    popupContainer.appendChild(lastUpdatedField);
    popupContainer.className = 'custom-popup';
    return popupContainer;
}

const convertEpochToDate = (epochTime) => {
    const d = new Date(0);
    d.setUTCSeconds(epochTime);
    return d;
}


  
