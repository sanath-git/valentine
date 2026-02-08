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
  "Loading hope… failed ❌",
  "You woke up and chose chaos 😌",
  "I’ll pretend I didn’t see that 🙃",
  "Still time to change your mind 👀",
];


const loveNoteText = `
My love ❤️,

From the moment you came into my life, everything felt a little brighter and warmer.

You’re my smile on tough days, my calm when things feel messy, and the person I always come back to. Even when life gets loud, you somehow make it feel okay.

I know we fight sometimes and say silly things we don’t really mean, but that’s just us figuring things out. Underneath all of that, I know we care about each other and the love is always there, even on the days we don’t say it properly.

And even though it’s only been about four months since we met, it honestly feels like I’ve known you for years. I just want to keep being with you 💕
Happy Valentine’s Week 💕
I love you, Babaaaaa ❤️
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
            <h1>💖 Will you be my Valentine Lilli? 💖</h1>

            <img
            // src="https://tenor.com/view/dare-aggie-dare-aggie-bunny-dare-aggie-bunny-love-dare-aggie-bunny-cuddle-darea-ggie-bunny-cute-gif-16876821357037349333"
              src="https://t4.ftcdn.net/jpg/05/84/66/13/360_F_584661359_CN18OI3yMmh8s154PUZYswxKzZjgLlFd.jpg"
              className="love-img"
            />

            <p> You make my world brighter ✨ </p>
            <p>  Be my Valentine and let’s turn every day into
  a beautiful adventure together 🌍💖</p>

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
<p>
  Thank you for being my Valentine and choosing me today.
  I’m so grateful to have you and to share this love with you 💖
</p>


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
