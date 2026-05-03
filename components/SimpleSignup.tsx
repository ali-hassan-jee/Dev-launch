"use client";
import { useState } from "react"; // Removed useEffect (not needed)
import { useRouter } from "next/navigation";
export default function SimpleSignup() {
  const router=useRouter();
  // STATE (All form data)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [accountType, setAccountType] = useState("personal");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [message, setMessage] = useState({ type: "", text: "" });
  const [isLoading, setIsLoading] = useState(false); // NEW: Loading state
  const [errors, setErrors] = useState<Record<string, string>>({}); // NEW: Field errors

  // HELPER FUNCTIONS

  // Show message and auto-hide after 5 seconds
  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  // Clear message when user starts typing (better than useEffect)
  const clearMessageOnChange = () => {
    if (message.text) setMessage({ type: "", text: "" });
  };

  // ============================================
  // VALIDATION FUNCTIONS
  // ============================================

  // Validate a single field (for real-time errors)
  const validateField = (name: string, value: string | boolean): string => {
    switch (name) {
      case "name":
        if (!value) return "Name is required";
        if ((value as string).length < 2)
          return "Name must be at least 2 characters";
        return "";

      case "email":
        if (!value) return "Email is required";
        if (!(value as string).includes("@")) return "Email must contain @";
        if (!(value as string).includes(".")) return "Email must contain .";
        return "";

      case "password":
        if (!value) return "Password is required";
        if ((value as string).length < 6)
          return "Password must be at least 6 characters";
        return "";

      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== password) return "Passwords do not match";
        return "";

      case "agreeTerms":
        if (!value) return "You must agree to terms";
        return "";

      default:
        return "";
    }
  };

  // Validate all fields before submit
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    newErrors.name = validateField("name", name);
    newErrors.email = validateField("email", email);
    newErrors.password = validateField("password", password);
    newErrors.confirmPassword = validateField(
      "confirmPassword",
      confirmPassword,
    );
    newErrors.agreeTerms = validateField("agreeTerms", agreeTerms);

    setErrors(newErrors);

    // Return true if no errors
    return Object.values(newErrors).every((error) => error === "");
  };

  // ============================================
  // EVENT HANDLERS
  // ============================================

  // Handle input changes with real-time validation
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    // Handle checkboxes differently
    let newValue: string | boolean = value;
    if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
    }

    // Update the appropriate state
    switch (name) {
      case "name":
        setName(newValue as string);
        break;
      case "email":
        setEmail(newValue as string);
        break;
      case "password":
        setPassword(newValue as string);
        break;
      case "confirmPassword":
        setConfirmPassword(newValue as string);
        break;
      case "phone":
        setPhone(newValue as string);
        break;
      case "country":
        setCountry(newValue as string);
        break;
      case "accountType":
        setAccountType(newValue as string);
        break;
      case "agreeTerms":
        setAgreeTerms(newValue as boolean);
        break;
    }

    // Clear any existing message
    clearMessageOnChange();

    // Real-time validation (optional - can be heavy)
    const error = validateField(name, newValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // ============================================
  // FORM SUBMISSION
  // ============================================

 // NEW CODE (Real API call)
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  // First, validate all fields
  if (!validateForm()) {
    showMessage("error", "Please fix the errors above");
    return;
  }
  
  // Start loading (disable button, show spinner)
  setIsLoading(true);
  
  try {
    // Prepare the data to send
    const userData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password,  // Will be hashed on server
      phone: phone.trim(),
      country: country,
      accountType: accountType,
    };
    
    console.log("📤 Sending to API:", { ...userData, password: '***' });
    
    // ============================================
    // THE ACTUAL API CALL
    // ============================================
    const response = await fetch('/api/auth/signup', {
      method: 'POST',           // HTTP method (Create)
      headers: {
        'Content-Type': 'application/json',  // We're sending JSON
      },
      body: JSON.stringify(userData),  // Convert object to JSON string
    });
    
    // Parse the response (convert JSON back to object)
    const data = await response.json();
    
    console.log("📥 Response from server:", data);
    
    // Check if request was successful
    if (response.ok && data.success) {
      // SUCCESS!
      showMessage("success", data.message || "Account created successfully!");
      
      // Optional: Clear form after success
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPhone("");
      setCountry("");
      setAccountType("personal");
      setAgreeTerms(false);
      
      // Optional: Redirect to login page after 2 seconds
      setTimeout(() => {
        // window.location.href = '/login';  // Uncomment when you have login page
        console.log("Would redirect to login page");
      }, 2000);
      router.push('/login')
      
    } else {
      // ERROR from server
      showMessage("error", data.error || "Signup failed. Please try again.");
    }
    
  } catch (error) {
    // Network error or other exception
    console.error("❌ Network error:", error);
    showMessage("error", "Network error. Please check your connection.");
    
  } finally {
    // Always turn off loading state, even if error
    setIsLoading(false);
  }
};
  // ============================================
  // RENDER
  // ============================================

  return (
    
    <div className="min-h-screen  flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full m-6 max-w-md bg-white shadow-lg rounded-2xl p-8">

      <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1">Full Name *</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email *</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1">Password *</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-1">Confirm Password *</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="+1 555 000 9999"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block mb-1">Country</label>
          <select
            name="country"
            value={country}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Select Country</option>
            <option value="usa">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="pakistan">Pakistan</option>
            <option value="india">India</option>
          </select>
        </div>

        {/* Account Type */}
        <div>
          <label className="block mb-1">Account Type</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="accountType"
                value="personal"
                checked={accountType === "personal"}
                onChange={handleChange}
              />
              Personal Account
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="accountType"
                value="business"
                checked={accountType === "business"}
                onChange={handleChange}
              />
              Business Account
            </label>
          </div>
        </div>

        {/* Terms Checkbox */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={agreeTerms}
            onChange={handleChange}
          />
          I agree to the Terms of Service *
        </label>
        {errors.agreeTerms && (
          <p className="text-red-500 text-xs">{errors.agreeTerms}</p>
        )}
        {/* Message Display */}
        {message.text && (
          <div
            className={`p-3 rounded text-white text-center font-medium ${
              message.type === "error" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {message.text}
          </div>
        )}
        {/* Submit Button with Loading State */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Creating Account...
            </span>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
        </div>
        </div>







  );
}
