import { useEffect, useState,useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
const MapPage = () => {
  const [markers, setMarkers] = useState([]);
  const [lineCoordinates, setLineCoordinates] = useState([]);
  const [isFirstPosition, setIsFirstPosition] = useState(true);
  const [isLineVisible, setIsLineVisible] = useState(false);
  const mapContainerRef = useRef(null);
  const currentLocationMarkerRef = useRef(null);
  

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoicmFtaXRoZWNvZGVyIiwiYSI6ImNrczdydWtldTFnMG0ycHBoOTFyNzRpbDgifQ.EXaz5NlEReIkRn-pJUtr6g';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [10.18, 36.8],
      zoom: 15,
      pitch: 0,
      bearing: 0,
      interactive: true

    });
  
   // Dans la fonction useEffect
   navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
  
    
  
    // Créez un nouveau marqueur pour la position actuelle
    const currentLocationMarker = new mapboxgl.Marker({ color: 'red' })
      .setLngLat([longitude, latitude])
      .addTo(map);

  // Mettez à jour la référence du marqueur de position actuelle
  currentLocationMarkerRef.current = currentLocationMarker;

  // Centrez la carte sur la position actuelle
  map.flyTo({ center: [longitude, latitude], zoom: 15 });
}, error => {
  console.error('Erreur lors de la récupération de la position :', error);
});







      
    const eventSource = new EventSource('http://35.180.211.234:1111/api/cubeIT/NaviTrack/rest/device/stream/tracking');

    eventSource.onmessage = function(event) {

        console.table(event.data);
      const data = JSON.parse(event.data);
      const latitude = data.latitude;
      const longitude = data.longitude;

      console.log(latitude);
      console.log(longitude)

      const marker = new mapboxgl.Marker({
        color: getRandomColor()
      })
        .setLngLat([longitude, latitude])
        .addTo(map);

      setMarkers(prevMarkers => [...prevMarkers, marker]);
      setLineCoordinates(prevCoordinates => [...prevCoordinates, [longitude, latitude]]);
      console.log(getRandomColor())

      markers.forEach(marker => {
        new mapboxgl.Marker({ color: getRandomColor() })
          .setLngLat([longitude, latitude])
          .addTo(map);
      });

      
  
      // Clean up the map instance
      
  
      if (isLineVisible) {
        updateLine();
      }

      if (isFirstPosition) {
    
        map.flyTo({ center: [longitude, latitude], zoom: 15 });
        setIsFirstPosition(false);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [isLineVisible, isFirstPosition]);

  const updateLine = () => {

    mapboxgl.accessToken = 'pk.eyJ1IjoicmFtaXRoZWNvZGVyIiwiYSI6ImNrczdydWtldTFnMG0ycHBoOTFyNzRpbDgifQ.EXaz5NlEReIkRn-pJUtr6g';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [10.18, 36.8],
      zoom: 15,
      pitch: 0,
      bearing: 0,
      interactive: true
    });
    
    if (map.getLayer('line')) {
        
      map.removeLayer('line');
      map.removeSource('line');
    }

    const lineSource = {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: lineCoordinates
        }
      }
    };

    map.addSource('line', lineSource);
    

    map.addLayer({
      id: 'line',
      type: 'line',
      source: 'line',
      paint: {
        'line-color': '#ff0000',
        'line-width': 2,
        'line-opacity': 0.75
      }
    });
  };

  const removeLine = () => {

    mapboxgl.accessToken = 'pk.eyJ1IjoicmFtaXRoZWNvZGVyIiwiYSI6ImNrczdydWtldTFnMG0ycHBoOTFyNzRpbDgifQ.EXaz5NlEReIkRn-pJUtr6g';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [10.18, 36.8],
      zoom: 15,
      pitch: 0,
      bearing: 0,
      interactive: true
    });
    if (map.getLayer('line')) {
      map.removeLayer('line');
      map.removeSource('line');
    }
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleLineButtonClick = () => {
    setIsLineVisible(prevIsLineVisible => !prevIsLineVisible);
    if (isLineVisible) {
      updateLine();
    } else {
      removeLine();
    }
  };

  const handleToggleMapModeClick = () => {
    
    mapboxgl.accessToken = 'pk.eyJ1IjoicmFtaXRoZWNvZGVyIiwiYSI6ImNrczdydWtldTFnMG0ycHBoOTFyNzRpbDgifQ.EXaz5NlEReIkRn-pJUtr6g';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [10.18, 36.8],
      zoom: 15,
      pitch: 0,
      bearing: 0,
      interactive: true
    });

   // const currentStyle = map.getStyle().name;
  //  const newStyle = currentStyle === 'Mapbox Streets' ? 'mapbox://styles/mapbox/satellite-v9' : 'mapbox://styles/mapbox/streets-v11';
   const newStyle="mapbox://styles/mapbox/satellite-v9"
   
   
    map.setStyle(newStyle);
  };

  const handleZoomInClick = () => {

    mapboxgl.accessToken = 'pk.eyJ1IjoicmFtaXRoZWNvZGVyIiwiYSI6ImNrczdydWtldTFnMG0ycHBoOTFyNzRpbDgifQ.EXaz5NlEReIkRn-pJUtr6g';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [10.18, 36.8],
      zoom: 15,
      pitch: 0,
      bearing: 0,
      interactive: true
    });
    map.zoomIn();
  };

  const handleZoomOutClick = () => {

    mapboxgl.accessToken = 'pk.eyJ1IjoicmFtaXRoZWNvZGVyIiwiYSI6ImNrczdydWtldTFnMG0ycHBoOTFyNzRpbDgifQ.EXaz5NlEReIkRn-pJUtr6g';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [10.18, 36.8],
      zoom: 15,
      pitch: 0,
      bearing: 0,
      interactive: true
    });
    map.zoomOut();
  };

  return (
    <>
      <div ref={mapContainerRef}  id="map" style={{ position: 'relative', height: '700px', width: '100%' }}></div>
      <div className="map-controls" >
        <button id="zoom-in" onClick={handleZoomInClick}>+</button>
        <button id="zoom-out" onClick={handleZoomOutClick}>-</button>
        <button id="toggle-map-mode" onClick={handleToggleMapModeClick}>M</button>
      </div>
      <button id="show-line" className="line-button" onClick={handleLineButtonClick}>Trajet</button>
    </>
  );
};

export default MapPage;
