import React, { useState,useRef, useEffect } from "react";
import style from "./InputForm.module.css";
import plus from "../../../images/plus.svg";

const ImagemForm = ({ label, name, setPostImg, setRegexPostImg, imageExistente }) => {
  const [image, setImage] = useState(null);
  const filesElement = useRef(null)

  function handleChange() {
    const selectImage = filesElement.current.files[0];
    if (selectImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setPostImg(selectImage)
        setRegexPostImg(false)
      };
      
      reader.readAsDataURL(selectImage);
    

    }
  }

  return (
    <>
    <div className={style.wrapper}>
      <label htmlFor={name} className={style.label}>
        {label}
      <div className={style.preview}>
        <input
          ref={filesElement}
          className={style.inputImage}
          id={name}
          type="file"
          onChange={handleChange}
          
          />
        {!image&& imageExistente&&(
          <img htmlFor={name} className={style.previewImg} src={imageExistente} alt="" />
        )}
        {!image&& !imageExistente&&(
          <img htmlFor={name} className={style.plus} src={plus} alt="" />
        )}
        {image && (
          <img className={style.previewImg} src={image} alt="preview" />
        )}
      </div>
      </label>
    </div>
    </>

  );
};

export default ImagemForm;
