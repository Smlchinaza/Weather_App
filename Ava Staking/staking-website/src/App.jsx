import { useEffect } from "react";
import StakingForm from "./components/StakingForm";
import StakeDashboard from "./components/StakeDashboard";
import './App.css';

function App() {
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (err) {
        console.error("Wallet connection failed:", err);
      }
    } else {
      alert("Please install MetaMask.");
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Avalanche Staking Platform</h1>
      <StakingForm />
      <StakeDashboard />
    </div>
  );
}

export default App;