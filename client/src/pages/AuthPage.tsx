import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthForm from '../components/auth/AuthForm';

export default function AuthPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center">
        <AuthForm />
      </div>
      
      <div className="hidden lg:flex flex-1 bg-blue-600 items-center justify-center">
        <div className="max-w-md text-white p-8">
          <h1 className="text-4xl font-bold mb-6">Welcome to Refactor Edge</h1>
          <p className="text-xl mb-4">
            Your gateway to professional online courses in:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Digital Marketing Agency</li>
            <li>AI SAAS Automation</li>
            <li>AI Agents for Business</li>
            <li>Ad Architect</li>
            <li>Drop-Shipping</li>
            <li>Copywriting</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
