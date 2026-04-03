export default function PricingPage() {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for getting started",
      features: ["1 Portfolio Project", "Basic Templates", "Community Support"],
      button: "Get Started",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$9/month",
      description: "Best for growing developers",
      features: [
        "Unlimited Projects",
        "Premium Templates",
        "Custom Domain",
        "Priority Support",
      ],
      button: "Upgrade to Pro",
      highlight: true,
    },
    {
      name: "Premium",
      price: "$19/month",
      description: "For professionals & teams",
      features: [
        "Everything in Pro",
        "Advanced Analytics",
        "Team Collaboration",
        "24/7 Support",
      ],
      button: "Go Premium",
      highlight: false,
    },
  ];

  return (
    <div className="  bg-gray-50 mb-15">
      <div className=" text-center mb-10 flex flex-col gap-3 mt-10">
        <h1 className="md:text-3xl text-2xl font-bold">
          Simple, Transparent Pricing
        </h1>
        <p className="text-gray-600 md:text-[1rem] text-sm">
          Choose the plan that fits your needs
        </p>
      </div>
      <div className="grid  md:px-24 px-5 md:grid-cols-3 grid-cols-1  gap-7">
        {plans.map(function (plan) {
          return (
            <div
              key={plan.name}
             className={`border rounded-2xl bg-white relative flex flex-col gap-3 px-8 py-8 hover:shadow-xl transition-all duration-300
${plan.highlight ? "border-2 border-blue-600 shadow-lg" : "border-gray-200"}`}
            >
              {plan.highlight && (
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h2 className="text-xl font-semibold">{plan.name}</h2>
              <h1 className="text-blue-600 text-2xl font-bold">{plan.price}</h1>
              <p className="text-sm text-gray-600">{plan.description}</p>
              <ul className="text-gray-700 mt-3  flex flex-col gap-3 mb-12 ">
                {plan.features.map((feature) => {
                  return (
                    <li key={feature} className="flex items-center">
                      <span className="text-blue-600 mr-2">✓</span>
                      {feature}
                    </li>
                  );
                })}
              </ul>
              <button
                aria-label={`Select ${plan.name} plan`}
                className={`w-full py-2 px-4 mt-auto  font-semibold rounded-lg
                ${plan.highlight ? "bg-blue-600  text-white hover:bg-blue-700 " : "bg-gray-100 hover:bg-gray-200"}
                `}
              >
                {plan.button}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
