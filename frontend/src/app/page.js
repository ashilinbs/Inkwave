import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Header */}
      <header className="w-full bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold">Inkwave</h1>
          <nav className="flex gap-4">
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center text-center px-6 py-12">
        <Image
          src="/blog-logo.svg"
          alt="Blog CMS Logo"
          width={150}
          height={150}
          className="mb-6"
        />
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Inkwave
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Manage your blog content effortlessly with our powerful and intuitive
          content management system.
        </p>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Easy to Use
            </h3>
            <p className="text-gray-600">
              Create, edit, and manage your blog posts with a user-friendly
              interface.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Secure
            </h3>
            <p className="text-gray-600">
              Your data is safe with our robust security features.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Customizable
            </h3>
            <p className="text-gray-600">
              Tailor the platform to suit your blogging needs.
            </p>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="flex gap-4">
          <Link
            href="/auth/register"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Get Started
          </Link>
          <Link
            href="/auth/login"
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
          >
            Login
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white py-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Inkwave. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}