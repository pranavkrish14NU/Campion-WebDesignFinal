import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import '../../dist/Map.css';

interface MapProps {
  coordinates: [number, number];
  style?: React.CSSProperties;
}

const MapComponent: React.FC<MapProps> = ({ coordinates, style }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    // Initialize Mapbox
    mapboxgl.accessToken = "pk.eyJ1IjoicGF3YW5rdW1hcjk2NTYiLCJhIjoiY2xwd3VlZHoyMGZsMjJqcWVveGxteHJuMyJ9.f4wNyHRKL4RsOKM0QYTafw";

    // Ensure that the ref is not null
    if (mapContainerRef.current) {
      // Create a new map instance
      const map = new mapboxgl.Map({
        container: mapContainerRef.current, // container reference
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: coordinates, // starting position [lng, lat]
        zoom: 11, // starting zoom
        attributionControl: true,
        logoPosition: 'bottom-right',
      });

      // Add marker to the map
      markerRef.current = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map);

      // Disable rotation and pitch
      map.dragRotate.disable();
      map.touchZoomRotate.disableRotation();

      // Cleanup the map on component unmount
      return () => {
        if (map) {
          map.remove();
        }
      };
    }
  }, [coordinates]);

  return <div id="map" ref={mapContainerRef} style={{ height: '400px', ...style }} />;
};

export default MapComponent;
