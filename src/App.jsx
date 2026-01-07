import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import NavbarUser from './components/NavbarUser'
import NavbarNotary from './components/NavbarNotary'
import NavbarAdmin from './components/NavbarAdmin'
import UserHome from './pages/user/UserHome'
import NotaryLogin from './pages/notary/NotaryLogin'
import AdminLogin from './pages/admin/AdminLogin'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout NavbarComponent={NavbarUser}>
            <UserHome />
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

