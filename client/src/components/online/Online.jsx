import { PUBLIC_FOLDER } from '../../constant';
import './Online.css';

function Online({ user }) {
    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img
                    src={PUBLIC_FOLDER + user.profilePicture}
                    alt=""
                    className="rightbarProfileImg"
                />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.username}</span>
        </li>
    );
}

export default Online;
