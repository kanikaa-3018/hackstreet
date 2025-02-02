import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import convo16 from '../../public/convo16.jpg';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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

  // Marker data remains the same
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

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        center: [26.2183, 78.1828],
        zoom: 6,
        scrollWheelZoom: true,
        dragging: true,
        touchZoom: true,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);

      L.marker([26.2183, 78.1828])
        .addTo(mapInstanceRef.current)
        .bindPopup('ABV-IIITM Gwalior, Madhya Pradesh.')
        .openPopup();

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

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative bg-white">
      {/* Introduction Section with Animation */}
      <motion.section
        className="relative z-10 py-10 px-4 text-center bg-gray-100"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className='font-semibold text-3xl mb-6'>Welcome to Our Community</h2>
        <p className='text-xl max-w-3xl mx-auto'>
          Atal Bihari Vajpayee Indian Institute of Information Technology and Management (ABV-IIITM) is a prestigious institute located in Gwalior, Madhya Pradesh. It is dedicated to imparting quality education in the fields of Information Technology, Management, and related disciplines.
        </p>
      </motion.section>

      {/* Header Section with Background Image and Animation */}
      <motion.header
        className="relative z-10 bg-blue-900 text-white px-10 text-center"
        style={{
          backgroundImage: `url(${convo16})`,
          backgroundSize: '150%',
          backgroundPosition: 'center',
          height: '500px',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <h1 className='font-semibold text-4xl mb-4'>ABV-IIITM Alumni Association</h1>
          <p className='text-xl mb-6'>
            The ABV-IIITM Alumni Association is a vibrant network of graduates committed to fostering long-term relationships with the institute and supporting its growth. With alumni spread across the globe, the association plays a pivotal role in shaping the institute's future.
          </p>
          <Link to='https://iiitm.ac.in/index.php/en/component/content/category/97-admissions?Itemid=437'>
            <button className="bg-indigo-800 text-white px-16 py-3 rounded-md hover:bg-gray-400">
              Explore Now
            </button>
          </Link>
        </div>
      </motion.header>

      {/* Map Container with Animation */}
      <motion.div
        className="relative z-0 mx-auto my-16"
        style={{
          maxWidth: '100%',
          width: '80%',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        <div
          ref={mapRef}
          className="h-[600px] w-full"
          style={{
            position: 'relative',
            zIndex: 0
          }}
        />
      </motion.div>
    </div>
  );
};

export default Community;