import { useEffect, useRef, useState } from 'react'
import './App.css'



function App() {
  const [messages, setMessages] = useState(["hi there", "hello"]);
  const [val, setVal] = useState('');
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    

    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type:"join",
        payload:{
          roomId:"red"
        }
      }))
    }

    ws.onmessage = (event) => {
      setMessages(m => [...m, event.data])
    }

    return () => ws.close();
  },[])

  function handleSend(){
    if(!val.trim()) return;

    wsRef.current.send(JSON.stringify({
      type:"chat",
      payload:{
        message:val,
      }
    }))

    setVal('');
  }

  return (
    <div className='h-screen bg-black p-4'>
      <div className='h-[85vh]'>
        {messages.map((message, index) => 
        <div key={index} className='m-9'>
          <span  className='bg-white text-black rounded p-4'>{message}</span>
        </div>)}
      </div>
      <div className='w-full bg-white flex  rounded-xl'>
        <input type="text" className='flex-1 mr-2 p-4' value={val} onChange={(e) => setVal(e.target.value)} />
        <button className='bg-purple-600 text-white p-3 rounded-md' onClick={handleSend}>Send Message</button>
      </div>
    </div>

  )
}

export default App
