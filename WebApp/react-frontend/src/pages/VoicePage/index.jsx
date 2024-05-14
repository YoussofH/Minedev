import React, { useEffect } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import sendRequest from '../../remote/sendRequest';
import {useParams} from "react-router-dom";


const VoicePage = ({ match }) => {
    const {conversationId} = useParams();

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

    useEffect(() => {
        const lastSentence = results[results.length - 1];
        if (lastSentence !== "" && results.length > 0) {
            console.log(lastSentence);
        }
    }, [results]);


    if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
    return (
        <div>
            <h1>Recording: {isRecording.toString()}</h1>
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
    )
}

export default VoicePage