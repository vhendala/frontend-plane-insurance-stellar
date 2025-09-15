import { useState } from "react";
import { Button } from "../ui/Button";
import { useWallet } from "../hooks/useWallet";
import { connectWallet, disconnectWallet } from "../util/wallet";

export const WalletButton = () => {
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const { address, isPending } = useWallet();
  const buttonLabel = isPending ? "Loading..." : "Connect";

  if (!address) {
    return (
      <Button variant="default" size="md" onClick={() => void connectWallet()}>
        {buttonLabel}
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowDisconnectModal(true)}
      >
        {address.slice(0, 8)}...{address.slice(-6)}
      </Button>

      {/* Simple disconnect modal */}
      {showDisconnectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md mx-4">
            <h3 className="text-lg font-bold text-[#0F0F0F] mb-4">
              Disconnect Wallet
            </h3>
            <p className="text-[#0F0F0F]/70 mb-6">
              Connected as <code className="break-all">{address}</code>. 
              Do you want to disconnect?
            </p>
            <div className="flex gap-3">
              <Button
                variant="default"
                size="md"
                onClick={() => {
                  void disconnectWallet().then(() =>
                    setShowDisconnectModal(false),
                  );
                }}
              >
                Disconnect
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => setShowDisconnectModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
