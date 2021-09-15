import './Message.css';
import { format } from 'timeago.js';
import { PUBLIC_FOLDER } from '../../constant';
Message.propTypes = {};

function Message({ own, message, chatFriend }) {
    return (
        <>
            {own ? (
                <>
                    <div className="message own">
                        <div className="messageTop">
                            <p className="messageText">{message.text}</p>
                        </div>
                        <div className="messageBottom">
                            {format(message.createdAt)}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="message">
                        <div className="messageTop">
                            <img
                                className="messageImg"
                                src={
                                    chatFriend.profilePicture
                                        ? PUBLIC_FOLDER +
                                          chatFriend.profilePicture
                                        : PUBLIC_FOLDER + '/person/noAvatar.png'
                                }
                                alt=""
                            />
                            <p className="messageText">{message.text}</p>
                        </div>
                        <div className="messageBottom">
                            {format(message.createdAt)}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Message;
