import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { storage, db } from "../firebase";
import firebase from "firebase";
import "./PostUpload.scss";

function PostUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };
  return (
    <div className="post-upload">
      <progress value={progress} max="100" />
      <input
        type="text"
        className="input-caption"
        placeholder="Enter a caption..."
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      <div className="last-row">
        <input
          type="file"
          onChange={handleChange}
          className="custom-file-input"
          id="file"
        />
        <label htmlFor="file" className="custom-file-input-label">
          Choose a Photo
        </label>
        <Button onClick={handleUpload} className="upload-btn">
          Post
        </Button>
      </div>
    </div>
  );
}

export default PostUpload;
