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
  User,
  Eye,
  EyeOff,
  UserCircle
} from 'lucide-react';
import {
  useAuth
} from '../context/AuthContext';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const {
    register
  } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    };
  }

  const validateForm = () => {
    const newErrors = {};
    if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    const {
      confirmPassword,
      ...userData
    } = formData;
    const result = await register(userData);
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
            Create Your Account
          </h2>
          <p>
            Join Code Arena and start your coding journey
          </p>
        </div>
        {
        /* Form */
        }
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white dark:bg-gray-800 p-8 rounded-1g shadow">
          <div>
            {
            /* Name */
            }
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div>
                <div>
                  <UserCircle className="h-5 w-5 text-gray-400" />
                </div>
                <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="appearance-none block w-full pl-10 pr-3 py-2 border border-" placeholder="John Doe" />
              </div>
            </div>
            {
            /* Username */
            }
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray">
                Username
              </label>
              <div>
                <div>
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input id="username" name="username" type="text" required value={formData.username} onChange={handleChange} className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'}`} placeholder="johndoe" />
              </div>
              {errors.username && (
                <p className="mt-2 text-sm text-red-600">{errors.username}</p>
              )}
            </div>
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
                <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="appearance-none block w-full pl-10 pr-3 py-2 border border-" placeholder="you@example.com" />
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
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} required value={formData.password} onChange={handleChange} className={`appearance-none block w-full pl-10 pr-10 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'}`} placeholder="Enter your password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            {
            /* Confirm Password */
            }
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium te">
                Confirm Password
              </label>
              <div>
                <div>
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} required value={formData.confirmPassword} onChange={handleChange} className={`appearance-none block w-full pl-10 pr-10 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`} placeholder="Confirm your password" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
          {
          /* Terms */
          }
          <div>
            <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 text-blue-600 focus: ring-blue-500 border-gray-300 rounde" />
            <label htmlFor="terms" className="m1-2 block text-sm text-gray-700 dark:te">
              I agree to the{' '}
              <a href="#">
                Terms and Conditions
              </a>
            </label>
          </div>
          {
          /* Submit Button */
          }
          <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rou">
            {loading ? (
              <div></div>
            ) : (
              'Create Account'
            )}
          </button>
          {
          /* Sign In Link */
          }
          <div>
            <p>
              Already have an account?{' '}
              <Link to="/signin" className="font-medium text-blue-600 hover: text-blue-">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;