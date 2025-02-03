import React, {useState} from "react";
import {useNavigate} from "react-router";

export default function Index() {

  const [idInstance, setIdInstance] = useState('');
  const [apiToken, setApiToken] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!idInstance || !apiToken) return;
    navigate(`/chat?idInstance=${idInstance}&apiToken=${apiToken}`);
  }

  return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-2xl font-bold">Вход</h1>
        <input
            placeholder="idInstance"
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
            className="border p-2 rounded"
        />
        <input
            placeholder="apiTokenInstance"
            value={apiToken}
            onChange={(e) => setApiToken(e.target.value)}
            className="border p-2 rounded"
        />
        <button
            onClick={handleLogin}
            className="bg-blue-500 text-white p-2 rounded"
        >
          Войти
        </button>
      </div>
  );
}

