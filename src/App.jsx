import { useState } from "react";
import "./App.css";
import useCurrencyInfo from "./hooks/useCurrencyinfo.js";
import InputBox from "./components/InputBox.jsx";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);

  const { data: currencyRates, error } = useCurrencyInfo(from);
  const options = currencyRates ? Object.keys(currencyRates) : [];

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    if (currencyRates && currencyRates[to]) {
      const result = (amount * currencyRates[to]).toFixed(2);
      setConvertedAmount(result);
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/28148096/pexels-photo-28148096/free-photo-of-a-palm-tree-is-shown-against-a-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load)`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          {error ? (
            <p className="text-red-500 text-center">Error: {error}</p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <div className="w-full mb-3">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={setFrom}
                  onAmountChange={setAmount}
                  selectedCurrency={from}
                />
              </div>

              <div className="relative w-full flex justify-center my-2">
                <button
                  type="button"
                  className="border-2 border-white rounded-md bg-blue-600 text-white px-2 py-1"
                  onClick={swap}
                >
                  Swap
                </button>
              </div>

              <div className="w-full mb-3">
                <InputBox
                  label="To"
                  amount={convertedAmount || ""}
                  currencyOptions={options}
                  onCurrencyChange={setTo}
                  selectedCurrency={to}
                  amountDisabled
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          )}

          {/* Converted Amount Display */}
          {convertedAmount !== null && (
            <p className="text-center text-lg font-semibold text-black mt-4">
              {amount} {from.toUpperCase()} = {convertedAmount}{" "}
              {to.toUpperCase()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
