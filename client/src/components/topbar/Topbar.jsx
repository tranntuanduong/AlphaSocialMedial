import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import './Topbar.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { PUBLIC_FOLDER } from '../../constant';
function Topbar(props) {
    const { user } = useContext(AuthContext);
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
                    <input
                        placeholder="Search for friend, post or video"
                        className="searchInput"
                    />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <Link to={`/profile/${user.username}`}>
                        <img
                            src={`${PUBLIC_FOLDER}/${
                                user.profilePicture
                                    ? user.profilePicture
                                    : '/person/noAvatar.png'
                            }`}
                            alt=""
                            className="topbarImg"
                        />
                    </Link>
                    <div className="topbarIconItem">
                        <PersonIcon />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <Link to="/messenger" className="topbarIconItem">
                        <ChatIcon style={{ fontSize: '20px' }} />
                        <span className="topbarIconBadge">2</span>
                    </Link>
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
