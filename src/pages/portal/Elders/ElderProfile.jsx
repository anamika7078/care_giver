import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEdit2, FiSave, FiUsers, FiUserPlus } from 'react-icons/fi';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import FamilyMembersList from '../../../components/family/FamilyMembersList';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`elder-tabpanel-${index}`}
      aria-labelledby={`elder-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `elder-tab-${index}`,
    'aria-controls': `elder-tabpanel-${index}`,
  };
}

const ElderProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    dateOfBirth: '1950-05-15',
    gender: 'male',
    bloodGroup: 'A+',
    // Add other profile fields as needed
  });

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Fetch profile data when component mounts
  useEffect(() => {
    // Add your API call here to fetch the elder's data
    // For now using sample data
    const fetchProfile = async () => {
      try {
        // const response = await fetch(`/api/elders/${id}`);
        // const data = await response.json();
        // setProfile(data);
      } catch (error) {
        console.error('Error fetching elder profile:', error);
      }
    };
    fetchProfile();
  }, [id]);

  const handleBack = () => {
    navigate('/family/elders');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <FiArrowLeft className="mr-2" /> Back to Elders
      </button>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-gray-800">
              {profile.fullName || 'Elder Profile'}
            </h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              {isEditing ? (
                <>
                  <FiSave className="mr-1" /> Save
                </>
              ) : (
                <>
                  <FiEdit2 className="mr-1" /> Edit
                </>
              )}
            </button>
          </div>

          {/* Tabs */}
          <Box sx={{ width: '100%', mt: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="elder profile tabs"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="Profile" {...a11yProps(0)} />
                <Tab
                  label={
                    <div className="flex items-center">
                      <FiUsers className="mr-1" /> Family Members
                    </div>
                  }
                  {...a11yProps(1)}
                />
                <Tab label="Medical" {...a11yProps(2)} />
                <Tab label="Appointments" {...a11yProps(3)} />
              </Tabs>
            </Box>

            {/* Profile Tab */}
            <TabPanel value={tabValue} index={0}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="mt-1">{profile.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="mt-1">{new Date(profile.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="mt-1 capitalize">{profile.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Blood Group</p>
                      <p className="mt-1">{profile.bloodGroup || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
                {/* Add more profile sections as needed */}
              </div>
            </TabPanel>

            {/* Family Members Tab */}
            <TabPanel value={tabValue} index={1}>
              <FamilyMembersList elderId={id} />
            </TabPanel>

            {/* Medical Tab */}
            <TabPanel value={tabValue} index={2}>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Medical Information</h3>
                <p className="text-gray-600">Medical records and history will be displayed here.</p>
              </div>
            </TabPanel>

            {/* Appointments Tab */}
            <TabPanel value={tabValue} index={3}>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Appointments</h3>
                <p className="text-gray-600">Scheduled appointments will be displayed here.</p>
              </div>
            </TabPanel>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ElderProfile;