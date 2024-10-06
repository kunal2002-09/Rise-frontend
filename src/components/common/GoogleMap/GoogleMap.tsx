// src/components/GoogleMap.tsx

import React, { useCallback, useRef } from 'react';
import { GoogleMap, Marker, InfoWindow  } from '@react-google-maps/api';


const GoogleMapComponent= (props:any) => {
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '', // Make sure to set your API key here
  //   libraries:['places'],
  // });

  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    props?.setMap(map); // Set the map instance in the parent component
  }, [props?.setMap]);

  // Handle errors in loading
  // if (loadError) return <p>Error loading map</p>;
  // if (!isLoaded) return <p>Loading...</p>;
  return (
    <GoogleMap
      onLoad={onLoad}
      mapContainerStyle={{ height: '100%', width: '100%' }}
      center={{ lat: 12.9716, lng: 77.5946 }} // Center at Bangalore, India
      zoom={10}
    >
      {props?.selectedPlace && props?.selectedPlace.geometry && (
        <Marker position={props?.selectedPlace.geometry.location!}>
          <InfoWindow position={props?.selectedPlace.geometry.location!}>
            <div>
              <h3>{props?.selectedPlace.name}</h3>
              <p>{props?.selectedPlace.formatted_address}</p>
              {props?.selectedPlace.rating && <p>Rating: {props?.selectedPlace.rating}</p>}
            </div>
          </InfoWindow>
        </Marker>
      )}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
