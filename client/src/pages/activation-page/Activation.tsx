import React, { FC } from 'react';

const Activation: FC = () => {
    return (
        <div>
            <p>
                Мы отправили сообщение вам на указанную почту для проверки, 
                переходите по ссылке и активируйте аккаунт для полного доступа 
            </p>
            <p>
                We have sent a message to you at the specified email address for verification, 
                follow the link and activate your account for full access
            </p>
            <p>-----------------------------</p>
            <p>-----------------------------</p>
            <p>-----------------------------</p>
            <p>
                or if user already is activated show some another message(because it's a public route)
            </p>
        </div>
    );
};

export default Activation;