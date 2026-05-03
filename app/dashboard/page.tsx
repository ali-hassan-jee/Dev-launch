import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const SECRET = process.env.JWT_SECRET!;

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  let user;

  try {
    user = jwt.verify(token, SECRET) as {
      userId: string;
      email: string;
    };
  } catch {
    redirect("/login");
  }

  return (
  <div className="min-h-screen bg-gray-100 p-6">
    
    {/* Top Welcome Section */}
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Dashboard
      </h1>
      <p className="text-gray-600">
        Welcome back, <span className="font-medium">{user.email}</span>
      </p>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-gray-500 text-sm">Projects</h2>
        <p className="text-2xl font-bold mt-2">12</p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-gray-500 text-sm">Tasks Completed</h2>
        <p className="text-2xl font-bold mt-2">34</p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-gray-500 text-sm">Pending Tasks</h2>
        <p className="text-2xl font-bold mt-2">5</p>
      </div>

    </div>

    {/* Main Content Area */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left: Recent Activity */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Recent Activity
        </h2>

        <ul className="space-y-3 text-gray-600">
          <li>✔ Created new project "DevLaunch"</li>
          <li>✔ Completed authentication module</li>
          <li>✔ Fixed login bug</li>
          <li>✔ Added dashboard UI</li>
        </ul>
      </div>

      {/* Right: Profile Card */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Profile
        </h2>

        <p className="text-gray-700 mb-2">
          <span className="font-medium">Email:</span> {user.email}
        </p>

        <p className="text-gray-700 mb-4">
          <span className="font-medium">User ID:</span> {user.userId}
        </p>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Edit Profile
        </button>
      </div>

    </div>
  </div>
);
}