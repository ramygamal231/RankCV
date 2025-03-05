import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import CompetitionResults from './components/CompetitionResults';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

const API_URL = 'http://localhost:3002';

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const startCompetition = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      uploadedFiles.forEach(file => {
        formData.append('cvs', file);
      });

      console.log('Sending request to:', `${API_URL}/api/analyze-cvs`);
      
      const response = await fetch(`${API_URL}/api/analyze-cvs`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors'
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Server error' }));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received data:', data);
      
      if (!data || !data.leaderboard) {
        throw new Error('Invalid response format');
      }

      setResults({
        summary: data.summary || '',
        leaderboard: data.leaderboard || []
      });
    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred: ${error.message}`);
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="app">
        <header>
          <h1>CV Competition</h1>
        </header>
        
        {!results && (
          <div className="upload-section">
            <FileUpload 
              uploadedFiles={uploadedFiles} 
              setUploadedFiles={setUploadedFiles} 
            />
            
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <button 
                  className="start-button"
                  onClick={startCompetition}
                  disabled={uploadedFiles.length === 0}
                >
                  Start Competition
                </button>
                
                <p className="helper-text">
                  Make sure you've uploaded all CVs before starting
                </p>
              </>
            )}
          </div>
        )}

        {results && (
          <>
            <CompetitionResults results={results} />
            <button 
              className="refresh-button"
              onClick={() => {
                setResults(null);
                setUploadedFiles([]);
              }}
            >
              Start New Competition
            </button>
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App; 