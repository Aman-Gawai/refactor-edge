import { useAuth } from '../../lib/auth';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const getMenuItems = () => {
    const items = [
      { path: '/dashboard/student', label: 'My Courses', roles: ['student'] },
      { path: '/dashboard/teacher', label: 'Course Management', roles: ['teacher'] },
      { path: '/dashboard/admin', label: 'Admin Panel', roles: ['admin'] },
    ];

    return items.filter(item => item.roles.includes(user.role));
  };

  return (
    <aside className="w-64 bg-gray-800 min-h-screen">
      <nav className="mt-5 px-2">
        {getMenuItems().map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              group flex items-center px-2 py-2 text-sm font-medium rounded-md
              ${location.pathname === item.path
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }
            `}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
