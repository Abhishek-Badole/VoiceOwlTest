import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";

export default function App() {
  const [audioUrl, setAudioUrl] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [transcriptions, setTranscriptions] = useState<any[]>([]);

  const API_URL = import.meta.env.VITE_API_URL;
  const fetchTranscriptions = async () => {
    const res = await axios.get(`${API_URL}/transcriptions`);
    setTranscriptions(res.data);
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setMessage("");
    if (!validateUrl(audioUrl)) {
      setError("Please enter a valid URL.");
      return;
    }
    try {
  const res = await axios.post(`${API_URL}/transcriptions`, { audioUrl });
      setMessage(`Stored with ID: ${res.data.id}`);
      setSuccess(true);
      setAudioUrl("");
      fetchTranscriptions();
    } catch (err: any) {
      setError("Error: " + err.message);
    }
  };

  useEffect(() => {
    fetchTranscriptions();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">VoiceOwl Transcription Demo</h1>
      <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
        <Input
          type="text"
          value={audioUrl}
          onChange={(e) => setAudioUrl(e.target.value)}
          placeholder="Enter audio URL"
          className="flex-1"
        />
        <Button type="submit">Submit</Button>
      </form>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert variant="success" className="mb-4">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      <h2 className="text-xl font-semibold mb-2">All Transcriptions</h2>
      <ul className="space-y-2">
        {transcriptions.map((t) => (
          <li key={t._id} className="p-2 border rounded bg-white">
            <p><strong>URL:</strong> {t.audioUrl}</p>
            <p><strong>Text:</strong> {t.transcription}</p>
            <p className="text-gray-500 text-sm">{new Date(t.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}