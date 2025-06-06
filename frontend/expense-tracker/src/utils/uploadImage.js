import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage=async(imageFile)=>{  //async func that takes an image file as input

    const formData=new FormData();
    //Append image file to form under the key 'item'
    formData.append('image',imageFile);

    try{

        // Send a POST request to the image upload API endpoint with the image data.
        // API_PATHS.IMAGE.UPLOAD_IMAGE is the URL for image upload.
        // formData contains the file appended using FormData (e.g., image file).
        // The headers specify 'multipart/form-data' which is required for file uploads.
        // This tells the server how to properly parse the incoming file data.
        const response=await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE,formData,{
            headers:{
                'Content-Type':'multipart/form-data',  //Set header for file upload
            },
        });
        return response.data; //Return response data(usually image url or id)
    } catch(error){
        console.log('Error uploading the image',error);
        throw error; //Rethrow error for handling
    }
};

export default uploadImage;


{/* headers: { 'Content-Type': 'multipart/form-data' }
This sets the request header to inform the server that you're sending multipart/form-data.

It's required for uploading files because it tells the server how to parse the incoming request body.
*/}