import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import request from "superagent";
import { BiCamera, BiDownload } from "react-icons/bi";
import cogoToast from "cogo-toast";
import { deleteMedia } from "../../api/methods";

import "./style.scss";

function ImageInput(props) {
  const onDrop = useCallback((acceptedFiles) => {
    handleUpload(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  const handleUpload = async (input) => {
    const media_urls = [];
    const url = process.env.REACT_APP_CLOUDINARY_URL;

    for (let file of input) {
      document.body.classList.add("loading-indicator");
      try {
        const response_x = await request
          .post(url)
          .field(
            "upload_preset",
            process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
          )
          .field("file", file)
          .field("folder", process.env.REACT_APP_CLOUDINARY_FOLDER)
          .field("multiple", true)
          .field("quality", process.env.REACT_APP_CLOUDINARY_QUALITY)
          .field("context", "photo=tokenwhatever.com");

        media_urls.push({
          type: response_x.body.resource_type,
          public_id: response_x.body.public_id,
          url: response_x.body.secure_url,
        });
        document.body.classList.remove("loading-indicator");
      } catch (err) {
        document.body.classList.remove("loading-indicator");
        console.log(err);
      }
    }

    props.onChangeImage(media_urls[0]);
  };

  const handleDeleteImage = async () => {
    if (window.confirm("Are you sure to delete?")) {
      deleteMediaProcess(props.source);
    } else {
      return false;
    }
  };

  const deleteMediaProcess = async (input) => {
    try {
      await deleteMedia(input);

      props.onChangeImage(null);

      cogoToast.success("Deleted Successfully");
    } catch (e) {
      console.log(e);
      cogoToast.error("Something went wrong, please try again later");
    }
  };

  return (
    <>
      {props.source?.url ? (
        <img
          onClick={handleDeleteImage}
          src={props.source?.url}
          className="image-logo"
        />
      ) : (
        <div className="image-input-contianer" {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? <BiDownload size={25} /> : <BiCamera size={25} />}
        </div>
      )}
    </>
  );
}

export default ImageInput;
