import './Rightbar.css';
import { Users } from '../../dummyData';
import Online from '../online/Online';
import { PUBLIC_FOLDER } from '../../constant';

function RightBar({ user }) {
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

    const ProfileRightbar = () => {
        return (
            <>
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
                    <div className="rightbarFollowing">
                        <img
                            src={`${PUBLIC_FOLDER}/person/5.jpeg`}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">
                            John Carter
                        </span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={`${PUBLIC_FOLDER}/person/2.jpeg`}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">
                            Safak Kocaoglu
                        </span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={`${PUBLIC_FOLDER}/person/1.jpeg`}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">
                            Janell Shrum
                        </span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={`${PUBLIC_FOLDER}/person/5.jpeg`}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">
                            John Carter
                        </span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={`${PUBLIC_FOLDER}/person/5.jpeg`}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">
                            John Carter
                        </span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={`${PUBLIC_FOLDER}/person/5.jpeg`}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">
                            John Carter
                        </span>
                    </div>
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
