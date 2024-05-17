import { useState } from 'react';
import ImageCompressor from 'image-compressor.js';

const useImageUploader = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {

      const img = new Image();
      img.onload = async () => {
        if (img.height > 200) {
          const compressor = new ImageCompressor();
          const compressedImage = await compressor.compress(file, {
            maxHeight: 200,
          });

          if (compressedImage.size > 20000) {
            setError('La imagen comprimida es aun demasiado grande.');
            setImagePreview(null);
            return;
          }

          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
            setError('');
          };

          reader.readAsDataURL(compressedImage);
        } else {
          if (file.size > 20000) {
            setError('La imagen es demasiado grande. Debe ser menor de 15 KB.');
            setImagePreview(null);
            return;
          }

          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
            setError('');
          };
          reader.readAsDataURL(file);
        }
      };
      img.onerror = () => {
        setError('Error al cargar la imagen. Intenta con otra imagen.');
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const resetImageState = () => {
    setImagePreview(null);
    setImageFile(null);
    setError('');
  };

  return {
    imageFile,
    imagePreview,
    handleImageChange,
    error,
    resetImageState, 
  };
};

export default useImageUploader;
