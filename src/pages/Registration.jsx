import RegistrationBanner from '../components/RegistrationBanner';
import RegistrationInputFields from '../components/RegistrationInputFields';

const Registration = () => {
    return (
        <div className='bg-white text-gray-800'>
            <div className='flex min-h-screen max-h-screen'>
                <RegistrationBanner />
                <RegistrationInputFields />
            </div>
        </div>
    );
};

export default Registration;