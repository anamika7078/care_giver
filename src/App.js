import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import { ConfigProvider } from 'antd';
import theme from './theme/theme';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import FamilyLayout from './layouts/FamilyLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import NotFound from './pages/notfound';
import Pricing from './pages/Pricing';
import Contact from './pages/contact';
import Blog from './pages/Blog';
import Testimonials from './pages/Testimonials';

// Dashboard Components
import FamilyDashboard from './pages/family/Dashboard';
import CaregiverDashboard from './pages/admin/Dashboard';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import ViewBookings from './pages/admin/ViewBookings';
import AssignCaregiver from './pages/admin/AssignCaregiver';
import UpdateStatus from './pages/admin/UpdateStatus';
import Invoices from './pages/admin/Invoices';
import ReportsOverview from './pages/admin/reports/ReportsOverview';
import Caregivers from './pages/admin/Caregivers';

// Portal (Family) Pages
import BookingsList from './components/Bookings/BookingsList';
import Bookings from './pages/portal/Bookings';
import Emergency from './pages/portal/Emergency';
import AddFamilyMember from './pages/portal/AddFamilyMember';
import EldersList from './pages/portal/Elders/EldersList';
import ElderProfile from './pages/portal/Elders/ElderProfile';
import BookService from './pages/portal/BookService';
// import BookingForm from './components/Forms/BookingForm';
// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ConfigProvider>
          <Router>
            <AuthProvider>
              <CssBaseline />
              <Navbar />
              <main className="min-h-screen">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />

                  {/* Family Member Routes */}
                  <Route
                    path="/family/"
                    element={
                      <PrivateRoute allowedRoles={['family', 'family_member', 'user', 'admin']}>
                        <FamilyLayout />
                      </PrivateRoute>
                    }
                  >
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<FamilyDashboard />} />
                    <Route path="elders" element={<EldersList />} />
                    <Route path="elders/:id" element={<ElderProfile />} />
                    <Route path="bookings" element={<Bookings />} />
                    {/* <Route path="book-service" element={<BookingsList />} /> */}
                    <Route path="emergency" element={<Emergency />} />
                    <Route path="add-member" element={<AddFamilyMember />} />
                    <Route path="book-service" element={<BookService />} />
                  </Route>

                  {/* Admin Routes */}
                  <Route
                    path="/admin/*"
                    element={
                      <PrivateRoute allowedRoles={['admin']}>
                        <AdminLayout />
                      </PrivateRoute>
                    }
                  >
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="bookings" element={<ViewBookings />} />
                    <Route path="caregivers" element={<Caregivers />} />
                    <Route path="assign-caregiver" element={<AssignCaregiver />} />
                    <Route path="update-status" element={<UpdateStatus />} />
                    <Route path="invoices" element={<Invoices />} />
                    <Route path="reports" element={<ReportsOverview />} />
                  </Route>

                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </AuthProvider>
          </Router>
        </ConfigProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;