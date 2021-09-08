import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { PUBLIC_FOLDER } from '../../constant';
import { AuthContext } from '../../context/AuthContext';
import './Post.css';

function Post({ post }) {
    const [like, setLike] = useState(post.likes.length);
    const [postAuthor, setPostAuthor] = useState({});
    const { user: currentUser } = useContext(AuthContext);
    const [isLike, setIsLike] = useState(post.likes.includes(currentUser._id));

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const res = await axios.get(`/users?userId=${post.userId}`);

                if (mounted) {
                    setPostAuthor(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [post.userId]);

    const handleLikeClick = async () => {
        try {
            setLike(isLike ? like - 1 : like + 1);
            setIsLike(!isLike);
            await axios.put(`/posts/${post._id}/likes`, {
                userId: currentUser._id,
            });
        } catch (error) {
            console.log(error);
        }
        // if (isLike) {
        //     setLikeColor('#333');
        //     setLike(like - 1);
        // } else {
        //     setLikeColor('#5991ff');
        //     setLike(like + 1);
        // }
        // setIsLike(!isLike);
    };

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${postAuthor.username}`}>
                            <img
                                src={`${PUBLIC_FOLDER}/${
                                    postAuthor.profilePicture
                                        ? postAuthor.profilePicture
                                        : '/person/noAvatar.png'
                                }`}
                                alt=""
                                className="postProfileImg"
                            />
                        </Link>

                        <span className="postUserName">
                            {postAuthor.username}
                        </span>
                        <span className="postDate">
                            {format(post.createdAt)}
                        </span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertIcon />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img
                        src={PUBLIC_FOLDER + post.img}
                        alt=""
                        className="postImg"
                    />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <span
                            className="postLikeBtn"
                            onClick={handleLikeClick}
                            style={{ color: isLike ? '#5991ff' : '#333' }}
                        >
                            Like
                        </span>

                        {like >= 1 && (
                            <>
                                <img
                                    className="likeIcon"
                                    src={`${PUBLIC_FOLDER}/like.png`}
                                    alt=""
                                />

                                <span className="postLikecounter">
                                    {like} peoples like it
                                </span>
                            </>
                        )}
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">
                            {post.comment} comments
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
