import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import './Topbar.css';
function Topbar(props) {
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" className="topbarLeftHome">
                    <span className="logo">AlphaSocial</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <SearchIcon className="searchIcon" />
                    <input placeholder="Search for friend, post or video" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <Link to="/profile">
                        <img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
                    </Link>
                    <div className="topbarIconItem">
                        <PersonIcon />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <ChatIcon style={{ fontSize: '20px' }} />
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <NotificationsIcon />
                        <span className="topbarIconBadge">7</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topbar;
