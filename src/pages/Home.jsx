import Cards from "../components/Cards";
import Footer from "../components/Footer";
import Greeting from "../components/Greeting";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

const Home = () => {
    const { auth } = useAuth();

    return (
        <>
            <div className="bg-[#F5F3FF] min-h-screen">
                <div className="container mx-auto py-3">
                    <Header />
                    {
                        auth?.user && <Greeting />
                    }
                    <main className="bg-white p-6 rounded-md h-full">
                        <h3 className="text-2xl font-bold mb-6">Participate In Quizees</h3>
                        <Cards />
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Home;