import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../src/index.css';
import convo16 from '../../public/convo16.jpg';

// Create a custom icon
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });
};

const Community = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Marker data with position, label, and color
  const markerData = [
    { position: [28.7041, 77.1025], label: 'Rajesh Kumar', place: 'New Delhi', color: 'red' },
    { position: [28.4595, 77.0266], label: 'Amit Sharma', place: 'Gurgaon', color: 'blue' },
    { position: [19.0760, 72.8777], label: 'Priya Desai', place: 'Mumbai', color: 'green' },
    { position: [12.9716, 77.5946], label: 'Vikram Reddy', place: 'Bangalore', color: 'purple' },
    { position: [17.3850, 78.4867], label: 'Sunita Rao', place: 'Hyderabad', color: 'orange' },
    { position: [15.3173, 75.7139], label: 'Neha Gupta', place: 'Karnataka', color: 'yellow' },
    { position: [22.5726, 88.3639], label: 'Suresh Roy', place: 'Kolkata', color: 'pink' },
    { position: [26.4499, 80.3319], label: 'Anil Yadav', place: 'Lucknow', color: 'brown' },
  ];

  // Initialize the map and markers
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        center: [26.2183, 78.1828], // Coordinates for ABV-IIITM
        zoom: 6,
        scrollWheelZoom: true,
        dragging: true,
        touchZoom: true,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);

      // Add a main marker for ABV-IIITM
      L.marker([26.2183, 78.1828])
        .addTo(mapInstanceRef.current)
        .bindPopup('ABV-IIITM Gwalior, Madhya Pradesh.')
        .openPopup();

      // Add custom markers
      markerData.forEach((marker) => {
        const icon = createCustomIcon(marker.color);
        const mapMarker = L.marker(marker.position, { icon })
          .addTo(mapInstanceRef.current)
          .bindPopup(`<b>${marker.label}</b><br>${marker.place}`);

        mapMarker.on('mouseover', () => {
          mapMarker.openPopup();
        });

        mapMarker.on('mouseout', () => {
          mapMarker.closePopup();
        });
      });
    }

    // Cleanup the map instance when the component is unmounted
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="community-container">
      {/* Introduction Section */}
      <section className="community-introduction">
        <h2 className='font-semibold'>Welcome to Our Community</h2>
        <p>
          Atal Bihari Vajpayee Indian Institute of Information Technology and Management (ABV-IIITM) is a prestigious institute located in Gwalior, Madhya Pradesh. It is dedicated to imparting quality education in the fields of Information Technology, Management, and related disciplines.
        </p>
      </section>

      {/* Header Section with Background Image */}
      <header 
        className="community-header" 
        style={{ 
          backgroundImage: `url(${convo16})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      >
        <div className="community-overlay position-relative">
          <h1 className='font-semibold'>ABV-IIITM Alumni Association</h1>
          <p>
            The ABV-IIITM Alumni Association is a vibrant network of graduates committed to fostering long-term relationships with the institute and supporting its growth. With alumni spread across the globe, the association plays a pivotal role in shaping the institute’s future.
          </p>
          <button className="community-btn px-16 py-3">Explore Now</button>
        </div>
      </header>

      {/* Map Container */}
      <div
        ref={mapRef}
        className="h-[600px] mx-auto my-16 relative" // Increased the height for the banner
        style={{
          maxWidth: '100%',
          width: '80%',
          zIndex: 0,
        }}
      />
    </div>
  );
};

export default Community;
