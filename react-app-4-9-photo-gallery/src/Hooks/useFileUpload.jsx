import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import getCloudinaryUrl from "../utils/getCloudinaryUrl";
const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const PRESET_ID = import.meta.env.VITE_PRESET_ID;

export function useFileUpload() {
  const [progress, setProgress] = useState(0);
  const [gallery, setGallery] = useState(
    JSON.parse(localStorage.getItem("gallery") || "[]")
  );
  const controllerRef = useRef(null);

  const mutation = useMutation({
    mutationFn: async ({ file, tempId }) => {
      const controller = new AbortController();
      controllerRef.current = controller;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", PRESET_ID);

      const res = await axios.post(CLOUDINARY_URL, formData, {
        onUploadProgress: (uploadProgress) => {
          setProgress(
            Math.round((uploadProgress.loaded / uploadProgress.total) * 100)
          );
        },
        signal: controller.signal,
      });

      if (res?.data?.secure_url) {
        const fullUrl = res.data.secure_url;

        const lowResUrl = getCloudinaryUrl(fullUrl, {
          width: 20,
          quality: 30,
        });
        const mobileUrl = getCloudinaryUrl(fullUrl, {
          width: 150,
          quality: 80,
        });
        const tabletUrl = getCloudinaryUrl(fullUrl, {
          width: 400,
          quality: 80,
        });
        const laptopUrl = getCloudinaryUrl(fullUrl, {
          width: 800,
          quality: 80,
        });

        setGallery((prev) => {
          const updatedGallery = prev.map((img) =>
            img.id === tempId
              ? {
                  ...img,
                  url: fullUrl,
                  lowRes: lowResUrl,
                  mobile: mobileUrl,
                  tablet: tabletUrl,
                  laptop: laptopUrl,
                  status: "completed",
                }
              : img
          );
          localStorage.setItem("gallery", JSON.stringify(updatedGallery));
          return updatedGallery;
        });
      }
    },

    onSuccess: () => {
      setProgress(0);
    },

    onError: (_, { tempId }) => {
      setGallery((prev) => {
        const updatedGallery = prev.filter((img) => img.id !== tempId);
        localStorage.setItem("gallery", JSON.stringify(updatedGallery));
        return updatedGallery;
      });
    },
  });

  function handleUpload(file) {
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Only jpeg and jpg fomat Allowed");
      return false;
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("Maximum 2 MB is Allowed");
      return false;
    }
    const tempId = Date.now();

    const newImage = {
      id: tempId,
      url: URL.createObjectURL(file),
      status: "uploading",
    };

    setGallery((prev) => {
      const updatedGallery = [...prev, newImage];
      localStorage.setItem("gallery", JSON.stringify(updatedGallery));
      return updatedGallery;
    });

    mutation.mutate({ file, tempId });
  }

  function handleCancel() {
    if (controllerRef.current) {
      controllerRef.current.abort();
      setProgress(0);
    }
  }

  return { mutation, progress, handleUpload, handleCancel, gallery };
}
