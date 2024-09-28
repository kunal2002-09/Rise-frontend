// src/components/GoogleMap.tsx
import React, { useCallback, useRef } from 'react';
import { GoogleMap, useLoadScript, Autocomplete } from '@react-google-maps/api';
import config from '../../../utils/config'; 
// Define a string union type for libraries
type Library = 'places'; // Add more libraries as needed

const libraries: Library[] = ['places']; // Specify the type here

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

// Updated center to Bangalore, India
const center = {
  lat: 12.9716, // Latitude for Bangalore
  lng: 77.5946, // Longitude for Bangalore
};
const googleMapsApiKey=config.googleMapsApiKey;
console.log("🚀 ~ file: GoogleMap.tsx:21 ~ googleMapsApiKey:", googleMapsApiKey)
const GoogleMapComponent = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey || '',
    libraries,
});


  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onLoad = useCallback((autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  }, []);

  const onPlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place) {
      console.log('Selected Place:', place);
    }
  };

  if (loadError) return <p>Error loading map</p>;
  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div>
      {/* <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center} // Center updated to Bangalore
      > */}
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Search places"
            style={{
              boxSizing: 'border-box',
              border: '1px solid transparent',
              width: '240px',
              height: '32px',
              padding: '0 12px',
              borderRadius: '3px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              fontSize: '16px',
              outline: 'none',
              position: 'absolute',
              left: '50%',
              marginLeft: '-120px',
              top: '10px',
            }}
          />
        </Autocomplete>
      {/* </GoogleMap> */}
    </div>
  );
};

export default GoogleMapComponent;
