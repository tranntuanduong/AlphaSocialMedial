import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_FOLDER } from '../../constant';
import { AuthContext } from '../../context/AuthContext';
import { Users } from '../../dummyData';
import Online from '../online/Online';
import './Rightbar.css';

function RightBar({ user }) {
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                // check for home page:
                if (user) {
                    // check for profile page
                    if (
                        !(Object.keys(user).length === 0) ||
                        !(user.constructor === Object)
                    ) {
                        console.log(user);

                        const friendList = await axios.get(
                            `/users/friends/${user?._id}`
                        );
                        setFriends(friendList.data);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, [user]);

    useEffect(() => {
        setFollowed(currentUser.followings.includes(user?._id));
    }, [user, currentUser]);

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img
                        src={`${PUBLIC_FOLDER}/gift.png`}
                        alt=""
                        className="birthdayImg"
                    />
                    <span className="birthdayText">
                        <b>Pola foster</b> and <b>3 other friends</b> have a
                        birthday today
                    </span>
                </div>
                <img
                    src={`${PUBLIC_FOLDER}/ad.png`}
                    alt=""
                    className="rightbarAd"
                />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map((user) => (
                        <Online key={user.id} user={user} />
                    ))}
                    {Users.map((user) => (
                        <Online key={user.id} user={user} />
                    ))}
                </ul>
            </>
        );
    };

    const followHandler = async () => {
        try {
            if (followed) {
                await axios.put(`/users/${user._id}/unfollow`, {
                    userId: currentUser._id,
                });
                dispatch({ type: 'UNFOLLOW', payload: user._id });
            } else {
                await axios.put(`/users/${user._id}/follow`, {
                    userId: currentUser._id,
                });
                dispatch({ type: 'FOLLOW', payload: user._id });
            }
            setFollowed(!followed);
        } catch (error) {
            console.log(error);
        }
    };

    const ProfileRightbar = () => {
        return (
            <>
                {user.username !== currentUser.username && (
                    <button
                        className="rightbarFollowBtn"
                        onClick={followHandler}
                    >
                        {followed ? 'Unfollow' : 'Follow'}
                        {followed ? <RemoveIcon /> : <AddIcon />}
                    </button>
                )}
                <h4 className="rightbarTitle">User infomation</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City: </span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From: </span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship: </span>
                        <span className="rightbarInfoValue">
                            {user.relationship === 1 ? 'Single' : 'Married'}
                        </span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User friend</h4>
                <div className="rightbarFollowings">
                    {friends.map((friend) => (
                        <Link
                            key={friend._id}
                            to={'/profile/' + friend.username}
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="rightbarFollowing">
                                <img
                                    src={
                                        friend.profilePicture
                                            ? `${PUBLIC_FOLDER}/${friend.profilePicture}`
                                            : `${PUBLIC_FOLDER}/noAvatar.png`
                                    }
                                    alt=""
                                    className="rightbarFollowingImg"
                                />
                                <span className="rightbarFollowingName">
                                    {friend.username}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        );
    };

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    );
}

export default RightBar;
