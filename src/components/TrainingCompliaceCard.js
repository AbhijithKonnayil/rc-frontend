import React from "react";
import "../styles.css";

import { useNavigate } from "react-router-dom";

function TrainingComplianceCard({ training, index }) {
  const navigate = useNavigate();
  return (
    <li key={index} style={{ textAlign: "left" }}>
      <div className="bg-gray-200 rounded-lg shadow-lg p-8 my-8">
        <h2 className="text-xl font-semibold">
          {training.title}[ {training.code}]{" "}
        </h2>
        <p className="text-gray-700">{training.description}</p>
        <div className="mt-4 debug">
          <strong>Attempts:</strong> {training.attempts}
          <br />
          <strong>Status:</strong> {training.status}
          <br />
          {training.status === "pending" && (
            <div className="flex justify-end">
              <a
                href={training.training_material}
                target="_blank"
                className="mr-4"
              >
                <button
                  className="button"
                  onClick={() => {
                    navigate(`/quiz/${training.id}`);
                  }}
                >
                  Launch
                </button>
              </a>
              <button
                className="button"
                onClick={() => {
                  navigate(`/quiz/${training.id}`);
                }}
              >
                Test Knowledge
              </button>
            </div>
          )}
          {training.status === "completed" && (
            <div>
              <strong>Score:</strong> {training.score}
              <br />
              <strong>Completion Date:</strong>{" "}
              {training.completion_date || "N/A"}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default TrainingComplianceCard;
