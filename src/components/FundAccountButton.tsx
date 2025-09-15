import React, { useState, useTransition } from "react";
import { useNotification } from "../hooks/useNotification.ts";
import { useWallet } from "../hooks/useWallet.ts";
import { Button } from "../ui/Button";
import { getFriendbotUrl } from "../util/friendbot";
import { useWalletBalance } from "../hooks/useWalletBalance.ts";

const FundAccountButton: React.FC = () => {
  const { addNotification } = useNotification();
  const [isPending, startTransition] = useTransition();
  const { isFunded, isLoading } = useWalletBalance();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const { address } = useWallet();

  if (!address) return null;

  const handleFundAccount = () => {
    startTransition(async () => {
      try {
        const response = await fetch(getFriendbotUrl(address));

        if (response.ok) {
          addNotification("Account funded successfully!", "success");
        } else {
          const body: unknown = await response.json();
          if (
            body !== null &&
            typeof body === "object" &&
            "detail" in body &&
            typeof body.detail === "string"
          ) {
            addNotification(`Error funding account: ${body.detail}`, "error");
          } else {
            addNotification("Error funding account: Unknown error", "error");
          }
        }
      } catch {
        addNotification("Error funding account. Please try again.", "error");
      }
    });
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
    >
      <Button
        disabled={isPending || isLoading || isFunded}
        onClick={handleFundAccount}
        variant="accent"
        size="md"
      >
        Fund Account
      </Button>
      
      {isTooltipVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#0F0F0F] text-[#F6F7F8] text-sm rounded-lg whitespace-nowrap z-10">
          {isFunded
            ? "Account is already funded"
            : "Fund your account using the Stellar Friendbot"}
        </div>
      )}
    </div>
  );
};

export default FundAccountButton;
