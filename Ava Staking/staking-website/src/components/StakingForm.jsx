import { useState } from "react";
import { stakeTokens } from "../utils/contract";

const StakingForm = () => {
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("3");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) return;

    setLoading(true);
    try {
      await stakeTokens(amount, duration);
      setAmount("");
    } catch (err) {
      console.error("Staking failed:", err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">Stake Your Tokens</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount (AVAX)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Duration</label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="3">3 Months - 12% APR</option>
            <option value="6">6 Months - 12% APR</option>
            <option value="12">12 Months - 12% APR</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-200"
          disabled={loading}
        >
          {loading ? "Staking..." : "Stake Now"}
        </button>
      </form>
    </div>
  );
};

export default StakingForm;
