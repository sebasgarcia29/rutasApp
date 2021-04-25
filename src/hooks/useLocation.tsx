import { useEffect, useRef, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/appInterfaces';

export const useLocation = () => {

  const initialState = {
    latitude: 0,
    longitude: 0,
  };

  const [hasLocation, sethasLocation] = useState(false);

  const [routeLines, setRouteLines] = useState<Location[]>([]);

  const [initialPosition, setinitialPosition] = useState<Location>(initialState);

  const [userLocation, setUserLocation] = useState<Location>(initialState);

  const watchId = useRef<number>();

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);


  useEffect(() => {
    getCurrentLocation()
      .then(location => {

        if (!isMounted.current) { return; } // En caso de que se desmonte el componente

        setinitialPosition(location);
        setUserLocation(location);
        setRouteLines(routes => [...routes, location]);
        sethasLocation(true);
      });
  }, []);

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {

      Geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        (err) => reject({ err }), { enableHighAccuracy: true }
      );

    });
  };

  const followUserLocation = () => {
    watchId.current = Geolocation.watchPosition(
      ({ coords }) => {

        if (!isMounted.current) { return; } // En caso de que se desmonte el componente

        const location: Location = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
        setUserLocation(location);
        setRouteLines(routes => [...routes, location]);
      },
      (err) => console.log({ err }), { enableHighAccuracy: true, distanceFilter: 100 }
    );
  };

  const stopFollowUserLocation = () => {
    if (watchId.current) {
      Geolocation.clearWatch(watchId.current);
    }
  };

  return {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    userLocation,
    followUserLocation,
    stopFollowUserLocation,
    routeLines,
  };
};
