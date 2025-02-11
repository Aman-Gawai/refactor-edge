import { useAuth } from '../../lib/auth';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                Refactor Edge
              </h1>
            </div>
          </div>

          {user && (
            <div className="flex items-center">
              <span className="text-gray-700 dark:text-gray-300 mr-4">
                {user.name} ({user.role})
              </span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
