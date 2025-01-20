'use client';

import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import style from "./ItineraryCard.module.css";
import Loading from '@/components/shared/Loading/Loading';

const ItineraryCard = ({ itinerary }) => {
    return (
        <div className={style.itineraryCard}>
            <div className={style.map}>
                <GoogleMapsComponent itinerary={itinerary} />
            </div>
            <div className={style.daysContainer}>
                <div>
                    {itinerary && itinerary?.map((day) => (
                        <DaySection key={day.id} day={day} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const DaySection = ({ day }) => {
    const { description, title, location } = day;
    return (
        <div className={style.daySectionContainer}>
            <h3>{title}</h3>
            <ProgramDetailsCard programDetails={JSON.parse(description)} />
            <h4>Meals: <span>{JSON.parse(description)?.meals}</span></h4>
            <h4>Visits: <span>{location}</span></h4>
        </div>
    );
};

const ProgramDetailsCard = ({ programDetails }) => {
    const { details, summary } = programDetails;
    return (
        <div className={style.programDetailsContainer}>
            {details.map((item, index) => (
                <p key={index}>- {item}</p>
            ))}
            <h4>{summary}</h4>
        </div>
    );
};

const GoogleMapsComponent = ({ itinerary }) => {
    const containerStyle = {
        width: '100%',
        height: '100%'
    };

    // Default center or use first location if available
    const center = itinerary && itinerary.length > 0
        ? {
            lat: -3.745,
            lng: -38.523
        }
        : { lat: -3.745, lng: -38.523 };

    const apiKey = 'AIzaSyDz45PchlXICnYE-3Q9Kz5vWHrR0nzzWkw';

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, [center]);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <Marker position={center} />
        </GoogleMap>
    ) : <div className={style.loading}><Loading /></div>;
};

export default ItineraryCard;
