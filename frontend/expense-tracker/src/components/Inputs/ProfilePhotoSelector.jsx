import React, { useRef, useState } from 'react';
import { LuUser,LuUpload,LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector =({image,setImage}) => {
    const inputRef=useRef(null);
  const [previewUrl,setPreviewUrl]=useState(null);

  const handleImageChange=(event) => {
    const file=event.target.files[0];
    if (file){
        //update the image state
        setImage(file);

        //generate preview URL from the file
        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
  };

  const onChooseFile= () => {
    inputRef.current.click();
  };


  return <div className='flex justify-center mb-6'>
    <input
        type="file"
        accepts="image"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
    />

    {!image ? (
        <div className='w-20 h-20 flex items-center justify-center bg-purple-100/80 rounded-full relative'>
            <LuUser className='text-4xl text-indigo-500'/>

            <button
                type='button'
                className='flex items-center justify-center bg-indigo-500 text-white rounded-full absolute -bottom-1 -right-2 p-2 hover:scale-102 duration-300 transition-all will-change-transform cursor-pointer'
                onClick={onChooseFile}
            >
                <LuUpload/>
            </button>
        </div>
    ):(
        <div className='relative'>
            <img
                src={previewUrl}
                alt="profile photo"
                className='w-20 h-20 rounded-full object-cover'
            />
            <button
                type="button"
                className='flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-2 p-2 hover:scale-102 duration-300 transition-all will-change-transform cursor-pointer'
                onClick={handleRemoveImage}
            >
                <LuTrash/>
            </button>
        </div>
    )}
    </div>;
};

export default ProfilePhotoSelector;