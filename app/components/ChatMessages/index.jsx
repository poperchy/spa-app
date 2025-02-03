import React from 'react';

export default function ChatMessages({chat}) {
    return (
        <div className="border p-2 overflow-y-auto  h-[100%]">
            {chat.map((msg, index) => (
                <div key={index} className={msg.sender === "me" ? " text-right mb-5" : " text-left mb-5"}>
          <span className={msg.sender === "me" ? "bg-green-200 p-2 rounded-lg inline-flex message-item message-item--right" : "bg-gray-200 p-2 rounded-lg inline-flex message-item message-item--left"}
                dangerouslySetInnerHTML={{__html: msg.text}}/>
                </div>
            ))}
        </div>
    );
}