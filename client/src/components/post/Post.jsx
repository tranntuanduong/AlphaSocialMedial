import './Post.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Users } from '../../dummyData';
import { useState } from 'react';

function Post({ post }) {
    const { username, profilePicture } = Users.filter((user) => user.id === post.userId)[0];
    const [like, setLike] = useState(post.like);
    const [isLike, setIsLike] = useState(false);
    const [likeColor, setLikeColor] = useState('#333');

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
                        <img src={`/${profilePicture}`} alt="" className="postProfileImg" />
                        <span className="postUserName">{username}</span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertIcon />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={`/${post.photo}`} alt="" className="postImg" />
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
                                <img className="likeIcon" src="/assets/like.png" alt="" />
                                <img className="likeIcon" src="/assets/heart.png" alt="" />
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
