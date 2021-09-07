import Feed from '../../components/feed/Feed';
import RightBar from '../../components/rightbar/Rightbar';
import SideBar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import './Home.css';

function Home(props) {
    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <SideBar />
                <Feed />
                <RightBar />
            </div>
        </>
    );
}

export default Home;
