"use client";

import { METHODS } from "node:http";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIssubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading,setLoading] = useState(false);
 
  const handleSubmit=async (e)=>{
    e.preventDefault();
    setLoading(true);
    
    try {
      // API call
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name, email, message
        }),
      });
      
      const data = await res.json();
      
      if (data.error) {
        setError(data.error);
        setIssubmitted(true);
        return;
      }
      
      if(data.success) {
        setError("");          // reset error
        setIssubmitted(true);     // show success message
        
        // Optionally reset the form fields
        setName("");
        setEmail("");
        setMessage("");
      }
      
    } catch (err) {
      // Handle network errors or other unexpected issues
      setError("Network error. Please check your connection and try again.");
      setIssubmitted(true);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="mx-w-7xl px-5 min-h-screen  bg-gray-50">
      <div className="text-center my-5 mb-6 w-full">
        <h1 className="text-3xl mb-2 font-bold">Contact Us</h1>
        <p className="text-sm text-gray-600">
          Have a question or feedback? We'd love to hear from you.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="border border-gray-500 flex flex-col max-w-2xl p-6 rounded-xl  mx-auto bg-white">
        {isSubmitted && (
          <div
            className={`text-center ${error ? "text-red-600 bg-red-100" : "text-green-600 bg-green-100"} rounded-md py-2`}
          >
            <p>
              {error
                ? error
                : "Thank you! We'll get back to you soon."}
            </p>
          </div>
        )}
        <label
          htmlFor="userName"
          className="font-semibold text-gray-600 cursor-pointer text-md"
        >
          Name
        </label>
        <input
          type="text"
          placeholder="Ali Hassan"
          className="text-gray-800 w-full border border-gray-400 focus:border-blue-600 focus:border-2 outline-0 rounded-md px-3 py-1"
          id="userName"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setIssubmitted(false)
          }}
        />

        <label
          htmlFor="email"
          className="mt-3 font-semibold text-gray-600 cursor-pointer text-md"
        >
          Email
        </label>
        <input
          type="email"
          placeholder="ali@gmail.com"
          className="text-gray-800 w-full border border-gray-400 focus:border-blue-600 focus:border-2 outline-0 rounded-md px-3 py-1"
          id="email"
          value={email}
          onChange={(e) => {setEmail(e.target.value); setIssubmitted(false)}}
        />

        <label
          htmlFor="message"
          className="mt-3 font-semibold text-gray-600 cursor-pointer text-md"
        >
          Message
        </label>
        <textarea
          rows={4}
          placeholder="Write your message..."
          className="text-gray-800 w-full border border-gray-400 focus:border-blue-600 focus:border-2 outline-0 rounded-md px-3 py-1"
          id="message"
          value={message}
          onChange={(e) => {setMessage(e.target.value); setIssubmitted(false)}}
        />
        <button disabled={loading} type="submit" className="bg-blue-600 mt-4 text-white md:px-5 sm:px-3 px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200">
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}