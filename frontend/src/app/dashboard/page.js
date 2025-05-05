
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");

    // Redirect to the login page
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <nav className="flex gap-4">
            <Link href="/dashboard" className="hover:underline">
              Home
            </Link>
            <Link href="/dashboard/posts" className="hover:underline">
              Manage Posts
            </Link>
            <Link href="/dashboard/analytics" className="hover:underline">
              Analytics
            </Link>
            <button
              onClick={handleLogout}
              className="hover:underline text-white"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Manage Posts */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Manage Posts</h3>
            <p className="text-gray-600">
              Create, edit, and delete your blog posts with ease.
            </p>
            <Link
              href="api/create"
              className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Go to Posts
            </Link>
          </div>

          {/* View Analytics */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">View Analytics</h3>
            <p className="text-gray-600">
              Track your blog's performance with detailed analytics.
            </p>
            <Link
              href="/dashboard/analytics"
              className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              View Analytics
            </Link>
          </div>

          {/* Settings */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Settings</h3>
            <p className="text-gray-600">
              Customize your account and application settings.
            </p>
            <Link
              href="/dashboard/settings"
              className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Go to Settings
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Inkwave. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
