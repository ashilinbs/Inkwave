"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  const cards = [
    {
      title: "Manage Posts",
      description: "Create, edit, and delete your blog posts with ease.",
      href: "/dashboard/posts",
      icon: "📝",
      button: "Go to Posts",
    },
    {
      title: "View Analytics",
      description: "Track your blog's performance with detailed analytics.",
      href: "/dashboard/analytics",
      icon: "📊",
      button: "View Analytics",
    },
    {
      title: "Settings",
      description: "Customize your account and application settings.",
      href: "/dashboard/settings",
      icon: "⚙️",
      button: "Go to Settings",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
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
      <main className="container mx-auto px-6 py-12 flex-grow">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Welcome to Your Dashboard
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map(({ title, description, href, icon, button }) => (
            <div
              key={title}
              className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-xl rounded-2xl p-6 transform transition-transform duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{title}</h3>
              <p className="text-gray-600 mb-4">{description}</p>
              <Link
                href={href}
                className="inline-block bg-blue-600 text-white py-2 px-5 rounded-full hover:bg-blue-700 transition"
              >
                {button}
              </Link>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Inkwave. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
