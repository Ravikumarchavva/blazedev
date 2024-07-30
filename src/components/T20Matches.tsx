// components/T20Matches.tsx
"use client";
// src/app/components/T20Matches.tsx
import React, { useEffect, useState } from 'react';

type Match = {
  matchType: string;
  teams: string;
  date: string;
  venue: string;
};

const T20Matches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const getMatches = async () => {
      try {
        const response = await fetch('/api/t20Matches');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching T20 matches:', error);
      }
    };

    getMatches();
  }, []);

  return (
    <div>
      <h1>T20 Matches</h1>
      <ul>
        {matches.map((match, index) => (
          <li key={index}>
            <p><strong>Type:</strong> {match.matchType}</p>
            <p><strong>Teams:</strong> {match.teams}</p>
            <p><strong>Date:</strong> {match.date}</p>
            <p><strong>Venue:</strong> {match.venue}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default T20Matches;
