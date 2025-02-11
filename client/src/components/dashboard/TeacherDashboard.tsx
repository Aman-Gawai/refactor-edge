import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';

const TeacherDashboard = () => {
  const { data: courses, isLoading } = useQuery(['teacherCourses'], () =>
    api.get('/api/courses/teaching')
  );

  if (isLoading) {
    return <div>Loading your courses...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Courses
        </h2>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">
          Create New Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course: any) => (
          <div
            key={course._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {course.title}
              </h3>
              <span className={`px-2 py-1 rounded text-sm ${
                course.status === 'published'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {course.status}
              </span>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {course.description}
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {course.enrolledStudents?.length || 0} students enrolled
              </span>
              <button className="text-indigo-600 hover:text-indigo-700">
                Edit Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboard;