import React, { useState } from 'react'
import { useEffect } from 'react';
import "./Bot.css";
import botImage from "../../assets/Bot.png"
import { v4 as uuidv4 } from 'uuid';
import Socket from "../../services/socket.js"

const Bot = () => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [sessionId, setSessionId] = useState("")
    const [chatHistory, setChatHistory] = useState([]);
    const [currentmsg, setCurrentMsg] = useState("");
    
    
    const handleSendMessage = () => {
        if (currentmsg.trim() === "") return;
        
        const chatmsg = {
            id: uuidv4(),
            msg: currentmsg,
            timestamp: Date.now(),
            sender: "user",
            sessionId : sessionId,
        }
   
        setChatHistory((prev) => {
        return    [...prev, chatmsg]
        })

        
        Socket.emit("User Message", chatmsg);
        setCurrentMsg("");
    }

    useEffect(() => {
        let existingSessionId = localStorage.getItem("bingeBotSessionId");
        if (existingSessionId) {
            setSessionId(existingSessionId);
        } else {
            let newId = uuidv4();
            localStorage.setItem("bingeBotSessionId", newId);
            setSessionId(newId);
        }
    }, [])
    
    useEffect(() => {
        Socket.on("ai-response", (aiText) => {
            
            const botMessageObject = {
                id: uuidv4(),
                msg: aiText,
                timestamp: Date.now(),
                sender: "bot",
                sessionId: sessionId
            };

            setChatHistory((prev) => {
            return [...prev,botMessageObject]
         })   
        })
        return () => { Socket.off("ai-response"); }
    },[sessionId])


  return (
      <>
          {!isOpen ? (<button className='botBtn' onClick={() => setIsOpen(true)}><img src={botImage} /></button>) :
              (<div className='binge-bot-window'>
                 <h3>BingBot</h3>  <button onClick={()=>{setIsOpen(false)}}>X</button>
              
              
                  <div className='bingebot-messages' >
                      {
                          chatHistory.map((msg, index) => {
                           return   <div key={index}>
                                 {msg.msg}
                              </div>
                              
                          }) 
                          
                      }
                  </div>

                  <div>
                      <input type="text" value={currentmsg} onChange={(e)=> setCurrentMsg(e.target.value)} /> <button onClick={handleSendMessage}>Send</button>
                  </div>
                </div>
              )}
      </>
  )
}

export default Bot