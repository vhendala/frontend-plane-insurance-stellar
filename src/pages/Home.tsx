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
        <p className="text-xl text-[#0F0F0F]/70 mb-4 max-w-3xl mx-auto">
          Secure, fast, and reliable flight insurance powered by the Stellar network. 
          Get instant coverage for your flights with blockchain technology.
        </p>
        <p className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] mb-10 max-w-3xl mx-auto">
          Payout in seconds — not weeks.
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

      {/* Plans Section */}
      <div className="mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Basic Plan */}
          <div className="rounded-2xl border border-[#0F0F0F]/10 bg-white/70 backdrop-blur p-6 shadow-sm flex flex-col">
            <h3 className="text-xl font-semibold text-[#0F0F0F]">Basic</h3>
            <p className="text-sm text-[#0F0F0F]/70 mt-1">Essential delay coverage</p>
            <div className="text-4xl font-bold text-[#0F0F0F] mt-4">$50</div>
            <ul className="mt-4 space-y-2 text-sm text-[#0F0F0F]/80">
              <li>• Trigger: delay ≥ 2h</li>
              <li>• Automatic on-chain payout</li>
              <li>• Zero paperwork</li>
            </ul>
            <Button className="mt-6" onClick={() => navigate('/buy-insurance')}>
              Select Basic
            </Button>
          </div>

          {/* Standard Plan */}
          <div className="rounded-2xl border border-[#0F0F0F]/10 bg-white p-6 shadow-md flex flex-col ring-2 ring-[#FDDA24] relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-[#FDDA24] text-[#0F0F0F] px-3 py-1 rounded-full text-sm font-bold">
                Most Popular
              </span>
            </div>
            <h3 className="text-xl font-semibold text-[#0F0F0F]">Standard</h3>
            <p className="text-sm text-[#0F0F0F]/70 mt-1">Best balance of price and coverage</p>
            <div className="text-4xl font-bold text-[#0F0F0F] mt-4">$100</div>
            <ul className="mt-4 space-y-2 text-sm text-[#0F0F0F]/80">
              <li>• Trigger: delay ≥ 2h</li>
              <li>• Expanded coverage</li>
              <li>• Payout in seconds</li>
            </ul>
            <Button className="mt-6" variant="default" onClick={() => navigate('/buy-insurance')}>
              Select Standard
            </Button>
          </div>

          {/* Premium Plan */}
          <div className="rounded-2xl border border-[#0F0F0F]/10 bg-white/70 backdrop-blur p-6 shadow-sm flex flex-col">
            <h3 className="text-xl font-semibold text-[#0F0F0F]">Premium</h3>
            <p className="text-sm text-[#0F0F0F]/70 mt-1">Maximum protection for frequent travelers</p>
            <div className="text-4xl font-bold text-[#0F0F0F] mt-4">$200</div>
            <ul className="mt-4 space-y-2 text-sm text-[#0F0F0F]/80">
              <li>• Trigger: delay ≥ 2h</li>
              <li>• Higher payout limits</li>
              <li>• Priority support</li>
            </ul>
            <Button className="mt-6" variant="default" onClick={() => navigate('/buy-insurance')}>
              Select Premium
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
