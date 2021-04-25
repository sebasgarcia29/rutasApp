/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import
MapView
// ,{ Marker }
, {
  Polyline,
  PROVIDER_GOOGLE,
}
  from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../pages/LoadingScreen';
import { Fab } from './Fab';

export const Map = () => {

  const [showPolyline, setShowPolyline] = useState(true);

  const {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
    stopFollowUserLocation,
    routeLines,
  } = useLocation();

  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);

  const centerPosition = async () => {
    const { latitude, longitude } = await getCurrentLocation();

    following.current = true;

    mapViewRef.current?.animateCamera({
      center: { latitude, longitude },
    });
  };

  useEffect(() => {
    followUserLocation();
    return () => {
      stopFollowUserLocation();
    };
  }, []);

  // seguimiento a la posicion en movimiento
  useEffect(() => {

    if (!following.current) { return; }

    const { latitude, longitude } = userLocation;
    mapViewRef.current?.animateCamera({
      center: { latitude, longitude },
    });
  }, [userLocation]);

  if (!hasLocation) {
    return (<LoadingScreen />);
  }


  return (
    <>
      <MapView
        ref={(el) => mapViewRef.current = el!}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onTouchStart={() => following.current = false}
      >
        {showPolyline && (
          <Polyline
            coordinates={routeLines}
            strokeColor={'#f84e1e'}
            strokeWidth={5}
          />
        )}

        {/* <Marker
        image={require('../assets/custom-marker.png')}
          coordinate={{
            latitude: initialPosition.latitude,
            longitude: initialPosition.longitude,
          }}
          title={'Titulo'}
          description={'Descripción'}
        /> */}

      </MapView>
      <Fab
        iconName={'compass'}
        onPress={centerPosition}
        style={{ position: 'absolute', bottom: 20, right: 20 }}
      />
      <Fab
        iconName={'road'}
        onPress={() => setShowPolyline(!showPolyline)}
        style={{ position: 'absolute', bottom: 80, right: 20 }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
