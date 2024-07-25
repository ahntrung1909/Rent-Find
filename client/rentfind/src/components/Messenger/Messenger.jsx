import React, { useEffect, useState, useRef } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    Sidebar,
    ConversationList,
    Conversation,
    Avatar,
    ChatContainer,
    ConversationHeader,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator,
    Search,
} from "@chatscope/chat-ui-kit-react";
import "./messenger.scss";
import { firebase } from "../../utils/fireBaseConfig";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atom";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Messenger = () => {
    const navigate = useNavigate();
    const allUserRef = useRef([]);
    const [allUsers, setAllUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useRecoilState(userState);
    const [receiver, setReceiver] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); // Thêm trạng thái tìm kiếm
    const fileInputRef = useRef(null); // Ref to reference the file input

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/user/get-all-users/${user.data.id}`
            );
            setAllUsers(response.data.messageData);
            allUserRef.current = response.data.messageData;
            setReceiver(response.data.messageData[0]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        if (user && user.data) {
            fetchUsers();
        }
    }, [user]);

    useEffect(() => {
        if (allUsers && allUsers.length && user && receiver) {
            let sender = user.data.id;
            fetchData(sender, receiver.id);
        }
    }, [user, receiver]);

    const fetchData = async (sender, receiver) => {
        try {
            const messageRef = firebase.firestore().collection("message");
            //đây là query của firebase, search mấy cái câu lệnh để truy vấn

            const query = messageRef
                .where("sender", "in", [sender, receiver])
                .where("receiver", "in", [sender, receiver])
                .orderBy("sendAt", "asc");

            query.onSnapshot((snapshot) => {
                const messageList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMessages(messageList);
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleSendMessage = async (message) => {
        const sender = user.data.id;
        const newMessage = {
            message,
            sender,
            receiver: receiver.id,
            sendAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        try {
            await firebase.firestore().collection("message").add(newMessage);
            await axios.post(`http://localhost:3000/api/message/upload-msg/`, {
                content: message,
                senderId: sender,
                receiverId: receiver.id,
                seen: false,
            });
            fetchUsers();
        } catch (error) {
            console.log(error);
        }
    };

    const handleUserClick = (user) => {
        setReceiver(user);
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
        if (value === "") {
            setAllUsers(allUserRef.current);
        }
        {
            const searchResult = [];
            if (allUsers) {
                allUserRef.current.map((user) => {
                    if (
                        user.full_name
                            .toLowerCase()
                            .includes(value.toLowerCase())
                    ) {
                        searchResult.push(user);
                    }
                });
            }
            setAllUsers(searchResult);
        }
    };

    const uploadFile = async (file) => {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`uploads/${file.name}`);
        await fileRef.put(file);
        const fileURL = await fileRef.getDownloadURL();
        return fileURL;
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const fileURL = await uploadFile(file);
                // Save the file URL to Firestore as a message
                await handleSendMessage(`File uploaded: ${fileURL}`);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };

    const handleAttachClick = () => {
        fileInputRef.current.click();
    };

    return (
        <MainContainer
            responsive
            style={{
                height: "600px",
                margin: "0 131px 20px 131px",
            }}
        >
            <Sidebar position="left">
                <Search
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(value) => handleSearch(value)}
                    onClearClick={() => handleSearch("")} // Gọi hàm handleSearch với giá trị rỗng để xóa tìm kiếm
                />
                <ConversationList>
                    {!!allUsers?.length ? (
                        allUsers.map((item) => (
                            <Conversation
                                key={item.id}
                                name={item.full_name}
                                info={
                                    item.lastMessage
                                        ? item.lastMessage.trim()
                                        : "Tin nhắn chờ"
                                }
                                lastSenderName={
                                    item.isYourMessage ? `Bạn` : item.full_name
                                }
                                onClick={() => handleUserClick(item)}
                            >
                                <img
                                    style={{ width: 40, height: 40 }}
                                    src="/user.jpg"
                                    as="Avatar"
                                    name={item.full_name}
                                />
                            </Conversation>
                        ))
                    ) : (
                        <div
                            style={{ textAlign: "center", marginTop: 10 }}
                            as="Conversation2"
                        >
                            <p>Không có kết quả</p>
                        </div>
                    )}
                </ConversationList>
            </Sidebar>
            <ChatContainer>
                <ConversationHeader>
                    <ConversationHeader.Back />
                    <img
                        style={{ width: 40, height: 40 }}
                        as="Avatar"
                        src="/user.jpg"
                        name="Zoe"
                    />
                    <ConversationHeader.Content
                        userName={receiver ? receiver.full_name : "Unknown"}
                        // userName={receiverId}
                    />
                </ConversationHeader>
                <MessageList>
                    {messages.map((msg, index) => {
                        const modifiedMsg = { ...msg };
                        if (user.data.id === msg.receiver) {
                            modifiedMsg.direction = "incoming";
                        } else {
                            modifiedMsg.direction = "outgoing";
                        }
                        return (
                            <Message key={index} model={modifiedMsg}></Message>
                        );
                    })}
                </MessageList>
                <MessageInput
                    placeholder="Type message here"
                    onSend={(m) => handleSendMessage(m)}
                    onAttachClick={handleAttachClick}
                />
            </ChatContainer>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
        </MainContainer>
    );
};

export default Messenger;
