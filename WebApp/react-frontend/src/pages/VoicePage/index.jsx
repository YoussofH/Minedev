import React, { useEffect, useRef, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import sendRequest from '../../remote/sendRequest';
import { useParams } from "react-router-dom";
import { quantum, ping } from 'ldrs'

const VoicePage = ({ match }) => {
    const baseAudioURL = "http://18.219.38.17:8000/media/generated_ai_audio.mp3";
    const audioPlayerRef = useRef(null);
    const [audioGeneratedURL, setAudioGeneratedURL] = useState(baseAudioURL);
    const speakAISocketRef = useRef(null);
    const [readyToSend, setReadyToSend] = useState(true);
    const { conversationId } = useParams();

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    quantum.register();
    ping.register();

    useEffect(() => {
        const lastSentence = results[results.length - 1];
        if (lastSentence !== "" && results.length > 0 && readyToSend) {
            setReadyToSend(false);
            speakAISocketRef.current.send(JSON.stringify({
                'speech_text': lastSentence
            }));
        }
        stopSpeechToText();
    }, [results]);

    useEffect(() => {
        const speakAISocket = new WebSocket(
            'ws://'
            + '18.219.38.17:8000'
            + '/ws/talk/'
        );
        speakAISocketRef.current = speakAISocket;

        speakAISocket.addEventListener("message", event => {
            let data = JSON.parse(event.data)
            console.log(data)
            if (data.status === "complete") {
                setAudioGeneratedURL(baseAudioURL + '?noCache=' + Math.floor(Math.random() * 10000));
                audioPlayerRef.current.load();
                audioPlayerRef.current.play();
            }
        });
    }, []);

    useEffect(() => {
        audioPlayerRef.current.addEventListener('ended', function () {
            setReadyToSend(true);
        }, false);
    }, [audioGeneratedURL])


    if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
    return (
        <div className='flex flex-col h-screen  items-center py-8 text-xl font-mono  p-4 rounded-md text-black'>
            <div className='border-4 rounded-full p-4 w-36 h-36 flex items-center justify-center'>
                {isRecording && <l-ping size="150" speed="2" color="deepskyblue" ></l-ping>}
                {!isRecording && <l-quantum size="100" speed="1.75" color="deepskyblue" ></l-quantum>}
            </div>
            <div>
                <audio controls className='hidden' ref={audioPlayerRef}>
                    <source src={audioGeneratedURL} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
                <div className='my-4'>
                    <h1 className='hidden'>Recording: {isRecording.toString()}</h1>
                    <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
                        {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </button>
                    <ul>
                        {results.map((result) => (
                            <li key={result.timestamp}>{result.transcript}</li>
                        ))}
                        {interimResult && <li>{interimResult}</li>}
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default VoicePage;