function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-2xl text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
          Authentication & Protected Routing
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Secure your application with login, logout, and role-based access
          using modern tools like{" "}
          <span className="font-semibold text-blue-600">React</span>,
          <span className="font-semibold text-indigo-600"> TanStack Query</span>
          , and
          <span className="font-semibold text-teal-600"> Redux</span>.
        </p>
      </div>
    </div>
  );
}

export default Home;
