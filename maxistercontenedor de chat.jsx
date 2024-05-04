//creo que me equivoque y no era esto lo que tenia que hacer
import React, { useState } from "react";

function Chat() {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    // Aquí puedes procesar el mensaje como desees
    console.log("Mensaje enviado:", message);
    setMessage(''); // Limpiar el estado del mensaje después de enviarlo
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <input 
        type="text" 
        placeholder="Escribe aquí" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        onKeyPress={handleKeyPress} 
      />
    </div>
  );
}

export default Chat;