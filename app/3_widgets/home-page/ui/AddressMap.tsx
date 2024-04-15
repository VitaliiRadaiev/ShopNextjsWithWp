'use client';

import React, { JSX } from 'react';
import clsx from 'clsx';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const center = {
    lat: 50.44116857296963,
    lng: 30.52029593484446
};

export function AddressMap() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD7Q82l2QjSzJJk1uUW3OzUBGPTlbk8w1g"
    })

    const [map, setMap] = React.useState<google.maps.Map | null>(null);

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
        setMap(null)
    }, [])

    if (!isLoaded) {
        return null;
    }
    
    return (
        <GoogleMap
            mapContainerStyle={{
                width: '100%',
                height: '100%'
            }}
            center={center}
            zoom={16}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <>
                <Marker position={center} />
            </>
        </GoogleMap>
    );
}