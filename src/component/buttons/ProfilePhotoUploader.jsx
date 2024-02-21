import { useState } from 'react';
import { Stack, Text, Loader } from '@mantine/core';
import classes from '../../style/ProfilePhotoUploader.module.css';
import { MdAddAPhoto } from 'react-icons/md';
import useAxiosWithAuth0 from '../../utils/interceptor';

export default function ProfilePhotoUploader() {
  // State to manage the uploading process
  const [isUploading, setIsUploading] = useState(false);
  const { axiosInstance } = useAxiosWithAuth0();
  // Handle file selection and upload
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true); // Start the upload process

    // Prepare the file to be uploaded
    const formData = new FormData();
    formData.append('file', file); // Adjust 'file' based on your API's expected parameter

    // useEffect(() => {
    //   if (isAuthenticated) {
    //     const fetchData = async () => {
    //       const res = await axiosInstance.get('/user/authorize-upload');
    //       console.log(res);
    //     };
    //     fetchData();
    //   }
    // }, [isAuthenticated]);

    try {
      // TODO: Get Cloudinary's signature from Courseflow backend.
      // TODO: Upload file to Cloudinary
      // TODO: Send resource identifier back to Courseflow
      // TODO: Set avatarUrl with the returned URL.
      // Replace 'your-upload-endpoint' with your actual upload URL
      await axios.post('your-upload-endpoint', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Handle successful upload here
      alert('File uploaded successfully');
    } catch (error) {
      console.error('File upload error:', error);
      alert('File upload failed');
    } finally {
      setIsUploading(false); // Reset uploading state
    }
  };

  return (
    <div className={classes.imageUploader}>
      {isUploading ? (
        <Loader /> // Show loader when file is uploading
      ) : (
        <Stack align='center'>
          <MdAddAPhoto className={classes.photoUploadIcon}/>
          <Text>Add a photo</Text>
        </Stack>
      )}
      <input
        type="file"
        className={classes.invisibleInput}
        onChange={handleFileChange} // Trigger file upload on file selection
        disabled={isUploading} 
      />
    </div>
  );
}
