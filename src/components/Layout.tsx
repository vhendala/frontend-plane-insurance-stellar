import { ReactNode, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import ConnectAccount from './ConnectAccount'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Buy Insurance', href: '/buy-insurance', icon: '🛡️' },
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  ]

  const isActive = (href: string) => location.pathname === href

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F7F8] to-[#D6D2C4]">
      {/* Navigation */}
      <nav className="bg-[#0F0F0F] shadow-2xl border-b border-[#FDDA24]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-12 h-12 bg-gradient-to-r from-[#FDDA24] to-[#B7ACE8] rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  <span className="text-2xl">🛡️</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#FDDA24] group-hover:text-[#B7ACE8] transition-colors duration-200">
                    Stellar Flight
                  </h1>
                  <p className="text-sm text-[#F6F7F8]/70">Insurance</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-[#FDDA24] text-[#0F0F0F] shadow-lg'
                        : 'text-[#F6F7F8] hover:bg-[#B7ACE8]/20 hover:text-[#B7ACE8]'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </div>

            {/* Wallet Connection */}
            <div className="hidden md:flex items-center space-x-4">
              <ConnectAccount />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#F6F7F8] hover:text-[#FDDA24] transition-colors duration-200"
              >
                {mobileMenuOpen ? (
                  <span className="text-2xl">✕</span>
                ) : (
                  <span className="text-2xl">☰</span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#FDDA24]/20">
              <div className="space-y-2">
                {navigation.map((item) => {
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive(item.href)
                          ? 'bg-[#FDDA24] text-[#0F0F0F]'
                          : 'text-[#F6F7F8] hover:bg-[#B7ACE8]/20'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )
                })}
                <div className="px-4 py-3">
                  <ConnectAccount />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#0F0F0F] border-t border-[#FDDA24]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#FDDA24] to-[#B7ACE8] rounded-lg flex items-center justify-center">
                  <span className="text-xl">🛡️</span>
                </div>
                <h3 className="text-xl font-bold text-[#FDDA24]">Stellar Flight</h3>
              </div>
              <p className="text-[#F6F7F8]/70 text-sm">
                Secure, fast, and reliable flight insurance powered by the Stellar network.
              </p>
            </div>
            
            <div>
              <h4 className="text-[#FDDA24] font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block text-[#F6F7F8]/70 hover:text-[#FDDA24] transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[#FDDA24] font-semibold mb-4">Contact</h4>
              <p className="text-[#F6F7F8]/70 text-sm">
                Built with ❤️ for the Stellar community
              </p>
            </div>
          </div>
          
          <div className="border-t border-[#FDDA24]/20 mt-8 pt-8 text-center">
            <p className="text-[#F6F7F8]/50 text-sm">
              © 2024 Stellar Flight Insurance. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
