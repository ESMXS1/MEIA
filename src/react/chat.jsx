import { useEffect, useState } from "react";
import "./styles.css";

export default function Chat() {
  const [message, setMessage] = useState(''); // Declare a state variable...
  const [messages, setMessages] = useState([
    (<p><strong>MEIA:</strong> Hola, soy tu asistente personal MEIA.</p>),
    (<p><strong>MEIA:</strong> Algunas características pueden no funcionar correctamente en este momento pero intentamos mejorar mi software.</p>)
  ]);

  // Función para limpiar la conversación
  let clearConversation = () => {
    setMessage("");
  }

  let handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  function sendMessage() {
    const processedMessage = processUserMessage(message);
    setMessage("");
    let userMessage = (<p><strong>Usuario:</strong> {processedMessage}</p>);
    const response = generateResponse(processedMessage);
    let meiaMessage = (<p><strong>MEIA:</strong> {response}</p>);
    addMessages([userMessage, meiaMessage]);
  }

  // Función para procesar el mensaje del usuario
  function processUserMessage(message) {
    return message;
  }

  // Función para generar la respuesta del asistente
  function generateResponse(message) {
    // Array de comandos y respuestas del asistente
    const commands = [
      // Comandos relacionados con matemáticas
      /*{ keyword: 'suma', response: handleMathOperation(message, 'suma', (a, b) => a + b) },
      { keyword: 'resta', response: handleMathOperation(message, 'resta', (a, b) => a - b) },
      { keyword: 'multiplicación', response: handleMathOperation(message, 'multiplicación', (a, b) => a * b) },
      { keyword: 'división', response: handleMathOperation(message, 'división', (a, b) => a / b) },
      { keyword: 'raíz cuadrada', response: handleSquareRoot(message) },
      { keyword: 'potencia', response: handlePowerOperation(message) },*/
      { keyword: 'cálculo diferencial', response: 'El cálculo diferencial es una rama de las matemáticas que se centra en el estudio del cambio instantáneo. Se utiliza para resolver problemas relacionados con la tasa de cambio y la acumulación de cantidades.' },
      { keyword: 'ecología', response: 'La ecología es la ciencia que estudia las relaciones entre los organismos y su entorno. Se ocupa de la distribución y la abundancia de los seres vivos, así como de las interacciones entre ellos y su ambiente.' },
      { keyword: 'programación en el servidor', response: 'La programación en el servidor se refiere al desarrollo de aplicaciones o servicios que se ejecutan en un servidor web. Se utiliza para crear funcionalidades dinámicas en sitios web, como la gestión de bases de datos, la autenticación de usuarios y la generación de contenido personalizado.' },
      { keyword: 'programación en el cliente', response: 'La programación en el cliente se refiere al desarrollo de aplicaciones o scripts que se ejecutan en el navegador web del usuario. Se utiliza para mejorar la experiencia del usuario en sitios web mediante la interactividad y la manipulación del contenido.' },
      { keyword: 'desarrollo de páginas web', response: 'El desarrollo de páginas web implica la creación y el diseño de sitios web para Internet o una intranet. Incluye la planificación, el diseño visual, la codificación, la implementación y el mantenimiento de sitios web para diversos propósitos.' },

      // Comandos relacionados con información general
      { keyword: 'hola', response: 'Hola, ¿cómo puedo ayudarte?' },
      { keyword: 'adiós', response: 'Hasta luego, ¡que tengas un buen día!' },
      { keyword: 'gracias', response: 'Si tienes alguna otra duda no esperes y pregunta!' },
      { keyword: 'historia', response: 'La historia es el estudio de los eventos pasados y cómo afectan el presente. ¿Te gustaría saber más sobre un período histórico específico?' },
      { keyword: 'ciencia', response: 'La ciencia es el estudio sistemático de la naturaleza y el comportamiento de la materia y el universo. ¿Te gustaría aprender sobre alguna rama específica de la ciencia?' },
      { keyword: 'matemáticas', response: 'Las matemáticas es el estudio de la cantidad, estructura, espacio y cambio. ¿Te gustaría resolver algún problema matemático o aprender sobre un concepto específico?' },
      { keyword: 'geografía', response: 'La geografía es el estudio de la superficie terrestre y las relaciones espaciales de los fenómenos humanos y naturales. ¿Te gustaría conocer datos interesantes sobre algún país o región?' },
      { keyword: 'arte', response: 'El arte es la expresión o aplicación de la creatividad y la imaginación, generalmente en forma visual o auditiva. ¿Te gustaría aprender sobre diferentes movimientos artísticos o artistas famosos?' },
      { keyword: 'cultura', response: 'La cultura se refiere al conjunto de formas y expresiones que caracterizan a una sociedad en un período determinado. ¿Te gustaría conocer más sobre las tradiciones y costumbres de diferentes culturas?' }
    ];

    // Búsqueda de comandos en el mensaje del usuario
    for (const command of commands) {
      if (message.includes(command.keyword)) {
        return command.response;
      }
    }

    return 'Lo siento, no puedo responder a eso en este momento.';
  }

  // Función para manejar operaciones matemáticas
  function handleMathOperation(message, operationName, operationFunction) {
    const numbers = message.match(/\d+/g);
    if (numbers && numbers.length >= 2) {
      const result = operationFunction(parseInt(numbers[0]), parseInt(numbers[1]));
      return `La ${operationName} de ${numbers[0]} + ${numbers[1]} es igual a ${result}.`;
    }
    return `Por favor, proporciona al menos dos números para ${operationName}.`;
  }

  // Función para calcular la raíz cuadrada
  function handleSquareRoot(message) {
    const number = message.match(/\d+/);
    if (number) {
      const result = Math.sqrt(parseInt(number[0]));
      return `La raíz cuadrada de ${number[0]} es ${result}.`;
    }
    return 'Por favor, proporciona un número para calcular la raíz cuadrada.';
  }

  // Función para calcular la potencia
  function handlePowerOperation(message) {
    const numbers = message.match(/\d+/g);
    if (numbers && numbers.length >= 2) {
      const result = Math.pow(parseInt(numbers[0]), parseInt(numbers[1]));
      return `La potencia de ${numbers[0]} elevado a ${numbers[1]} es ${result}.`;
    }
    return 'Por favor, proporciona dos números para calcular la potencia.';
  }

  // Función para agregar mensajes al chat
  function addMessages(newMessages) {
    setMessages([...messages, ...newMessages]);

    /*const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('p');
    if (chatMessages == null) return
    chatMessages.appendChild(messageElement);

    let index = 0;

    const addMessageContent = () => {
      if (index < message.length) {
        if (message.charAt(index) === '<') {
          // Si encontramos un '<', avanzamos hasta encontrar '>'
          const endIndex = message.indexOf('>', index);
          if (endIndex !== -1) {
            // Agregamos la etiqueta completa al mensaje
            messageElement.innerHTML += message.substring(index, endIndex + 1);
            index = endIndex + 1;
          }
        } else {
          // Agregamos caracteres normales
          messageElement.textContent += message.charAt(index);
          index++;
        }
        setTimeout(addMessageContent, 20); // Ajusta el tiempo de retraso aquí (en milisegundos)
      }
    };

    addMessageContent();*/
  }

  return (
    <div>
      { /* Botón para iniciar un nuevo chat */ }
      <button onClick={clearConversation}>Nuevo Chat</button>
      
      { /* Contenedor del chat */ }
      <div id="chat-container">
        <div id="chat-messages">
          {
            messages
          }
        </div>
        { /* Campo de entrada del usuario */ }
        <input type="text" id="user-input" placeholder="Escribe aquí" value={message} onChange={e => setMessage(e.target.value)} onKeyDown={handleKeyPress} />
      </div>
    </div>
);
}