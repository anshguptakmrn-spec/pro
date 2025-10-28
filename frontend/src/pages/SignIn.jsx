import {
  useState
} from 'react';
import {
  Link,
  useNavigate
} from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import {
  useAuth
} from '../context/AuthContext';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    login
  } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(formData);
    if (result.success) {
      navigate('/problems');
    }
    setLoading(false);
  };

  return (
    <div>
      <div>
        {
        /* Header */
        }
        <div>
          <h2>
            Welcome Back
          </h2>
          <p>
            Sign in to continue your coding journey
          </p>
        </div>
        {
        /* Form */
        }
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white dark:bg-gray-800 p-8 rounded-1g shadow">
          <div>
            {
            /* Email */
            }
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-76">
                Email Address
              </label>
              <div>
                <div>
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="appearance-none block w-full pl-10 pr-3 py-2 border border-g" placeholder="you@example.com" />
              </div>
            </div>
            {
            /* Password */
            }
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray">
                Password
              </label>
              <div>
                <div>
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} required value={formData.password} onChange={handleChange} className="appearance-none block w-full pl-10 pr-10 py-2 border border-" placeholder="Enter your password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover: text-gray-600 dark:" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover: text-gray-600 dark:hov" />
                  )}
                </button>
              </div>
            </div>
          </div>
          {
          /* Remember & Forgot */
          }
          <div>
            <div>
              <input id="remember" name="remember" type="checkbox" className="h-4 w-4 text-blue-600 focus: ring-blue-500 border-gray-300 rour" />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 da">
                Remember me
              </label>
            </div>
            <div>
              <a href="#">
                Forgot password?
              </a>
            </div>
          </div>
          {
          /* Submit Button */
          }
          <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rou">
            {loading ? (
              <div></div>
            ) : (
              'Sign In'
            )}
          </button>
          {
          /* Sign Up Link */
          }
          <div>
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover: text-blue-">
                Sign up for free
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;