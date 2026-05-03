'use client'
import { useRouter } from 'next/navigation';
import Link from "next/link"
import { useState } from "react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter();

const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  setError("")

  try {
    
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),

      credentials: "include", // 🔥 THIS IS CRITICAL
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message)
    }

    // ✅ Redirect after login
    // window.location.href = "/dashboard"
    // router.push("/dashboard")
    window.location.href = "/dashboard";

  } catch (err) {
    setError(err.message || "Login failed")
  } finally {
    setLoading(false)
  }
}
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        
        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Login to your account
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* ❌ Error Message */}
          {error && (
            <div className="bg-red-100 text-red-700 text-sm p-3 rounded-lg border border-red-300">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 transition ${
                error ? "border-red-400 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
              }`}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 transition ${
                error ? "border-red-400 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
              }`}
              required
            />
          </div>

          <div className="text-right text-sm">
            <Link href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

