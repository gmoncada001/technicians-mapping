import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { getTechnicianData, checkClosePairs, createPopup } from '../../utils/helpers';
import { MapWrapper, MapContainer, StyledButton } from './SolarMapStyledComps';
import { ToastContainer } from 'react-toastify';
import getLocationData from '../../api/apiHandler';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const MAP_BOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZ21vbmNhZGEwMDEiLCJhIjoiY2toaDNjNHZuMGRjeTJzbTh4eHFlMDgwOSJ9.nZeSeVCqjCtIpDungYDAzg';
const MAP_STYLE = 'mapbox://styles/mapbox/streets-v11';

const RestartButton = (props) => {

    const handleClick = () => {
        props.clickHandler();
    }
    return (
        <StyledButton onClick = { handleClick }>Restart</StyledButton>
    )
}

const SolarMap = () => {

    let mapContainer = useRef(); 

    const outerState = useSelector(state => state.stateReducer);

    const history = useHistory();

    const [mapState, setMapState] = useState({
        map: null,
        lng: 0,
        lat: 0,
        zoom: 14,
        markers: [],
        mapLoaded: false,
        fetching: true,
        initialData: [],
        data: []
    });

    const handleMarkerClick = (e) => {
        e.stopPropagation();
    }

    const loadMap = () => {
        const { lng, lat, zoom, markers } = mapState;
        const map = new mapboxgl.Map({
                container: mapContainer,
                style: MAP_STYLE,
                center: [lng, lat],
                zoom
                });
        map.on('load', () => {
            markers.forEach( marker => marker.addTo(map))
            setMapState({
                ...mapState,
                mapLoaded: true,
                map
            })
        });
    };
    
    const setInitialData = () => {
        getLocationData((response) => {
            const initialData = [...response];
            const initialFeatures = response.shift();
            const { avgOfLongitudes, avgOfLatitudes, markers } = getTechnicianData(initialFeatures || []);
            markers.forEach((marker, index) =>{
                const markerElement = marker.getElement();
                markerElement.addEventListener('mouseenter', () => marker.togglePopup());
                markerElement.addEventListener('mouseleave', () => marker.togglePopup());
                markerElement.addEventListener('click', handleMarkerClick);
                const { features } = initialFeatures;
                const popup = createPopup(features[index]);
                marker.setPopup(popup);
            } );
            setMapState({
                ...mapState,
                fetching: false,
                data: response,
                lng: avgOfLongitudes,
                lat: avgOfLatitudes,
                markers,
                initialData
            });
        });
    };

    const handleSimulation = (simulation) => {
        const { data, map, markers } = mapState;
        const newData = [...data];
        const newFeatures = newData.shift();    
        !newData && clearInterval(simulation);     
        if(newFeatures){
            const { 
                avgOfLongitudes: newAvgOfLongitudes,
                avgOfLatitudes: newAvgOfLatitudes,
                markers: newMarkers
            } = getTechnicianData(newFeatures);
            markers.forEach((marker, index) =>{
                const { features } = newFeatures;
                const popup = createPopup(features[index]);
                marker.setLngLat(newMarkers[index].getLngLat()).setPopup(popup);
            } );
            checkClosePairs(newFeatures);
            map.setCenter([newAvgOfLongitudes,newAvgOfLatitudes]);
        }
        setMapState({
            ...mapState,
            data: newData
        });
    }

    const cleanupOnUnmount = (simulation) => {
        const { markers } = mapState;
        clearInterval(simulation);
        markers.forEach( marker => {
            const markerElement = marker.getElement();
            markerElement.removeEventListener('mouseenter', () => marker.togglePopup());
            markerElement.removeEventListener('mouseleave', () => marker.togglePopup());
            markerElement.removeEventListener('click', handleMarkerClick);
        })
    }

    const handleRestart = () => {
        const { initialData } = mapState;
        setMapState({
            ...mapState,
            data: initialData
        })
    } 

    mapboxgl.accessToken = MAP_BOX_ACCESS_TOKEN;

    useEffect(() => {
        if(!outerState.loggedIn){
            history.push('login');
            return;
        }
        const { fetching, mapLoaded } = mapState;
        let simulation = null
        fetching && setInitialData();
        !mapLoaded && loadMap();
        if(mapLoaded){
            simulation = setInterval(() => handleSimulation(simulation), 1000);
        }
        return () => cleanupOnUnmount(simulation);
    },[mapState, outerState]);

    return (
        <MapWrapper>
            <ToastContainer />
            <MapContainer ref={ el => mapContainer = el } />
            <RestartButton clickHandler = { handleRestart }/>
        </MapWrapper>
    );
};

export default SolarMap;