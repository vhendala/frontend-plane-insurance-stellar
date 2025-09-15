import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { WalletProvider } from './providers/WalletProvider'
import { NotificationProvider } from './providers/NotificationProvider'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import BuyInsurance from './pages/BuyInsurance'
import './index.css'

function App() {
  return (
    <WalletProvider>
      <NotificationProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/buy-insurance" element={<BuyInsurance />} />
            </Routes>
          </Layout>
        </Router>
      </NotificationProvider>
    </WalletProvider>
  )
}

export default App
