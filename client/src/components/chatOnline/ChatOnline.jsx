import { useEffect, useState } from 'react';
import './ChatOnline.css';
import axios from 'axios';
import { PUBLIC_FOLDER } from '../../constant';

ChatOnline.propTypes = {};

function ChatOnline({ onlineUsers, currentId, setcurrentChat }) {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await axios.get('/users/friends/' + currentId);
            setFriends(res.data);
        })();
    }, [currentId]);

    useEffect(() => {
        setOnlineFriends(
            friends.filter((friend) => onlineUsers.includes(friend._id))
        );
    }, [onlineUsers, friends]);

    return (
        <div className="chatOnline">
            {onlineFriends.map((onlineFriend, index) => (
                <div key={index} className="chatOnlineFriend">
                    <div className="chatOnlineImgContainer">
                        <img
                            src={
                                onlineFriend.profilePicture
                                    ? PUBLIC_FOLDER +
                                      onlineFriend.profilePicture
                                    : PUBLIC_FOLDER + '/person/noAvatar.png'
                            }
                            alt=""
                        />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">
                        {onlineFriend.username}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default ChatOnline;
