import React, { useState, useEffect } from "react";
import axios from "axios";
import "./adminUser.css";
import { Avatar, Image, Modal, Form, Input, Button } from "antd";

const AdminUser = ({ app }) => {
    const [file, setFile] = useState();

    const [avatarSrc, setAvatarSrc] = useState("");

    console.log(app.user);

    const uploadFile = async file => {
        const formData = new FormData();

        formData.append("image", file);

        const responseUpload = await axios.post(
            'http://localhost/mvc/index.php?controller=user&action=upload',
            formData,
            {
                headers: {
                    "content-type": "multipart/form-data",
                },
            });

        console.log("Response Upload: ", responseUpload);

        let avatarURL = responseUpload.data.avatar;
        const data = JSON.stringify({ ...app.user, avatar: avatarURL });
        setAvatarSrc(avatarURL);
        console.log("Data updated: ", data);

        const responseUpdate = await axios.post(
            'http://localhost/mvc/index.php?controller=user&action=update',
            data,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
            });

        return responseUpdate;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await uploadFile(file);
        console.log("Response Data:", response.data);
    };

    const handleChange = e => {
        setFile(e.target.files[0]);
    };
    const [formInfor] = Form.useForm();

    const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);
    const showAvatarModal = () => {
        setIsAvatarModalVisible(true);
    };

    const handleOk = () => {

        console.log("Handle Ok");

        setIsAvatarModalVisible(false);
    };

    const handleCancel = () => {
        setIsAvatarModalVisible(false);
    };

    useEffect(() => {
        setAvatarSrc(app.user.avatar);
    }, [])

    return (
        <div className="admin-user-container">
            <div className="admin-user-avatar">
                <Avatar
                    src={
                        <Image
                            src={avatarSrc}
                            style={{
                                height: 100,
                                width: 100,
                            }}
                        />
                    }
                    className="admin-user-avatar-img"
                    size={100}
                />
                <div className="admin-user-name">
                    <div className="admin-username">{app.user.username}</div>
                    <button
                        className="admin-user-avatar-btn"
                        onClick={showAvatarModal}
                    >
                        Đổi ảnh đại diện
                    </button>
                    <button
                        className="admin-user-avatar-btn"

                    >
                        <a href='/admin/change-password'>Đổi mật khẩu</a>
                    </button>
                    <Modal
                        centered
                        title="Đổi ảnh đại diện"
                        visible={isAvatarModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        width={900}
                    >
                        <form onSubmit={handleSubmit}>
                            <h1>Upload Image</h1>
                            <input
                                type="file"
                                onChange={handleChange}
                                accept=".jpg, .png"
                            />
                            <button type="submit">Upload File</button>
                        </form>
                    </Modal>
                </div>
            </div>
            <div className="admin-user-information">
                <AdminUserForm form={formInfor} data={app.user} />
            </div>
        </div>
    );
};

const AdminUserForm = ({ formInfor, data }) => {
    const [buttonDisable, setButtonDisable] = useState(true);
    const onFinish = values => {
        console.log("Success:", values);
        const data = JSON.stringify(values);
        console.log(data);
    };

    const onFinishFailed = errorInfo => {
        console.log("Failed:", errorInfo);
    };
    const handleClicked = () => { };

    const onFieldsChange = () => {
        setButtonDisable(false);
    };

    return (
        <div>
            <Form
                form={formInfor}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onFieldsChange={() => onFieldsChange()}
                initialValues={{
                    name: "Admin",
                    username: "admin",
                    email: "admin@gmail.com"
                }}
                size="large"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                className="admin-user-form-wrapper"
            >
                <Form.Item
                    className="admin-user-form-item"
                    label="Name"
                    name="name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    className="admin-user-form-item"
                    label="Username"
                    name="username"
                >
                    <Input disabled={true} />
                </Form.Item>
                <Form.Item
                    className="admin-user-form-item"
                    label="Email"
                    name="email"
                >
                    <Input disabled={true} />
                </Form.Item>
                <Form.Item className="admin-user-form-item">
                    <button
                        className="admin-user-form-btn"
                        type="submit"
                        onClick={handleClicked}
                        disabled={buttonDisable}
                    >
                        Xác nhận
                    </button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default AdminUser;
