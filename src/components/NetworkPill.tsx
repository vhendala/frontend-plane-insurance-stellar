import React from "react";
import { stellarNetwork } from "../contracts/util";

const NetworkPill: React.FC = () => {
  return (
    <div className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full">
      {stellarNetwork}
    </div>
  );
};

export default NetworkPill;
