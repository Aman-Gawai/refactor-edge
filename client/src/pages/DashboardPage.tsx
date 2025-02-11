import { useAuth } from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function DashboardPage() {
  const { user } = useAuth();
  
  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data } = await axios.get('/api/courses');
      return data;
    }
  });

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user?.username}!</h1>
        <p className="text-gray-600">
          {user?.role === 'student' 
            ? 'Browse your enrolled courses below'
            : 'Manage your courses and students'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course: any) => (
          <div key={course.id} className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-blue-600 font-medium">
                {course.progress}% Complete
              </span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                Continue
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
