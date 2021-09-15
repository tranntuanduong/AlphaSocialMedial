import { useEffect, useState } from 'react';
import './Conversation.css';
import axios from 'axios';
import { PUBLIC_FOLDER } from '../../constant';

Conversation.propTypes = {};

function Conversation({ conversation, currentUser }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        const friendId = conversation.members.find(
            (member) => member !== currentUser._id
        );
        (async () => {
            try {
                const friend = await axios.get('/users?userId=' + friendId);
                setUser(friend.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [currentUser, conversation]);

    return (
        <div className="conversation">
            <img
                src={
                    user.profilePicture
                        ? PUBLIC_FOLDER + user.profilePicture
                        : PUBLIC_FOLDER + '/person/noAvatar.png'
                }
                alt={user.username}
                className="conversationImg"
            />
            <span className="conversationName">{user.username}</span>
        </div>
    );
}

export default Conversation;
