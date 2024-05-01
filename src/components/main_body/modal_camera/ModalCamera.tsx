import React, {useRef, useState} from "react";
import './ModalCamera.sass'

import IconCloseCircle from "../../../icons/Cancel";
import IconCircle from "../../../icons/Circle";
import IconReset from "../../../icons/Reset";
import IconCheckCircle from "../../../icons/Сheck";
import {type} from "node:os";

interface MyProps {
    isActive: boolean,
    setIsActive: () => void
    onUploaded: (file: Blob) => void
}

function ModalCamera (props: MyProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [imageData, setImageData] = useState<string | null>(null);
    const [imageBlob, setImageBlob] = useState<Blob | null>(null);
    const [isCameraOn, setIsCameraOn] = useState<boolean>(false);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsCameraOn(true);
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
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
    }

    const captureImage = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

                // Получение Blob файла из canvas с использованием toBlob()
                canvas.toBlob((blob) => {
                    if (blob) {
                        setImageBlob(blob); // Установка Blob файла в состояние
                        const dataUrl = URL.createObjectURL(blob); // Создание URL из Blob файла
                        setImageData(dataUrl); // Установка Data URL в состояние
                    }
                }, 'image/png', 1.0);
            }
        }
    };


    const handleConfirm = () => {
        if(imageBlob){
            props.onUploaded(imageBlob)
        }
        changeActiveStatus()
    }
    function changeActiveStatus (){
        props.setIsActive()
        if(isCameraOn) {
            stopCamera()
        }
    }

    return (
        <div className="modal-camera" style={{display: props.isActive ? "flex" : "none"}}>
            <video ref={videoRef} autoPlay muted className="camera"
                   style={{display: isCameraOn && !imageData ? 'block' : 'none'}}/>

            {imageData != null ?
                <div className="image-container">
                    <img src={imageData} alt='#' className='saved-image'/>
                </div>
                : null}
            <p className="button-camera-on" onClick={startCamera}
               style={{display: (!isCameraOn && !imageData)  ? 'flex' : 'none'}}>Включить камеру</p>
            <div className="buttons">
                <IconCloseCircle onClick={changeActiveStatus} width={50} height={50} color={"white"}/>
                {imageData ?
                    <IconCheckCircle onClick={handleConfirm}  width={50} height={50} color={"white"}/>
                    : <IconCircle onClick={captureImage}  width={50} height={50} color={"white"}/>}
                <IconReset onClick={()=> setImageData(null)}  width={50} height={50} color={"white"}/>
            </div>

        </div>
    );
}

export default ModalCamera
