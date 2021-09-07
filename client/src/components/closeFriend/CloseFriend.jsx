import { PUBLIC_FOLDER } from '../../constant';
import './CloseFriend.css';

function CloseFriend({ user }) {
    return (
        <li className="sidebarFriend">
            <img
                src={`${PUBLIC_FOLDER + user.profilePicture}`}
                alt=""
                className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    );
}

export default CloseFriend;
