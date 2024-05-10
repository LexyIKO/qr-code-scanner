import React from "react";

interface MyProps {
    onUploaded: (file: File) => void
}


function ButtonUpload (props: MyProps) {

    const handleFileUploaded = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            if (file) {
                props.onUploaded(file)
            }
        }
    }

    return (
        <div className="upload-button">
            <input type="file" name='file' onInput={handleFileUploaded} className='upload-input' accept="image/jpeg, image/jpg, image/png"/>
            <label htmlFor="file" className="file-label">Загрузить</label>
        </div>
    )
}

export default ButtonUpload
