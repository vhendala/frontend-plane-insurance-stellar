import { useWallet } from '../hooks/useWallet'
import { useWalletBalance } from '../hooks/useWalletBalance'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'

export default function Dashboard() {
  const { address } = useWallet()
  const { xlm, isLoading } = useWalletBalance()

  if (!address) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-[#0F0F0F] mb-8 text-center">
          Dashboard
        </h1>
        <Card>
          <CardContent>
            <p className="text-center text-[#0F0F0F]/70">
              Please connect your wallet to view your dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-[#0F0F0F] mb-8 text-center">
        Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Wallet Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#00A7B5]">
              {isLoading ? 'Loading...' : `${xlm} XLM`}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#FDDA24]">0</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#002E5D]">0</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your latest insurance transactions and activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-[#0F0F0F]/70">
            No recent activity. Connect your wallet and purchase insurance to get started.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
