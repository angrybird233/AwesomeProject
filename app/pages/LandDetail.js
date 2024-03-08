import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {AMapSdk, MapView, MapType, Marker} from 'react-native-amap3d';
import {init, Geolocation} from 'react-native-amap-geolocation';

export default function LandDetail() {
  AMapSdk.init(
    Platform.select({
      android: 'b989a981d7f2ba5d787dfec649baf9e5',
    }),
  );

  if (Platform.OS === 'android') {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);
  }
  init({
    android: 'b989a981d7f2ba5d787dfec649baf9e5',
  });

  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);
  const [accuracy, setAccuracy] = React.useState(0);
  const viewRef = useRef();

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      ({coords}) => {
        setLatitude(coords.latitude);
        setLongitude(coords.longitude);
        setAccuracy(coords.accuracy);
        viewRef.current?.moveCamera(
          {
            zoom: 20,
            target: {latitude: coords.latitude, longitude: coords.longitude},
          },
          500,
        );
      },
      err => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 0,
      },
    );
  };

  useEffect(() => {
    getCurrentLocation();
  });

  return (
    <View style={styles.landDetail}>
      <View style={styles.location}>
        <Text>经纬度：{longitude + '，' + latitude}</Text>
        <Text>精度：{accuracy}米</Text>
      </View>
      {/* 定位iocn */}
      <TouchableOpacity style={styles.locationBtn} onPress={getCurrentLocation}>
        <Image
          style={styles.locationIcon}
          source={require('../assets/location.png')}
        />
      </TouchableOpacity>
      {/* 地图 */}
      <MapView
        style={styles.map}
        ref={viewRef}
        mapType={MapType.Satellite}
        distanceFilter={10}
        compassEnabled={true}
        scaleControlsEnabled={true}
        zoomControlsEnabled={true}
        myLocationEnabled={true}
        initialCameraPosition={{
          target: {
            latitude: 39.91095,
            longitude: 116.37296,
          },
          zoom: 20,
        }}>
        {/* <Marker
          style={styles.markerIcon}
          position={{latitude, longitude}}
          icon={require('../assets/marker.png')}
        /> */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  landDetail: {
    width: '100%',
    height: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerIcon: {
    width: 68,
    height: 100,
  },
  location: {
    width: 300,
    position: 'absolute',
    left: 60,
    top: 10,
    padding: 10,
    backgroundColor: '#fff',
    zIndex: 1000,
  },
  locationBtn: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 140,
    right: 10,
    zIndex: 1000,
    padding: 7,
    borderRadius: 4,
  },
  locationIcon: {
    width: 26,
    height: 26,
  },
});
