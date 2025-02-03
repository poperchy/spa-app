import {useState} from "react";

export default function ChatInput({ sendMessage }) {
    const [message, setMessage] = useState("");
    return (
        <div className="flex flex-col gap-2 p-4 chat-input">
            <div className="flex gap-2">
                <input placeholder="Введите сообщение" value={message} onChange={(e) => setMessage(e.target.value)} className="border p-2 rounded flex-1" />
                <button onClick={() => { sendMessage(message); setMessage(""); }} className="bg-blue-500 text-white p-2 rounded">Отправить</button>
            </div>
        </div>
    );
}
