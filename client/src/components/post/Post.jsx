import './Post.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useEffect, useState } from 'react';
import { PUBLIC_FOLDER } from '../../constant';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

function Post({ post }) {
    const [like, setLike] = useState(post.likes.length);
    const [isLike, setIsLike] = useState(false);
    const [likeColor, setLikeColor] = useState('#333');
    const [user, setUser] = useState({});

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const res = await axios.get(`/users?userId=${post.userId}`);

                if (mounted) {
                    setUser(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [post.userId]);

    const handleLikeClick = () => {
        if (isLike) {
            setLikeColor('#333');
            setLike(like - 1);
        } else {
            setLikeColor('#5991ff');
            setLike(like + 1);
        }
        setIsLike(!isLike);
    };

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img
                                src={`${PUBLIC_FOLDER}/${
                                    user.profilePicture
                                        ? user.profilePicture
                                        : '/person/noAvatar.png'
                                }`}
                                alt=""
                                className="postProfileImg"
                            />
                        </Link>

                        <span className="postUserName">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertIcon />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={PUBLIC_FOLDER + post.img} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <span
                            className="postLikeBtn"
                            onClick={handleLikeClick}
                            style={{ color: likeColor }}
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

                                <span className="postLikecounter">{like} peoples like it</span>
                            </>
                        )}
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
