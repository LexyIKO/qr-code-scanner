import React, {useState} from "react";

import CameraButton from "./buttons/CameraButton";
import ButtonUpload from "./buttons/ButtonUpload";
import WelcomeInfo from "./welcome_info/WelcomeInfo";
import Result from "./result/Result";
import ModalCamera from "./modal_camera/ModalCamera";

import { readBarcodesFromImageFile, type ReaderOptions} from "zxing-wasm";
import './MainContent.sass'


const readerOptions: ReaderOptions = {
    tryHarder: true,
    formats: ["QRCode"],
    maxNumberOfSymbols: 1,
};



const MainContent:React.FC =  () => {
    const [result, setResult] = useState<string>('')
    const [isCameraModalActive, setIsCameraModalActive] = useState<boolean>(false)

    const handleFileChange = async (file: Blob) => {
        if (file) {
            const blob = new Blob([file]); // Convert File to Blob
            const imageFileReadResults = await readBarcodesFromImageFile(blob, readerOptions);
            if(imageFileReadResults[0]) {
                setResult(imageFileReadResults[0].text)
            }
        } else {
            console.error('No file uploaded.');
        }
    };

    const handleCameraButton = async () => {
        setIsCameraModalActive(!isCameraModalActive)
    }



    return (
        <div className="main">
            <div className="welcome-block">
                <WelcomeInfo/>
                <div className="nav-buttons">
                    <ButtonUpload onUploaded={handleFileChange} />
                    <CameraButton buttonClicked={handleCameraButton}/>
                </div>
            </div>
            <Result scanRes={result}/>
            <ModalCamera isActive={isCameraModalActive} setIsActive={handleCameraButton} onUploaded={handleFileChange}/>
        </div>
    )
}

export default MainContent