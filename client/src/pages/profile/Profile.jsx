import { useEffect, useState } from 'react';
import Feed from '../../components/feed/Feed';
import RightBar from '../../components/rightbar/Rightbar';
import SideBar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import './Profile.css';
import axios from 'axios';
import { PUBLIC_FOLDER } from '../../constant';
import { useParams } from 'react-router-dom';

function Profile(props) {
    const [user, setUser] = useState({});
    const params = useParams();

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(
                    `/users?username=${params.username}`
                );
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [params.username]);

    return (
        <>
            <Topbar />
            <div className="profile">
                <SideBar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                src={`${PUBLIC_FOLDER}/post/3.jpeg`}
                                alt=""
                                className="profileCoverImg"
                            />

                            <img
                                src={`${PUBLIC_FOLDER}/${
                                    user.profilePicture
                                        ? user.profilePicture
                                        : '/person/noAvatar.png'
                                }`}
                                alt=""
                                className="profileUserImg"
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed userParams={params.username} />
                        <RightBar user={user} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
