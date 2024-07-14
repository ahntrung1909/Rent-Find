import React from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import * as ChatKit from "@chatscope/chat-ui-kit-react";

export default function Messenger() {
    return (
        <ChatKit.MainContainer
            responsive
            style={{
                height: "600px",
                margin: "0 131px 20px 131px",
            }}
        >
            <ChatKit.Sidebar position="left">
                <ChatKit.Search placeholder="Search..." />
                <ChatKit.ConversationList>
                    <ChatKit.Conversation
                        info="Yes i can do it for you"
                        lastSenderName="Lilly"
                        name="Lilly"
                    >
                        <ChatKit.Avatar
                            name="Lilly"
                            src="https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg"
                            status="available"
                        />
                    </ChatKit.Conversation>
                    <ChatKit.Conversation
                        info="Yes i can do it for you"
                        lastSenderName="Joe"
                        name="Joe"
                    >
                        <ChatKit.Avatar
                            name="Joe"
                            src="https://chatscope.io/storybook/react/assets/joe-v8Vy3KOS.svg"
                            status="dnd"
                        />
                    </ChatKit.Conversation>
                    <ChatKit.Conversation
                        info="Yes i can do it for you"
                        lastSenderName="Emily"
                        name="Emily"
                        unreadCnt={3}
                    >
                        <ChatKit.Avatar
                            name="Emily"
                            src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
                            status="available"
                        />
                    </ChatKit.Conversation>
                    <ChatKit.Conversation
                        info="Yes i can do it for you"
                        lastSenderName="Kai"
                        name="Kai"
                        unreadDot
                    >
                        <ChatKit.Avatar
                            name="Kai"
                            src="https://chatscope.io/storybook/react/assets/kai-5wHRJGb2.svg"
                            status="unavailable"
                        />
                    </ChatKit.Conversation>
                    <ChatKit.Conversation
                        info="Yes i can do it for you"
                        lastSenderName="Akane"
                        name="Akane"
                    >
                        <ChatKit.Avatar
                            name="Akane"
                            src="https://chatscope.io/storybook/react/assets/akane-MXhWvx63.svg"
                            status="eager"
                        />
                    </ChatKit.Conversation>
                    <ChatKit.Conversation
                        info="Yes i can do it for you"
                        lastSenderName="Eliot"
                        name="Eliot"
                    >
                        <ChatKit.Avatar
                            name="Eliot"
                            src="https://chatscope.io/storybook/react/assets/eliot-JNkqSAth.svg"
                            status="away"
                        />
                    </ChatKit.Conversation>
                    <ChatKit.Conversation
                        info="Yes i can do it for you"
                        lastSenderName="Zoe"
                        name="Zoe"
                    >
                        <ChatKit.Avatar
                            name="Zoe"
                            src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
                            status="dnd"
                        />
                    </ChatKit.Conversation>
                    <ChatKit.Conversation
                        info="Yes i can do it for you"
                        lastSenderName="Patrik"
                        name="Patrik"
                    >
                        <ChatKit.Avatar
                            name="Patrik"
                            src="https://chatscope.io/storybook/react/assets/patrik-yC7svbAR.svg"
                            status="invisible"
                        />
                    </ChatKit.Conversation>
                </ChatKit.ConversationList>
            </ChatKit.Sidebar>
            <ChatKit.ChatContainer>
                <ChatKit.ConversationHeader>
                    <ChatKit.ConversationHeader.Back />
                    <ChatKit.Avatar
                        name="Zoe"
                        src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
                    />
                    <ChatKit.ConversationHeader.Content
                        info="Active 10 mins ago"
                        userName="Zoe"
                    />
                    <ChatKit.ConversationHeader.Actions>
                        <ChatKit.VoiceCallButton />
                        <ChatKit.VideoCallButton />
                        <ChatKit.EllipsisButton orientation="vertical" />
                    </ChatKit.ConversationHeader.Actions>
                </ChatKit.ConversationHeader>
                <ChatKit.MessageList
                    typingIndicator={
                        <ChatKit.TypingIndicator content="Zoe is typing" />
                    }
                >
                    <ChatKit.MessageSeparator content="Saturday, 30 November 2019" />
                    <ChatKit.Message
                        model={{
                            direction: "incoming",
                            message: "Hello my friend",
                            position: "single",
                            sender: "Zoe",
                            sentTime: "15 mins ago",
                        }}
                    >
                        <ChatKit.Avatar
                            name="Zoe"
                            src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
                        />
                    </ChatKit.Message>
                    <ChatKit.Message
                        avatarSpacer
                        model={{
                            direction: "outgoing",
                            message: "Hello my friend",
                            position: "single",
                            sender: "Patrik",
                            sentTime: "15 mins ago",
                        }}
                    />
                    <ChatKit.Message
                        avatarSpacer
                        model={{
                            direction: "incoming",
                            message: "Hello my friend",
                            position: "first",
                            sender: "Zoe",
                            sentTime: "15 mins ago",
                        }}
                    />
                    <ChatKit.Message
                        avatarSpacer
                        model={{
                            direction: "incoming",
                            message: "Hello my friend",
                            position: "normal",
                            sender: "Zoe",
                            sentTime: "15 mins ago",
                        }}
                    />
                    <ChatKit.Message
                        avatarSpacer
                        model={{
                            direction: "incoming",
                            message: "Hello my friend",
                            position: "normal",
                            sender: "Zoe",
                            sentTime: "15 mins ago",
                        }}
                    />
                    <ChatKit.Message
                        model={{
                            direction: "incoming",
                            message: "Hello my friend",
                            position: "last",
                            sender: "Zoe",
                            sentTime: "15 mins ago",
                        }}
                    >
                        <ChatKit.Avatar
                            name="Zoe"
                            src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
                        />
                    </ChatKit.Message>
                    <ChatKit.Message
                        model={{
                            direction: "outgoing",
                            message: "Hello my friend",
                            position: "first",
                            sender: "Patrik",
                            sentTime: "15 mins ago",
                        }}
                    />
                    <ChatKit.Message
                        model={{
                            direction: "outgoing",
                            message: "Hello my friend",
                            position: "normal",
                            sender: "Patrik",
                            sentTime: "15 mins ago",
                        }}
                    />
                    <ChatKit.Message
                        model={{
                            direction: "outgoing",
                            message: "Hello my friend",
                            position: "normal",
                            sender: "Patrik",
                            sentTime: "15 mins ago",
                        }}
                    />
                    <ChatKit.Message
                        model={{
                            direction: "outgoing",
                            message: "Hello my friend",
                            position: "last",
                            sender: "Patrik",
                            sentTime: "15 mins ago",
                        }}
                    />
                    <ChatKit.Message
                        avatarSpacer
                        model={{
                            direction: "incoming",
                            message: "Hello my friend",
                            position: "first",
                            sender: "Zoe",
                            sentTime: "15 mins ago",
                        }}
                    />
                    <ChatKit.Message
                        model={{
                            direction: "incoming",
                            message: "Hello my friend",
                            position: "last",
                            sender: "Zoe",
                            sentTime: "15 mins ago",
                        }}
                    >
                        <ChatKit.Avatar
                            name="Zoe"
                            src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
                        />
                    </ChatKit.Message>
                </ChatKit.MessageList>
                <ChatKit.MessageInput placeholder="Type message here" />
            </ChatKit.ChatContainer>
        </ChatKit.MainContainer>
    );
}
