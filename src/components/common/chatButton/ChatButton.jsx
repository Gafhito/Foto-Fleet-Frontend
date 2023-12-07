import { useState } from 'react';
import { WhatsAppWidget } from 'react-whatsapp-widget';


import 'react-whatsapp-widget/dist/index.css';

export const ChatButton = () => {
  const [showChat, setShowChat] = useState(false);

  const handleChatButtonClick = () => {
    setShowChat(!showChat);
  };


  const chatButtonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 999,
  };

  return (
    <div style={chatButtonStyle}>
        <WhatsAppWidget
          phoneNumber="+59892147196"
          replyTimeText="Responderemos a la brevedad"
          companyName="Foto Fleet"
          message={`Hola! 👋🏼 \n¿En que podemos ayudarte?`}
          sendButtonText='Enviar'
          inputPlaceHolder='Escribe tu mensaje'
        />
    </div>
  );
};


