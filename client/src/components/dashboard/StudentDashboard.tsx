import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';

const StudentDashboard = () => {
  const { data: courses, isLoading } = useQuery(['enrolledCourses'], () =>
    api.get('/api/courses/enrolled')
  );

  if (isLoading) {
    return <div>Loading your courses...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        My Courses
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course: any) => (
          <div
            key={course._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {course.title}
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {course.description}
            </p>
            <div className="mt-4">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="bg-indigo-600 rounded-full h-2"
                  style={{ width: `${course.progress || 0}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {course.progress || 0}% Complete
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;