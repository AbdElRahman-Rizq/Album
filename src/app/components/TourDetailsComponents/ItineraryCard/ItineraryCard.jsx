"use client";

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import style from "./ItineraryCard.module.css";
import { useLanguage } from "@/providers/LanguageContext";


// Fix Leaflet's default icon path issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const ItineraryCard = ({ itinerary }) => {
  const { language } = useLanguage();
  const [selectedGov, setSelectedGov] = useState(itinerary[0]?.governorate || 'Cairo'); // Default to first day's governorate

  useEffect(() => {
    // Update selectedGov based on the first day's governorate when language changes
    setSelectedGov(itinerary[0]?.governorate || 'Cairo');
  }, [language, itinerary]);

  return (
    <div className={style.itineraryCard}>
      <div className={style.map}>
        <LeafletMapComponent gov={selectedGov} />
      </div>
      <div className={style.daysContainer}>
        <div>
          {itinerary && itinerary.map((day) => (
            <DaySection key={day.id} day={day} onClick={() => setSelectedGov(day.governorate)} />
          ))}
        </div>
      </div>
    </div>
  );
};

const DaySection = ({ day, onClick }) => {
  const { description, title, location, governorate } = day;
  return (
    <div className={style.daySectionContainer} onClick={onClick}>
      <h3>{title}</h3>
      <ProgramDetailsCard programDetails={JSON.parse(description)} />
      <h4>
        Meals: <span>{JSON.parse(description)?.meals}</span>
      </h4>
      <h4>
        Visits: <span>{location}</span>
      </h4>
      <h4>
        Governorate: <span>{governorate}</span>
      </h4>
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
const LeafletMapComponent = ({ gov }) => {
  const governoratesCoordinates = {
    Cairo: { lat: 30.0444, lng: 31.2357 },
    Giza: { lat: 29.9765, lng: 31.1313 },
    Alexandria: { lat: 31.2001, lng: 29.9187 },
    Luxor: { lat: 25.6872, lng: 32.6396 },
    Aswan: { lat: 24.0889, lng: 32.8998 },
    RedSea: { lat: 27.2579, lng: 33.8116 },
    SouthSinai: { lat: 27.9158, lng: 34.3299 },
    NorthSinai: { lat: 30.8355, lng: 33.7984 },
    Suez: { lat: 29.9737, lng: 32.5263 },
    PortSaid: { lat: 31.2565, lng: 32.2841 },
    Ismailia: { lat: 30.5905, lng: 32.2654 },
    Sharqia: { lat: 30.7323, lng: 31.7195 },
    Dakahlia: { lat: 31.0417, lng: 31.3807 },
    Damietta: { lat: 31.4165, lng: 31.8133 },
    KafrElSheikh: { lat: 31.1086, lng: 30.9364 },
    Beheira: { lat: 30.5972, lng: 30.9876 },
    Menoufia: { lat: 30.4662, lng: 31.1846 },
    Qalyubia: { lat: 30.1792, lng: 31.2056 },
    Gharbia: { lat: 30.8754, lng: 31.0335 },
    Fayoum: { lat: 29.3101, lng: 30.8418 },
    BeniSuef: { lat: 29.0661, lng: 31.0994 },
    Minya: { lat: 28.1099, lng: 30.7503 },
    Assiut: { lat: 27.1809, lng: 31.1837 },
    Sohag: { lat: 26.5569, lng: 31.6948 },
    Qena: { lat: 26.1642, lng: 32.7267 },
    Matrouh: { lat: 31.3520, lng: 27.2373 },
    NewValley: { lat: 25.4542, lng: 30.5467 },
  };

  const center = governoratesCoordinates[gov] || { lat: 30.0444, lng: 31.2357 };

  return (
    <MapContainer center={[center.lat, center.lng]} zoom={13} style={{ width: "100%", height: "100%" }}>
       {/* Tile Layer with English Labels */}
      <TileLayer
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
      />
      <Marker position={[center.lat, center.lng]}>
        <Popup><b>{gov}</b></Popup>
      </Marker>
      <MapUpdater center={center} />
    </MapContainer>
  );
};


// Component to smoothly scroll the map
const MapUpdater = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      map.flyTo([center.lat, center.lng], 10, { duration: 1.5 });
    }
  }, [center, map]);

  return null;
};

export default ItineraryCard;
