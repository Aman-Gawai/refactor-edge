import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';

const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery(['adminStats'], () =>
    api.get('/api/admin/stats')
  );

  if (isLoading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Total Users
          </h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">
            {stats?.totalUsers || 0}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Active Courses
          </h3>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {stats?.activeCourses || 0}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Total Revenue
          </h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            ₹{stats?.totalRevenue || 0}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activities
          </h3>
          <div className="mt-4 space-y-4">
            {stats?.recentActivities?.map((activity: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700"
              >
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-sm ${
                  activity.type === 'enrollment'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {activity.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;