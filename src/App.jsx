import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import NavbarUser from './components/NavbarUser'
import NavbarNotary from './components/NavbarNotary'
import NavbarAdmin from './components/NavbarAdmin'
import FooterUser from './components/user/FooterUser'
import UserHome from './pages/user/UserHome'
import ActiveConsultationPage from './pages/user/ActiveConsultationPage'
import ConsultationPage from './pages/user/ConsultationPage'
import NotaryLogin from './pages/notary/NotaryLogin'
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

