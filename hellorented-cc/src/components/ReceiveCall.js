import React, {useState, useEffect} from 'react'
import openSocket from 'socket.io-client'
import axios from 'axios'
const { Device } = require('twilio-client');


export default function ReceiveCall() {
    
    const socket = openSocket('/');
    const [incomeCall, setIncomeCalls] = useState(false)
    const [caller, setCaller] = useState('')
    const [callSid, setCallSid] = useState('')


    useEffect(()=>{
        socket.on('callComing', (data) =>{
            console.log('call incoming', data.data.From, data.data.CallSid)
            setIncomeCalls(true)
            setCaller(data.data.From)
            setCallSid(data.data.CallSid)
            getToken()
        })
       window.Twilio.Device.incoming(function(conn) {
        console.log('Incoming connection from ' + conn.parameters.From);
        // accept the incoming connection and start two-way audiot
            conn.accept();

        })
    },[socket])

    const getToken = async () => {
        const data = await axios.get('https://398e680f80df.ngrok.io/voice/call-in/token')
        const token = data.data
        window.Twilio.Device.setup(token)
        console.log(window.Twilio);
        console.log(token);
    }
    
    const handleAnswer = () => {
        console.log('entramos');
        console.log('callsid', callSid);
        axios.post('https://398e680f80df.ngrok.io/voice/call-in/answerCall', { id: callSid })
    }

    return (
        <div>
            {incomeCall && <div><p>incoming call from {caller} {callSid}</p>
            <button onClick={handleAnswer}>Answer</button> <button>Decline</button></div>
            }
        </div>
    )
}
