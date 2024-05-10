import { useEffect, useRef, useState } from "react";

interface CameraHookProps {
    onCapture: (imageBlob: Blob) => void;
}

const useCamera = ({ onCapture }: CameraHookProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isCameraOn, setIsCameraOn] = useState<boolean>(false);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsCameraOn(true);
            }
        } catch (error) {
            alert('Error accessing camera:' + error);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            const tracks = stream.getTracks();

            tracks.forEach(track => {
                track.stop(); // Остановить каждый трек
            });

            videoRef.current.srcObject = null;
            setIsCameraOn(false);
        }
    };

    const captureImage = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

                canvas.toBlob((blob) => {
                    if (blob) {
                        onCapture(blob);
                    }
                }, 'image/png', 1.0);
            }
        }
    };

    useEffect(() => {
        return () => {
            stopCamera(); // Остановка камеры при размонтировании компонента
        };
    }, []);

    return { videoRef, isCameraOn, startCamera, stopCamera, captureImage };
};

export default useCamera;
