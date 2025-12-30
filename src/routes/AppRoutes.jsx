import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

// Public Pages
import Home from '../pages/Home';
import Services from '../pages/Services';
import BookService from '../pages/BookService';
import Pricing from '../pages/Pricing';
import Testimonials from '../pages/Testimonials';
import About from '../pages/About';
import Careers from '../pages/Careers';
import Blog from '../pages/Blog';

import Legal from '../pages/Legal';

// Service Pages
import ParentsAssistance from '../pages/Services/ParentsAssistance';
import MedicalAssistance from '../pages/Services/MedicalAssistance';
import HomeCare from '../pages/Services/HomeCare';
import NRIAssistance from '../pages/Services/NRIAssistance';
import TravelCare from '../pages/Services/TravelCare';
import EmergencyCare from '../pages/Services/EmergencyCare';
import ScamAwareness from '../pages/Services/ScamAwareness';
import BillingTasks from '../pages/Services/BillingTasks';

// Portal Pages
import Dashboard from '../pages/portal/Dashboard';
import EldersList from '../pages/portal/Elders/EldersList';
import ElderProfile from '../pages/portal/Elders/ElderProfile';
import Bookings from '../pages/portal/Bookings';
import Appointments from '../pages/portal/Appointments';
import Documents from '../pages/portal/Documents';
import Messages from '../pages/portal/Messages';
import AddFamilyMember from '../pages/portal/AddFamilyMember';
import Contact from '../pages/contact';
// Layout Components
import MainLayout from '../components/layout/MainLayout';
import PortalLayout from '../components/layout/PortalLayout';

// Protected Route
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          {/* Services */}
          <Route path="services">
            <Route index element={<Services />} />
            <Route path="parents-assistance" element={<ParentsAssistance />} />
            <Route path="medical-assistance" element={<MedicalAssistance />} />
            <Route path="home-care" element={<HomeCare />} />
            <Route path="nri-assistance" element={<NRIAssistance />} />
            <Route path="travel-care" element={<TravelCare />} />
            <Route path="emergency-care" element={<EmergencyCare />} />
            <Route path="scam-awareness" element={<ScamAwareness />} />
            <Route path="billing-tasks" element={<BillingTasks />} />
          </Route>

          <Route path="book" element={<BookService />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="about" element={<About />} />
          <Route path="careers" element={<Careers />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="legal" element={<Legal />} />

          {/* Auth */}
        </Route>

        {/* Protected Portal Routes */}
        <Route element={
          <ProtectedRoute>
            <PortalLayout />
          </ProtectedRoute>
        }>
          <Route path="/portal" element={<Navigate to="dashboard" replace />} />
          <Route path="/portal/dashboard" element={<Dashboard />} />
          <Route path="/portal/elders" element={<EldersList />} />
          <Route path="/portal/elders/:elderId" element={<ElderProfile />} />
          <Route path="/portal/elders/:elderId/add-family-member" element={<AddFamilyMember />} />
          <Route path="/portal/bookings" element={<Bookings />} />
          <Route path="/portal/appointments" element={<Appointments />} />
          <Route path="/portal/documents" element={<Documents />} />
          <Route path="/portal/messages" element={<Messages />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;

