"use client";
import React, { useState, useEffect } from "react";

type BackgroundImageProps = {
  imageUrl: string;
  maxRetries?: number;
  retryDelay?: number;
};

const useBackgroundImageWithRetry = (
  imageUrl: string,
  maxRetries: number = 3,
  retryDelay: number = 1000
) => {
  //   const [style, setStyle] = useState<React.CSSProperties>({});
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState<string | null>(null);
  const [{ style, loading, error }, setState] = useState<{
    style: React.CSSProperties;
    loading: boolean;
    error: string | null;
  }>({
    style: {},
    loading: true,
    error: null,
  });

  const setStyle = (style: React.CSSProperties) =>
    setState((prevState) => ({ ...prevState, style }));
  const setLoading = (loading: boolean) =>
    setState((prevState) => ({ ...prevState, loading }));
  const setError = (error: string | null) =>
    setState((prevState) => ({ ...prevState, error }));

  useEffect(() => {
    let retryCount = 0;
    let timeoutId: Timer;

    const loadImage = () => {
      const img = new Image();

      img.onload = () => {
        setStyle({
          backgroundImage: `url(${imageUrl})`,
        });
        setLoading(false);
        setError(null);
      };

      img.onerror = () => {
        if (retryCount < maxRetries) {
          retryCount++;
          const delay = retryDelay * Math.pow(2, retryCount - 1);
          timeoutId = setTimeout(loadImage, delay);
          setError(`Retry ${retryCount}/${maxRetries}`);
        } else {
          setError(`Failed to load image`);
          console.error(`Failed to load image: ${imageUrl}`);
          setLoading(false);
        }
      };

      img.src = imageUrl;
    };

    loadImage();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [imageUrl, maxRetries, retryDelay]);

  return { style, loading, error };
};

const MangaCardBackgroundImage: React.FC<BackgroundImageProps> = ({
  imageUrl,
  maxRetries = 3,
  retryDelay = 1000,
}) => {
  const { style, loading, error } = useBackgroundImageWithRetry(
    imageUrl,
    maxRetries,
    retryDelay
  );

  return (
    <div className="absolute inset-0">
      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110`}
        style={style}
      />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="text-white text-sm">Loading...</div>
        </div>
      )}

      {error && (
        <div className="absolute bottom-0 left-0 right-0 text-center p-1 text-xs bg-red-500 bg-opacity-75 text-white">
          {error}
        </div>
      )}
    </div>
  );
};

export default MangaCardBackgroundImage;
