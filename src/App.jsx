import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import NavbarUser from './components/NavbarUser'
import NavbarNotary from './components/NavbarNotary'
import NavbarAdmin from './components/NavbarAdmin'
import FooterUser from './components/user/FooterUser'
import UserHome from './pages/user/UserHome'
import ActiveConsultationPage from './pages/user/ActiveConsultationPage'
import ConsultationDetailPage from './pages/user/ConsultationDetailPage'
import ConsultationPage from './pages/user/ConsultationPage'
import NotaryLogin from './pages/notary/NotaryLogin'
import NotaryRegistration from './pages/notary/NotaryRegistration'
import RegistrationConfirmation from './pages/notary/RegistrationConfirmation'
import AdminLogin from './pages/admin/AdminLogin'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout NavbarComponent={NavbarUser} FooterComponent={FooterUser}>
            <UserHome />
          </Layout>
        }
      />
      <Route
        path="/konsultasi-aktif"
        element={
          <Layout NavbarComponent={NavbarUser} FooterComponent={FooterUser}>
            <ActiveConsultationPage />
          </Layout>
        }
      />
      <Route
        path="/konsultasi-aktif/:consultationId"
        element={
          <Layout NavbarComponent={NavbarUser}>
            <ConsultationDetailPage />
          </Layout>
        }
      />
      <Route
        path="/riwayat"
        element={
          <Layout NavbarComponent={NavbarUser} FooterComponent={FooterUser}>
            <ConsultationPage />
          </Layout>
        }
      />
      <Route
        path="/notary/login"
        element={
          <Layout NavbarComponent={NavbarNotary}>
            <NotaryLogin />
          </Layout>
        }
      />
      <Route
        path="/notary/register"
        element={
          <Layout NavbarComponent={NavbarNotary}>
            <NotaryRegistration />
          </Layout>
        }
      />
      <Route
        path="/notary/register/confirmation"
        element={
          <Layout NavbarComponent={NavbarNotary}>
            <RegistrationConfirmation />
          </Layout>
        }
      />
      <Route
        path="/admin/login"
        element={
          <Layout NavbarComponent={NavbarAdmin}>
            <AdminLogin />
          </Layout>
        }
      />
    </Routes>
  )
}

export default App

