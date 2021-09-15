import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import Conversation from '../../components/conversation/Conversation';
import Message from '../../components/message/Message';
import Topbar from '../../components/topbar/Topbar';
import { AuthContext } from '../../context/AuthContext';
import './Messenger.css';
import { io } from 'socket.io-client';

Messenger.propTypes = {};

function Messenger(props) {
    console.log('dsdsd');
    const [conversations, setConversations] = useState([]);
    const [currentChat, setcurrentChat] = useState();
    const [messages, setMessages] = useState([]);
    const [chatFriend, setChatFriend] = useState({});
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState('');
    const [onlineUsers, setOnlineUsers] = useState([]);

    const { user: currentUser } = useContext(AuthContext);
    const scrollRef = useRef();
    const socket = useRef();

    useEffect(() => {
        console.log('1');
        socket.current = io('ws://localhost:8900');
        socket.current.on('getMessage', (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        console.log('2');
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        console.log('3');
        socket.current.emit('addUser', currentUser._id);
        socket.current.on('getUsers', (users) => {
            setOnlineUsers(
                currentUser.followings.filter((f) =>
                    users.some((u) => u.userId === f)
                )
            );
        });
    }, [currentUser]);

    useEffect(() => {
        console.log('4');
        (async () => {
            try {
                const res = await axios.get(
                    '/conversations/' + currentUser._id
                );
                setConversations(res.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [currentUser._id]);

    useEffect(() => {
        console.log('5');
        (async () => {
            try {
                const res = await axios.get('/messages/' + currentChat?._id);
                setMessages(res.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [currentChat]);

    const handleConversationClick = (cov) => {
        setcurrentChat(cov);
        const friendId = cov.members.find(
            (member) => member !== currentUser._id
        );

        // get friend chat
        (async () => {
            const res = await axios.get('/users?userId=' + friendId);
            setChatFriend(res.data);
        })();
    };

    const handleSubmitMessage = (e) => {
        (async () => {
            setNewMessage('');
            const message = {
                sender: currentUser._id,
                text: newMessage,
                conversationId: currentChat._id,
            };

            const receiverId = currentChat.members.find(
                (member) => member !== currentUser._id
            );

            socket.current.emit('sendMessage', {
                senderId: currentUser._id,
                receiverId: receiverId,
                text: newMessage,
            });

            try {
                const res = await axios.post('/messages', message);
                setMessages([...messages, res.data]);

                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        })();
    };

    useEffect(() => {
        console.log('6');
        scrollRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [messages]);

    return (
        <div className="container">
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input
                            type="text"
                            placeholder="Search for friends"
                            className="chatMenuInput"
                        />
                        {conversations.map((cov) => (
                            <div
                                onClick={() => handleConversationClick(cov)}
                                key={cov._id}
                            >
                                <Conversation
                                    conversation={cov}
                                    currentUser={currentUser}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages.map((message, index) => (
                                        <div key={index} ref={scrollRef}>
                                            <Message
                                                message={message}
                                                own={
                                                    message.sender ===
                                                    currentUser._id
                                                        ? true
                                                        : false
                                                }
                                                chatFriend={chatFriend}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        name=""
                                        id=""
                                        cols="30"
                                        rows="10"
                                        value={newMessage}
                                        onChange={(e) =>
                                            setNewMessage(e.target.value)
                                        }
                                        className="chatMessageInput"
                                    ></textarea>

                                    <button
                                        className="chatMessageBtn"
                                        onClick={handleSubmitMessage}
                                    >
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversation">
                                Open a conversation to start a chat
                            </span>
                        )}
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline
                            onlineUsers={onlineUsers}
                            currentId={currentUser._id}
                            setcurrentChat={setcurrentChat}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Messenger;
