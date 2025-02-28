import { useEffect, useState } from "react";
import { getContract } from "../utils/contract";
import { formatEther } from "ethers";

const StakeDashboard = () => {
  const [stakes, setStakes] = useState([]);

  useEffect(() => {
    const fetchStakes = async () => {
      const contract = getContract();
      if (!contract) return;

      try {
        const userStakes = await contract.getUserStakes();
        setStakes(userStakes);
      } catch (err) {
        console.error("Failed to fetch stakes:", err);
      }
    };

    fetchStakes();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Stake Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stakes.length ? (
          stakes.map((stake, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center text-center hover:shadow-2xl transition duration-300"
            >
              <p className="text-lg font-medium">Amount:</p>
              <p className="text-xl font-semibold text-blue-600">{formatEther(stake.amount)} AVAX</p>
              <p className="mt-2 text-gray-600">Duration: {stake.duration} months</p>
              <p className="mt-1 text-gray-500 text-sm">Start: {new Date(Number(stake.startTime) * 1000).toLocaleDateString()}</p>
              <p className="mt-1 text-gray-500 text-sm">End: {new Date(Number(stake.endTime) * 1000).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-gray-500 text-center">No stakes found.</p>
        )}
      </div>
    </div>
  );
};

export default StakeDashboard;