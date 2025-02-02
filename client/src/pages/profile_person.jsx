import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { FaLinkedin, FaInstagram, FaBriefcase } from 'react-icons/fa';
import { Building2, MapPin, GraduationCap } from 'lucide-react';
import axios from 'axios';

const Profile = () => {
    const  userId  = useParams().id;
    
    console.log("URL params:", userId); // Log all URL parameters
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (!userId) {
        console.error("No userId provided in URL");
        setError("Invalid user ID");
        setLoading(false);
        return;
      }
  
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/v1/alumni/${userId}`);
          console.log(response)
          setUser(response.data.alumni);
        } catch (err) {
          console.error("Error fetching user:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserProfile();
    }, [userId]);

 

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="flex justify-center items-center h-screen">User not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <div className="flex items-start gap-4">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img 
                src={user.profileImage || "/api/placeholder/96/96"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <FaBriefcase className="w-4 h-4" />
                <span>{user.position} at {user.company}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <MapPin className="w-4 h-4" />
                <span>{user.currentLocation}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <GraduationCap className="w-4 h-4" />
                <span>{user.college} • Batch of {user.batch}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mt-4">
            <p className="text-gray-700">{user.bio || 'No bio available'}</p>
          </div>

          <div className="flex gap-4 mt-6">
            {user.linkedin && (
              <a
                href={user.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <FaLinkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
            )}
            {user.instagram && (
              <a
                href={user.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-pink-600 hover:text-pink-800 transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
                <span>Instagram</span>
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;