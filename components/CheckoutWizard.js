import React from "react";

// by default activeStep is zero
const CheckoutWizard = ({ activeStep = 0 }) => {
  return (
    <div className="mb-5 flex flex-wrap">
      {["User Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => {
          return (
            <div
              key={step}
              className={`flex-1 border-b-2 text-center ${
                index <= activeStep
                  ? "border-indigo-500 text-indigo-500" //active-indigo
                  : "border-gray-400 text-gray-400" //inactive-gray
              }`}
            >
              {step}
            </div>
          );
        }
      )}
    </div>
  );
};

export default CheckoutWizard;
