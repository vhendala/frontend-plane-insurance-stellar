import { useState, useEffect } from 'react'
import { useWallet } from '../hooks/useWallet'
import { useNotification } from '../hooks/useNotification'
import { Button } from '../ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import { Input } from '../ui/Input'

interface InsurancePlan {
  id: string
  name: string
  premium: number
  coverage: number
  description: string
  popular?: boolean
}

interface Airline {
  name: string
  iata: string
  country: string
}

const insurancePlans: InsurancePlan[] = [
  {
    id: 'basic',
    name: 'Basic Coverage',
    premium: 26,
    coverage: 100,
    description: 'Essential protection for your flight'
  },
  {
    id: 'premium',
    name: 'Premium Coverage',
    premium: 50,
    coverage: 200,
    description: 'Comprehensive protection with higher payout',
    popular: true
  },
  {
    id: 'deluxe',
    name: 'Deluxe Coverage',
    premium: 120,
    coverage: 500,
    description: 'Maximum protection with premium benefits'
  }
]

export default function BuyInsurance() {
  const { address } = useWallet()
  const { addNotification } = useNotification()
  const [selectedPlan, setSelectedPlan] = useState<InsurancePlan | null>(null)
  const [airlines, setAirlines] = useState<Airline[]>([])
  const [isLoadingAirlines, setIsLoadingAirlines] = useState(true)
  const [formData, setFormData] = useState({
    flightNumber: '',
    departureDate: '',
    airline: '',
  })

  // Carregar companhias aéreas da API
  useEffect(() => {
    const loadAirlines = async () => {
      try {
        setIsLoadingAirlines(true)
        const response = await fetch('http://localhost:3001/api/airlines')
        const data = await response.json()
        
        if (data.success) {
          // Ordenar por nome para facilitar a busca
          const sortedAirlines = data.data.sort((a: Airline, b: Airline) => 
            a.name.localeCompare(b.name)
          )
          setAirlines(sortedAirlines)
        } else {
          addNotification('Erro ao carregar companhias aéreas', 'error')
        }
      } catch (error) {
        console.error('Erro ao carregar companhias aéreas:', error)
        addNotification('Erro ao carregar companhias aéreas', 'error')
      } finally {
        setIsLoadingAirlines(false)
      }
    }

    loadAirlines()
  }, [addNotification])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePlanSelect = (plan: InsurancePlan) => {
    setSelectedPlan(plan)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!address) {
      addNotification('Please connect your wallet first', 'error')
      return
    }
    if (!selectedPlan) {
      addNotification('Please select an insurance plan', 'error')
      return
    }
    addNotification(`Insurance plan "${selectedPlan.name}" selected! Purchase functionality coming soon!`, 'success')
  }

  if (!address) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-[#0F0F0F] mb-8 text-center">
          Buy Flight Insurance
        </h1>
        <Card>
          <CardContent>
            <p className="text-center text-[#0F0F0F]/70">
              Please connect your wallet to purchase insurance.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-[#0F0F0F] mb-8 text-center">
        Buy Flight Insurance
      </h1>
      
      {/* Insurance Plans Selection */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0F0F0F] mb-6 text-center">
          Choose Your Coverage Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insurancePlans.map((plan) => (
            <Card
              key={plan.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-2xl ${
                selectedPlan?.id === plan.id
                  ? 'ring-2 ring-[#FDDA24] bg-[#FDDA24]/5'
                  : 'hover:scale-105'
              } ${plan.popular ? 'relative' : ''}`}
              onClick={() => handlePlanSelect(plan)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#FDDA24] text-[#0F0F0F] px-3 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <div className="text-4xl font-bold text-[#00A7B5] mb-2">
                    ${plan.premium}
                  </div>
                  <div className="text-sm text-[#0F0F0F]/70">Premium</div>
                </div>
                <div className="mb-6">
                  <div className="text-3xl font-bold text-[#FDDA24] mb-2">
                    ${plan.coverage}
                  </div>
                  <div className="text-sm text-[#0F0F0F]/70">Coverage Amount</div>
                </div>
                <div className="text-xs text-[#0F0F0F]/60">
                  {selectedPlan?.id === plan.id ? '✓ Selected' : 'Click to select'}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Flight Details Form */}
      <Card>
        <CardHeader>
          <CardTitle>Flight Information</CardTitle>
          <CardDescription>
            Fill in your flight details to complete the purchase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#0F0F0F] mb-2">
                      Flight Number
                    </label>
                    <Input
                      name="flightNumber"
                      value={formData.flightNumber}
                      onChange={handleInputChange}
                      placeholder="e.g., AA123"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0F0F0F] mb-2">
                      Departure Date
                    </label>
                    <Input
                      name="departureDate"
                      type="date"
                      value={formData.departureDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0F0F0F] mb-2">
                      Airline
                    </label>
                    <select
                      name="airline"
                      value={formData.airline}
                      onChange={handleInputChange}
                      disabled={isLoadingAirlines}
                      className="w-full h-12 px-4 bg-[#F6F7F8] rounded-xl border-2 border-[#D6D2C4] focus:border-[#00A7B5] focus:outline-none transition-colors duration-200 text-[#0F0F0F] disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                    >
                      <option value="">
                        {isLoadingAirlines ? 'Loading airlines...' : 'Select an airline'}
                      </option>
                      {airlines.map((airline) => (
                        <option key={airline.iata} value={airline.iata}>
                          {airline.name} ({airline.iata}) - {airline.country}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0F0F0F] mb-2">
                      Selected Plan
                    </label>
                    <div className="h-12 px-4 bg-[#F6F7F8] rounded-xl border-2 border-[#D6D2C4] flex items-center">
                      {selectedPlan ? (
                        <span className="text-[#0F0F0F] font-medium">
                          {selectedPlan.name} - ${selectedPlan.premium} premium for ${selectedPlan.coverage} coverage
                        </span>
                      ) : (
                        <span className="text-[#0F0F0F]/50">
                          Please select a plan above
                        </span>
                      )}
                    </div>
                  </div>
                </div>
            
            <div className="pt-4">
              {selectedPlan && (
                <div className="bg-[#F6F7F8] rounded-xl p-4 mb-6">
                  <h3 className="font-bold text-[#0F0F0F] mb-2">Purchase Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Plan:</span>
                      <span className="font-medium">{selectedPlan.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Premium:</span>
                      <span className="font-medium text-[#00A7B5]">${selectedPlan.premium}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Coverage:</span>
                      <span className="font-medium text-[#FDDA24]">${selectedPlan.coverage}</span>
                    </div>
                    <div className="border-t border-[#D6D2C4] pt-2 flex justify-between font-bold">
                      <span>Total to Pay:</span>
                      <span className="text-[#002E5D]">${selectedPlan.premium}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <Button 
                type="submit" 
                variant="default" 
                size="lg"
                className="w-full"
                disabled={!selectedPlan}
              >
                {selectedPlan ? `Purchase ${selectedPlan.name}` : 'Select a Plan First'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
m in