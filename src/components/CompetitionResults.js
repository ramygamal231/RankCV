import React from 'react';

function CompetitionResults({ results }) {
  if (!results || !results.leaderboard) {
    return <div>No results available</div>;
  }

  return (
    <div className="results-container">
      <h2>Competition Results</h2>
      
      <div className="summary-section">
        <h3>Competition Summary</h3>
        <div className="summary-content">
          <p>{results.summary || "No summary available"}</p>
        </div>
      </div>

      <div className="leaderboard-section">
        <h3>Leaderboard</h3>
        {results.leaderboard.length === 0 ? (
          <p>No candidates found in the analysis</p>
        ) : (
          results.leaderboard.map((entry, index) => (
            <div key={index} className="leaderboard-entry">
              <div className="rank">#{index + 1}</div>
              <div className="candidate-details">
                <div className="candidate-header">
                  <h4>{entry.name || `Candidate ${index + 1}`}</h4>
                  <div className="score">Score: {entry.score}/100</div>
                </div>
                
                <div className="analysis">
                  <div className="pros-cons-container">
                    <div className="pros">
                      <h5>Pros:</h5>
                      {entry.pros && entry.pros.length > 0 ? (
                        <ul>
                          {entry.pros.map((pro, i) => (
                            <li key={i}>{pro}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>No pros listed</p>
                      )}
                    </div>
                    
                    <div className="cons">
                      <h5>Cons:</h5>
                      {entry.cons && entry.cons.length > 0 ? (
                        <ul>
                          {entry.cons.map((con, i) => (
                            <li key={i}>{con}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>No cons listed</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="justification">
                    <h5>Justification:</h5>
                    <p>{entry.justification || "No justification provided"}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CompetitionResults; 