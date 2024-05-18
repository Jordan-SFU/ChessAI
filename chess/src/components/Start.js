import React from 'react';
import './Start.css'; // Import CSS for styling

const Start = () => {
  return (
    <div className="start">
      <h1 className="title">Chess AI</h1>
      <p className="description">Created by Jordan Mckenzie, Riley Su, Nick Chan, and Bjorn Flamminman</p>
      <div className="button-container">
      <button class="cssbuttons-io-button">
        Play
        <div class="icon">
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </button>
    </div>
    </div>
  );
};

export default Start;
