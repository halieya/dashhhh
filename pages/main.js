const d = typeof document === 'undefined' ? null : document

// d.getElementById('show-line').addEventListener('click', function() {
//     isLineVisible = !isLineVisible;
//     if (isLineVisible) {
//       updateLine();
//     } else {
//       removeLine();
//     }
//   });
//   d.getElementById('toggle-map-mode').addEventListener('click', function() {
//     const  currentStyle = map.getStyle().name;
//     const  newStyle = (currentStyle === 'Mapbox Streets') ? 'mapbox://styles/mapbox/satellite-v9' : 'mapbox://styles/mapbox/streets-v11';
//     map.setStyle(newStyle);
//   });