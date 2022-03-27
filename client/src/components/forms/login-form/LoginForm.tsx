import React, { FC, useState } from 'react';
import { NavBtn } from '../../header/navbar/navbarStyle';
import { Modal } from 'antd';

const LoginForm: FC = () => {
    const [visible, setVisible] = useState<boolean>(false);

    const showModal = (): void => setVisible(true);

    const handleCancel = (): void => setVisible(false)

    return (
        <>
            <NavBtn onClick={showModal}>
                Войти
            </NavBtn>
            <Modal visible={visible} title='Вход' onCancel={handleCancel} footer={false}>
                some login form
                юю
                юю
                юю
                юю
                some login form
            </Modal>
        </>
    );
};

export default LoginForm;