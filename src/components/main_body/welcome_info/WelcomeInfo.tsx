import React from "react";
import './WelcomeInfo.sass';


function WelcomeInfo () {
    return (
        <div className="welcome-info">
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

