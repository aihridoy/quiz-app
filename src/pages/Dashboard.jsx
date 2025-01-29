import DashBoardContent from "../components/DashBoardContent";
import SideBar from "../components/SideBar";

const Dashboard = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex">
            <SideBar />
            <DashBoardContent />
        </div>
    );
};

export default Dashboard;