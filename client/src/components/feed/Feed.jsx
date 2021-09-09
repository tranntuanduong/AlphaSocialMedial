import { useContext, useEffect, useState } from 'react';
import Share from '../share/Share';
import './Feed.css';
import axios from 'axios';
import Post from '../post/Post';
import { AuthContext } from '../../context/AuthContext';

function Feed({ userParams }) {
    console.log(userParams);
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const res = userParams
                    ? await axios.get('/posts/profile/' + userParams)
                    : await axios.get(`/posts/timeline/${user._id}`); //get id from auth

                if (mounted) {
                    setPosts(
                        res.data.sort((p1, p2) => {
                            return (
                                new Date(p2.createdAt) - new Date(p1.createdAt)
                            );
                        })
                    );
                }
            } catch (error) {
                console.log(error);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [userParams, user._id]);
    return (
        <div className="feed">
            <div className="feedWrapper">
                {(userParams === user.username || !userParams) && (
                    <Share user={user} />
                )}
                {posts.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
}

export default Feed;
