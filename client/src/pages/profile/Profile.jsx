import { useEffect, useState } from 'react';
import Feed from '../../components/feed/Feed';
import RightBar from '../../components/rightbar/Rightbar';
import SideBar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import './Profile.css';
import axios from 'axios';
import { PUBLIC_FOLDER } from '../../constant';

function Profile(props) {
    const [user, setUser] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('/users?username=jun');
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <>
            <Topbar />
            <div className="profile">
                <SideBar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src="/assets/post/3.jpeg" alt="" className="profileCoverImg" />

                            {user.profilePicture && (
                                <img
                                    src={PUBLIC_FOLDER + user.profilePicture}
                                    alt=""
                                    className="profileUserImg"
                                />
                            )}
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username="jun" />
                        <RightBar user={user} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
