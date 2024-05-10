import React from "react";

interface WelcomeInfoProps {
    isMobile: boolean
}
function WelcomeInfo (props: WelcomeInfoProps) {
    return (
        <div className={props.isMobile ? "welcome-info" : "welcome-info welcome-info-desktop"}>
            <h1>Онлайн сканнер QR-кодов</h1>
            <p>
                Наш сервис позволит вам отсканировать QR-код
                без использования сторонних приложений.
                Вы можете загрузить файл или использовать камеру
                вашего устройства.
            </p>
        </div>
    )
}
export default WelcomeInfo

