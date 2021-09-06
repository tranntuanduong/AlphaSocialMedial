import Post from '../post/Post';
import Share from '../share/Share';
import './Feed.css';
import { Posts } from '../../dummyData';

function Feed(props) {
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {Posts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}

export default Feed;
