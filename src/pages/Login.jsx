import LoginBanner from '../components/LoginBanner';
import LoginInputFields from '../components/LoginInputFields';

const Login = () => {
    return (
        <div className='bg-white text-gray-800 overflow-hidden'>
            <div className='flex min-h-screen'>
                <LoginBanner />
                <LoginInputFields />
            </div>
        </div>
    );
};

export default Login;