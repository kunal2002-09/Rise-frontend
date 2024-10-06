import React, { useState, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { signup } from '../redux/slices/authSlice';
import { useRouter } from 'next/router';
import { setTokenCookie } from '../utils/cookieUtils';
import { Autocomplete, useLoadScript } from '@react-google-maps/api'; // For the autocomplete field
import { TextField, Button, Grid, Box } from '@mui/material';
import GoogleMapComponent from './common/GoogleMap/GoogleMap';

const Signup: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '', // Ensure key is loaded securely
    libraries: ['places'],
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.auth);
  
  // Google Places Autocomplete
  const [map, setMap] = useState<google.maps.Map | null>(null);// Store map instance
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null); // State to hold the selected place
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onLoad = useCallback((autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  }, []);

  const onPlaceChanged = async () => {
    const place = autocompleteRef.current?.getPlace();
    if (place && place.geometry && map) {
      map.setCenter(place.geometry.location!);
      map.setZoom(15);
      setSelectedPlace(place);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    try {
      // Include the establishment details in the signup action
      const resultAction = await dispatch(signup({ 
        email, 
        password, 
        restaurantDetails: selectedPlace ||{} // Use selectedPlace instead of 'place'
      }));
  
      if (signup.fulfilled.match(resultAction)) {
        const token = resultAction.payload.token;
        if (token) {
          setTokenCookie('token', token);
        }
        router.push('/dashboard');
      } else {
        console.error('Signup failed:', resultAction.error.message);
      }
    } catch (err) {
      console.error('Error during signup:', err);
    }
  };
  

  if (loadError) return <p>Error loading map</p>;
  if (!isLoaded) return <p>Loading...</p>;

  return (
    <Grid container spacing={2}>
      {/* Left Side - Google Map */}
      <Grid item xs={12} md={6}>
        <Box sx={{ height: '100vh', width: '100%' }}>
          <GoogleMapComponent setMap={setMap} selectedPlace={selectedPlace} />
        </Box>
      </Grid>
      {/* Right Side - Signup Form */}
      <Grid item xs={12} md={6}>
        <Box sx={{ padding: '2rem' }}>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <h2>Signup</h2>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  onLoad={onLoad}
                  onPlaceChanged={onPlaceChanged}
                  options={{
                    componentRestrictions: { country: 'in' },
                    types: ['establishment'],
                  }}
                >
                  <TextField
                    fullWidth
                    label="Search for a place"
                    placeholder="Search for a place"
                    variant="outlined"
                    disabled={loading} // Disable while loading
                  />
                </Autocomplete>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                  {loading ? 'Signing up...' : 'Signup'}
                </Button>
              </Grid>
              {error && <p className="error-message">{error}</p>}
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signup;
