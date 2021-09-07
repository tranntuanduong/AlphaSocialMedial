import { useEffect, useState } from 'react';
import Share from '../share/Share';
import './Feed.css';
import axios from 'axios';
import Post from '../post/Post';

function Feed({ username }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const res = username
                    ? await axios.get('/posts/profile/' + username)
                    : await axios.get('posts/timeline/6134f105fa0686bfa01af1d6');

                if (mounted) {
                    setPosts(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [username]);
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {posts.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
}

export default Feed;
