import {useSearchParams} from "@remix-run/react";
import {useState} from "react";
import WhatsAppChat from "../components/WhatsAppChat";
import image from "../images/wa669aeJeom.png"

export default function ChatPage() {
    const [searchParams] = useSearchParams();
    const idInstance = searchParams.get("idInstance");
    const apiToken = searchParams.get("apiToken");
    const [chats, setChats] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [activeChat, setActiveChat] = useState(null);

    const startNewChat = () => {
        if (!phoneNumber || !/^\+?\d+$/.test(phoneNumber)) {
            alert("Введите корректный номер телефона");
            return;
        }
        if (!chats.includes(phoneNumber)) {
            setChats([...chats, phoneNumber]);
        }
        setActiveChat(phoneNumber);
        setPhoneNumber("");
    };

    if (!idInstance || !apiToken) {
        return <div>Необходимы параметры idInstance и apiToken</div>;
    }

    return (
        <div className=" flex w-full h-[100%] main-wrapper p-5">
            <div className="flex w-full  mx-auto h-[100%] bg-white max-w-screen-2xl main-content">
                <div className="w-[40%] bg-white  rounded-lg ">
                    <div className="flex flex-col p-4">
                        <h2 className="text-xl font-bold mb-4">Чаты</h2>
                        <div className="flex gap-2 mb-4">
                            <input
                                placeholder="Номер телефона"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="border p-2 rounded flex-1 "
                            />
                            <button onClick={startNewChat} disabled={chats > 0 ? 'disabled' : ''}
                                    className="chat-new-chat-btn text-white p-2 rounded">+
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col  gap-2 overflow-y-auto max-h-[500px]">
                        {chats.map((chat) => (
                            <button
                                key={chat}
                                className={`p-2 pl-5 text-left ${activeChat === chat ? "chat-active" : "bg-white"}`}
                                onClick={() => setActiveChat(chat)}
                            >
                                {chat}
                            </button>
                        ))}
                        {chats > 0 ? '' : (
                            <div className="p-5 flex items-center justify-center h-[100%]">Нет чатов</div>
                        )}

                    </div>
                </div>
                <div className="w-[60%] chat-default ">
                    {activeChat ? (
                        <WhatsAppChat
                            key={activeChat}
                            idInstance={idInstance}
                            apiToken={apiToken}
                            phoneNumber={activeChat}
                        />
                    ) : (
                        <div className="text-center text-gray-500 p-5"><img src={image} alt=""/></div>
                    )}
                </div>
            </div>
        </div>
    );
}
