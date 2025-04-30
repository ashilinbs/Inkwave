import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      {/* Header */}
      <header className="w-full bg-blue-600 text-white py-4 shadow-md z-10">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold">Inkwave</h1>
          <nav className="flex gap-4">
            <Link href="/auth/login" className="hover:underline">
              Login
            </Link>
            <Link href="/auth/register" className="hover:underline">
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center px-6 py-12 z-10">
        <Image
          src="/blog-logo.svg"
          alt="Blog CMS Logo"
          width={150}
          height={150}
          className="mb-6 animate-bounce"
        />
        <h2 className="text-5xl font-bold text-gray-800 mb-4">
          Welcome to Inkwave
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Manage your blog content effortlessly with our powerful and intuitive
          content management system.
        </p>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white shadow-md rounded-lg p-6 hover:scale-105 transition-transform duration-300">
            <Image
              src="/easy-to-use.svg"
              alt="Easy to Use"
              width={50}
              height={50}
              className="mb-4 mx-auto"
            />
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Easy to Use
            </h3>
            <p className="text-gray-600">
              Create, edit, and manage your blog posts with a user-friendly
              interface.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 hover:scale-105 transition-transform duration-300">
            <Image
              src="/secure.svg"
              alt="Secure"
              width={50}
              height={50}
              className="mb-4 mx-auto"
            />
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Secure
            </h3>
            <p className="text-gray-600">
              Your data is safe with our robust security features.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 hover:scale-105 transition-transform duration-300">
            <Image
              src="/customizable.svg"
              alt="Customizable"
              width={50}
              height={50}
              className="mb-4 mx-auto"
            />
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Customizable
            </h3>
            <p className="text-gray-600">
              Tailor the platform to suit your blogging needs.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <section className="bg-gray-100 shadow-md rounded-lg p-6 mb-12 w-full max-w-4xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            How It Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <Image
                src="/create.svg"
                alt="Create Content"
                width={50}
                height={50}
                className="mb-4 mx-auto"
              />
              <h4 className="text-lg font-semibold text-blue-600 mb-2">
                Create Content
              </h4>
              <p className="text-gray-600">
                Start by creating engaging blog posts with our intuitive editor.
              </p>
            </div>
            <div className="text-center">
              <Image
                src="/publish.svg"
                alt="Publish"
                width={50}
                height={50}
                className="mb-4 mx-auto"
              />
              <h4 className="text-lg font-semibold text-blue-600 mb-2">
                Publish
              </h4>
              <p className="text-gray-600">
                Publish your content instantly or schedule it for later.
              </p>
            </div>
            <div className="text-center">
              <Image
                src="/analyze.svg"
                alt="Analyze"
                width={50}
                height={50}
                className="mb-4 mx-auto"
              />
              <h4 className="text-lg font-semibold text-blue-600 mb-2">
                Analyze Performance
              </h4>
              <p className="text-gray-600">
                Track your blog's performance with detailed analytics.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-12 w-full max-w-4xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            What Our Users Say
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="text-gray-600 italic">
                "Inkwave has completely transformed how I manage my blog. It's
                so easy to use!"
              </p>
              <p className="text-blue-600 font-bold mt-2">- Jane Doe</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <p className="text-gray-600 italic">
                "The security features give me peace of mind. Highly
                recommended!"
              </p>
              <p className="text-blue-600 font-bold mt-2">- John Smith</p>
            </div>
          </div>
        </section>

        {/* Call-to-Action */}
        <div className="flex gap-4">
          <Link
            href="/auth/register"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            Get Started
          </Link>
          <Link
            href="/auth/login"
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors duration-300"
          >
            Login
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white py-4 mt-auto z-10">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Inkwave. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}