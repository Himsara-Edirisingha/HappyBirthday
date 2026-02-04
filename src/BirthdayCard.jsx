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
      <audio ref={audioRef} src="/perfect.mp3" preload="auto" />

      <div className="card interactive">
        <div className="imgBox">
          <img src="/bg.png" alt="Cover" />
        </div>

        <div className="details valentine">
          <h4 className="color1">Hey Chooty Nona ❤️</h4>
          {!answered && (
            <>
              <h4 className="color2 question">
                I Have a Question For You!!! ❤️
              </h4>
              <p className="lead">
                10 months, countless smiles, and my favorite memories , all with
                you.
                <br />
                So here’s my question… <br />
                Will you be my Valentine? 💘
              </p>
              <div className="buttons" ref={buttonsRef}>
                <button className="btn yes" onClick={handleYes}>
                  Yes, always 💖
                </button>
                <button
                  ref={noRef}
                  className="btn no"
                  onClick={handleNo}
                  onMouseEnter={moveNoAway}
                  onMouseMove={moveNoAway}
                  style={noStyle}
                >
                  You sure? 🥺
                </button>
              </div>
            </>
          )}

          {answered === "yes" && (
            <div className="result yes-result">
              <h4>Answer accepted 💘</h4>
              <p>Thank you for being you , and for choosing me ❤️</p>
              <p className="small-note">
                Even if you had clicked “No”, auto-correct would’ve stepped in
                😌 You’re my Valentine ❤️
              </p>
            </div>
          )}

          {answered === "no" && (
            <div className="result no-result">
              <h4>❌ Wrong answer detected.</h4>
              <p>Correct answer: YES 💖</p>
              <p>Auto correct applied.</p>
              <p>You’re my Valentine 😌❤️</p>
              <p>Moda Hoonthuwa❤️</p>
            </div>
          )}
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
