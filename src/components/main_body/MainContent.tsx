import React, {useState} from "react";
import Dropzone from "react-dropzone";
import isMobile from "is-mobile";

import CameraButton from "./buttons/CameraButton/CameraButton";
import ButtonUpload from "./buttons/ButtonUpload/ButtonUpload";
import WelcomeInfo from "./WelcomeInfo/WelcomeInfo";
import Result from "./Result/Result";
import ModalCamera from "./ModalCamera/ModalCamera";

import { readBarcodesFromImageFile, type ReaderOptions} from "zxing-wasm";

const readerOptions: ReaderOptions = {
    tryHarder: true,
    formats: ["QRCode"],
    maxNumberOfSymbols: 1,
};



const MainContent:React.FC =  () => {
    const [result, setResult] = useState<string>('')
    const [isCameraModalActive, setIsCameraModalActive] = useState<boolean>(false)
    const [isDragEnter, setIsDragEnter] = useState<boolean>()
    const handleFileChange = async (file: Blob) => {
        if (file) {
            const blob = new Blob([file]); // Convert File to Blob
            const imageFileReadResults = await readBarcodesFromImageFile(blob, readerOptions);
            if(imageFileReadResults[0]) {
                setResult(imageFileReadResults[0].text)
                flashScreen()
            }else{
                alert("Не удалось считать QR-код")
            }
        } else {
            alert('Не удалось загрузить файл.');
        }
    };

    function flashScreen () {
        const screen = document.querySelector('.flash-screen') as HTMLElement;
        if(screen){
            screen.style.display = "block"
            setTimeout(()=>{
                screen.style.display = "none"
            }, 200)
        }
    }


    const deviceType = () => {
        //True - телефон, False - пк
        return isMobile()
    }

    const handleCameraButton = async () => {
        setIsCameraModalActive(!isCameraModalActive)
    }


    return (
        <div className="main">
            <div className="flash-screen"></div>
            <div className={deviceType() ? "welcome-block" : "welcome-block welcome-block-desktop"}>
                <WelcomeInfo isMobile={deviceType()}/>
                {deviceType()
                    ?
                        <div className="nav-buttons">
                            <ButtonUpload onUploaded={handleFileChange}/>
                            <CameraButton buttonClicked={handleCameraButton}/>
                        </div>
                    :
                        <Dropzone
                            onDrop={acceptedFiles => handleFileChange(acceptedFiles[0])}
                            maxFiles={1}
                            onDragEnter={()=> setIsDragEnter(true)}
                            onDragLeave={()=> setIsDragEnter(false)}
                            onDropAccepted={() => setIsDragEnter(false)}

                        >
                            {({getRootProps, getInputProps}) => (
                                <section className={isDragEnter ? "dnd dnd-active" : "dnd"}>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()}/>
                                        <p className="dnd-text">Перетащите сюда файл или нажмите для выбора</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>

                }
            </div>
            <Result scanRes={result}/>
            <ModalCamera isActive={isCameraModalActive} setIsActive={handleCameraButton} onUploaded={handleFileChange}/>
        </div>
    )
}

export default MainContent