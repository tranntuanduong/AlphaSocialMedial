import Feed from '../../components/feed/Feed';
import RightBar from '../../components/rightbar/Rightbar';
import SideBar from '../../components/sidebar/Sidebar';
import './Profile.css';

function Profile(props) {
    return (
        <div className="profile">
            <SideBar />
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img src="/assets/post/3.jpeg" alt="" className="profileCoverImg" />
                        <img src="/assets/person/7.jpeg" alt="" className="profileUserImg" />
                    </div>
                    <div className="profileInfo">
                        <h4 className="profileInfoName">Safak Kocaoglu</h4>
                        <span className="profileInfoDesc">Hello my friend</span>
                    </div>
                </div>
                <div className="profileRightBottom">
                    <Feed />
                    <RightBar profile />
                </div>
            </div>
        </div>
    );
}

export default Profile;
