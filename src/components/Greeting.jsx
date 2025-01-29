/* eslint-disable react/prop-types */
import avatar from '../assets/avater.webp'
import { useAuth } from '../context/AuthContext';

const Greeting = () => {
    const { auth } = useAuth()
    return (
        <div className="text-center my-12">
            <img src={avatar} alt="Profile Picture"
                className="w-32 h-32 rounded-full border-4 border-primary mx-auto mb-4 object-cover" />
            <p className="text-xl text-gray-600">Welcome</p>
            <h2 className="text-4xl font-bold text-gray-700" style={{ fontFamily: 'Jaro' }}>{auth?.user?.full_name}</h2>
        </div>
    );
};

export default Greeting;