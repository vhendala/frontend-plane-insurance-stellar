import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#0F0F0F] mb-6">
          Blockchain Parametric Flight Insurance
        </h1>
        <p className="text-xl text-[#0F0F0F]/70 mb-8 max-w-3xl mx-auto">
          Secure, fast, and reliable flight insurance powered by the Stellar network. 
          Get instant coverage for your flights with blockchain technology.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="default" 
            size="lg"
            onClick={() => navigate('/buy-insurance')}
          >
            Buy Insurance
          </Button>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => navigate('/dashboard')}
          >
            View Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
