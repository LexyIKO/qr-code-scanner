import React, {useEffect, useState} from "react";
import useCamera from "./useCamera";

import IconCloseCircle from "../../../icons/Cancel";
import IconCircle from "../../../icons/Circle";
import IconReset from "../../../icons/Reset";
import IconCheckCircle from "../../../icons/Сheck";


interface MyProps {
    isActive: boolean,
    setIsActive: () => void
    onUploaded: (file: Blob) => void
}

function ModalCamera (props: MyProps) {
    const [imageData, setImageData] = useState<string | null>(null);
    const [imageBlob, setImageBlob] = useState<Blob | null>(null);
    const {videoRef, isCameraOn, startCamera, stopCamera, captureImage} = useCamera({
        onCapture: (imageBlob) => {
            setImageBlob(imageBlob)
            const dataUrl = URL.createObjectURL(imageBlob)
            setImageData(dataUrl)
        }
    })

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

    useEffect(() => {
        if(props.isActive){
            startCamera()
        }
    }, [props.isActive]);

    return (
        <div className="modal-camera" style={{display: props.isActive ? "flex" : "none"}}>
            <video ref={videoRef} autoPlay muted className="camera"
                   style={{display: isCameraOn && !imageData ? 'block' : 'none'}}/>

            {imageData != null ?
                <div className="image-container">
                    <img src={imageData} alt='#' className='saved-image'/>
                </div>
                : null}

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
