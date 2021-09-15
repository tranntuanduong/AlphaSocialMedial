import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import LabelIcon from '@material-ui/icons/Label';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import RoomIcon from '@material-ui/icons/Room';
import { useRef, useState } from 'react';
import { PUBLIC_FOLDER } from '../../constant';
import './Share.css';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';

function Share({ user }) {
    const desc = useRef();
    const [file, setFile] = useState();

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        };

        if (file) {
            const formData = new FormData();
            const fileName = Date.now() + file.name;

            // append name before file to prevent proxy error
            formData.append('name', fileName);
            formData.append('file', file);
            newPost.img = `/${fileName}`;
            for (var p of formData) {
                console.log(p);
            }
            try {
                await axios.post('/upload', formData);
            } catch (error) {
                console.log(error);
            }
        }

        console.log(newPost);
        try {
            await axios.post('/posts', newPost);

            // can create a post conext and update post state also
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        className="shareProfileImg"
                        src={`${PUBLIC_FOLDER}/${
                            user.profilePicture
                                ? user.profilePicture
                                : '/person/noAvatar.png'
                        }`}
                        alt=""
                    />

                    <input
                        placeholder={`What's in your mind ${user.username}?`}
                        className="shareInput"
                        ref={desc}
                    />
                </div>

                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img
                            src={URL.createObjectURL(file)}
                            alt=""
                            className="shareImg"
                        />
                        <CloseIcon
                            className="shareCancleImg"
                            onClick={() => setFile(null)}
                        />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMediaIcon
                                htmlColor="tomato"
                                className="shareIcon"
                            />
                            <span className="shareOptionText">
                                Photo or Video
                            </span>
                            <input
                                style={{ display: 'none' }}
                                type="file"
                                id="file"
                                accept=".png, .jpeg, .jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <LabelIcon htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <RoomIcon htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotionsIcon
                                htmlColor="goldenrod"
                                className="shareIcon"
                            />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                        <button className="shareButton" type="submit">
                            Share
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Share;
