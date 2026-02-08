import { useState } from "react";
import "./App.css";
import ConfettiCanvas from "./ConfettiCanvas";

const noTexts = [
  "No 🙈",
  "Are you sure? 😳",
  "Think again 💭",
  "Don’t break my heart 💔",
  "Last chance 😢",

  // new ones
  "Ouch… that hurt 🥲",
  "Retrying in 3…2…1 ⏳",
  "Bold choice 😅",
  "This is not going as planned 😬",
  "My disappointment is immeasurable 😔",
  "Okay but… why though? 🤨",
  "I believed in you 🥺",
  "Plot twist I didn’t expect 😮",
  "Even my code is sad now 💻💔",
  "Loading hope… failed ❌",
  "You woke up and chose chaos 😌",
  "I’ll pretend I didn’t see that 🙃",
  "Heart.exe has stopped working 💔",
  "Still time to change your mind 👀",
];


const loveNoteText = `
My love ❤️,

From the moment you came into my life,
everything became brighter and warmer.
You are my smile on hard days,
my calm in chaos, and my forever favorite person.

Happy Valentine’s Day 💕
`;

export default function App() {
  const [yes, setYes] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noText, setNoText] = useState(noTexts[0]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showNote, setShowNote] = useState(false);

  const moveNo = () => {
    const maxX = window.innerWidth < 480 ? 80 : 150;
    const maxY = window.innerWidth < 480 ? 60 : 100;

    setNoPos({
      x: Math.random() * maxX - maxX / 2,
      y: Math.random() * maxY - maxY / 2,
    });

    setNoText(noTexts[Math.floor(Math.random() * noTexts.length)]);
  };

  const handleYes = () => {
    setShowConfetti(true);
  };

  return (
    <div className="bg">
      <div className="heart-background"></div>
      {showConfetti && (
        <ConfettiCanvas
          onDone={() => {
            setShowConfetti(false);
            setYes(true);
          }}
        />
      )}

      <div className={`card ${!yes ? "heartbeat" : "success"}`}>
        {!yes ? (
          <>
            <h1>💖 Will you be my Valentine? 💖</h1>

            <img
              src="https://i.imgur.com/8Km9tLL.png"
              className="love-img"
            />

            <p>You make my world brighter ✨</p>

            <div className="btn-row">
              <button className="yes" onClick={handleYes}>
                Yes 😍
              </button>

              <button
                className="no"
                style={{
                  transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                }}
                onMouseEnter={moveNo}
                onClick={moveNo}
              >
                {noText}
              </button>
            </div>
          </>
        ) : (
          <>
            <span className="emoji">🎉</span>
            <h1>Yay!!! 💕</h1>

            <div className="note-card success-note">
              <div className="note-hearts"></div>

              <h2>💌 A Love Note for You 💌</h2>

              <div className="note-content">
                {loveNoteText.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              <p className="note-footer">Made with ❤️</p>
            </div>
          </>
        )}
        {/* 💌 Love Note */}
        {showNote && (
          <div className="note-card">
            <div className="note-hearts"></div>

            <h2>💌 A Love Note for You 💌</h2>

            <div className="note-content">
              {loveNoteText.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            <p className="note-footer">Made with ❤️</p>
          </div>
        )}

      </div>
    </div>
  );
}
