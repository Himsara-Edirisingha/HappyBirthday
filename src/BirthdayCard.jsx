import React, { useRef, useState } from "react";
import confetti from "canvas-confetti";
import "./BirthdayCard.css";

const BirthdayCard = () => {
  const audioRef = useRef(null);
  const [answered, setAnswered] = useState(null); 
  const buttonsRef = useRef(null);
  const noRef = useRef(null);
  const [noStyle, setNoStyle] = useState({});

  const playSong = () => {
    if (!audioRef.current) return;
    audioRef.current.play().catch(() => {});
  };

  const handleYes = () => {
    setAnswered("yes");
    playSong();
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleNo = () => {
    setAnswered("no");
  };

  const moveNoAway = (e) => {
    if (!buttonsRef.current || !noRef.current) return;
    const container = buttonsRef.current.getBoundingClientRect();
    const noBtn = noRef.current.getBoundingClientRect();

    // generate a random position within the buttons container bounds
    const maxX = Math.max(0, container.width - noBtn.width);
    const maxY = Math.max(0, container.height - noBtn.height);

    // pick a random spot but biased away from current cursor
    const randX = Math.floor(Math.random() * (maxX + 1));
    const randY = Math.floor(Math.random() * (maxY + 1));

    // convert to translate relative to original position
    const origLeft = noBtn.left - container.left;
    const origTop = noBtn.top - container.top;
    const dx = randX - origLeft;
    const dy = randY - origTop;

    setNoStyle({ transform: `translate(${dx}px, ${dy}px)` });
  };

  return (
    <>
      <audio ref={audioRef} src="/bdsong.mp3" preload="auto" />

      <div className="card interactive">
        <div className="imgBox">
          <img src="/cover.png" alt="Cover" />
        </div>

        <div className="details valentine">
          <h4 className="color1">Hey you ❤️</h4>
          {!answered && (
            <>
              <h4 className="color2 question">Will you be my Valentine?</h4>
              <p className="lead">I can't imagine a day without you by my side.</p>
              <div className="buttons" ref={buttonsRef}>
                <button className="btn yes" onClick={handleYes}>
                  Yes 💖
                </button>
                <button
                  ref={noRef}
                  className="btn no"
                  onClick={handleNo}
                  onMouseEnter={moveNoAway}
                  onMouseMove={moveNoAway}
                  style={noStyle}
                >
                  No 😢
                </button>
              </div>
            </>
          )}

          {answered === "yes" && (
            <div className="result yes-result">
              <h4>She said yes! 🎉</h4>
              <p>I'm the luckiest. Can't wait to make memories together.</p>
            </div>
          )}

          {answered === "no" && (
            <div className="result no-result">
              <h4>Oh—</h4>
              <p>Thank you for being honest. Sending you a warm hug anyway.</p>
            </div>
          )}

          <p className="small-note">Tip: Click the heart to play music.</p>
        </div>
{/* 
        <button
          className="floating-heart"
          aria-label="play"
          onClick={playSong}
          title="Play song"
        >
          ❤️
        </button> */}
      </div>
    </>
  );
};

export default BirthdayCard;
