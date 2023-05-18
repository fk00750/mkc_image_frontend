import axios from "axios";

export const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
  setDroppedImage: React.Dispatch<React.SetStateAction<File | null>>,
  setIsDragActive: React.Dispatch<React.SetStateAction<boolean>>,
  setImageSize: React.Dispatch<React.SetStateAction<number | null>>
) => {
  const file = event.target.files?.[0];
  if (file) {
    setSelectedFile(file || null);
    setDroppedImage(file || null);
    setIsDragActive(false);
    setImageSize(Math.round(file.size / 1024));
  }
};

export const handleFormSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  selectedFile: File | null,
  use: string,
  format: string,
  setImageLink: React.Dispatch<React.SetStateAction<string>>,
  setImageLinkSize: React.Dispatch<React.SetStateAction<number | null>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  setError: React.Dispatch<React.SetStateAction<boolean>>
) => {
  event.preventDefault();
  if (selectedFile) {
    if (use.trim().length === 0) {
      setError(true);
      setErrorMessage("Please select a file to upload");
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 2000);
      return;
    }

    const formData = new FormData();

    formData.append("use", use);

    formData.append("format", format);

    formData.append("image", selectedFile);

    const response = await axios.post(
      "http://localhost:8080/v1/images/upload-image",
      formData
    );

    if (response.status === 200) {
      console.log(response);
      setImageLink(response.data.imageLink);
      setImageLinkSize(response.data.sizeInKb);
    }
  } else {
    setError(true);
    setErrorMessage("Please enter your purpose");
    setTimeout(() => {
      setError(false);
      setErrorMessage("");
    }, 2000);
    return;
  }
};

export const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
  event.stopPropagation();
};

export const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
  event.stopPropagation();
};

export const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
  event.stopPropagation();
};

export const handleDrop = (
  event: React.DragEvent<HTMLDivElement>,
  setDroppedImage: React.Dispatch<React.SetStateAction<File | null>>,
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
  setIsDragActive: React.Dispatch<React.SetStateAction<boolean>>
) => {
  event.preventDefault();
  event.stopPropagation();
  const file = event.dataTransfer.files?.[0];
  setDroppedImage(file || null);
  setSelectedFile(file || null);
  setIsDragActive(false);
};
