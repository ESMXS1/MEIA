import { useState } from "react";
//no se si eso es lo que tenia que hacer 
function getMessages(userMessage = null) {
  let initialMessages = [
    <p key={0}><strong>MEIA:</strong> Hola, soy tu asistente personal MEIA.</p>,
    <p key={1}><strong>MEIA:</strong> Algunas características pueden no funcionar correctamente en este momento pero intentamos mejorar mi software.</p>
  ];

  if (userMessage) {
    let userMessageElement = <p key={2}><strong>Usuario:</strong> {userMessage}</p>;
    // Añadir el mensaje del usuario al inicio de la lista
    initialMessages.unshift(userMessageElement);

    // Generar y añadir el mensaje de MEIA después del mensaje del usuario
    const response = generateResponse(userMessage);
    let meiaMessage = <p key={3}><strong>MEIA:</strong> {response}</p>;
    initialMessages.splice(1, 0, meiaMessage);
  }

  return initialMessages;
}