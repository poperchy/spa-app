import { useState, useEffect } from "react";
import axios from "axios";
import ChatInput from "../../components/ChatInput";
import ChatMessages from "../../components/ChatMessages";

export default function WhatsAppChat({ idInstance, apiToken, phoneNumber, userName }) {
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async (message) => {
        if (!idInstance || !apiToken || !phoneNumber || !message) return;
        const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiToken}`;

        try {
            await axios.post(url, {
                chatId: `${phoneNumber}@c.us`,
                message,
            });
            setChat(prevChat => [...prevChat, { sender: "me", text: message.replace(/\n/g, "<br />") }]);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    useEffect(() => {
        if (!idInstance || !apiToken || !phoneNumber) return;

        let isMounted = true;

        const fetchMessages = async () => {
            if (loading) return;
            setLoading(true);

            try {
                while (isMounted) {
                    const response = await axios.get(
                        `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiToken}`
                    );

                    if (!response.data || !response.data.body) break;

                    const data = response.data.body;
                    const chatId = `${phoneNumber}@c.us`;

                    if (data.senderData?.chatId === chatId && data.messageData?.textMessageData?.textMessage) {
                        const newMessage = {
                            sender: data.senderData.sender,
                            text: data.messageData?.textMessageData?.textMessage.replace(/\n/g, "<br />"),
                        };

                        setChat(prevChat => [...prevChat, newMessage]);
                    }

                    await axios.delete(
                        `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiToken}/${response.data.receiptId}`
                    );
                }
            } catch (error) {
                console.error("Ошибка при получении сообщений:", error);
            } finally {
                setLoading(false);
                if (isMounted) setTimeout(fetchMessages, 5000);
            }
        };

        fetchMessages();
        return () => {
            isMounted = false;
        };
    }, [idInstance, apiToken, phoneNumber]);

    return (
        <div className="flex flex-col w-[100%] h-[100%] ">
            <span className="p-5 chat-user">{phoneNumber}</span>
            <ChatMessages chat={chat} />
            <ChatInput sendMessage={sendMessage} />
        </div>
    );
}
