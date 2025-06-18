import React, { useRef } from "react";
import "./BirthdayCard.css";

const BirthdayCard = () => {
  const audioRef = useRef(null);

  const handleMouseEnter = () => {
    audioRef.current.play().catch((e) => {
      console.log("Play prevented:", e);
    });
  };

  const handleMouseLeave = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return (
    <>
      <audio ref={audioRef} src="/bdsong.mp3" preload="auto" />

      <div
        className="card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="imgBox">
          <div className="bark"></div>
          <img src="/cover.png" alt="Card Front" />
        </div>

        <div className="details">
          <h4 className="color1">To My Love,</h4>
          <h4 className="color2 margin">Happy Birthday, Beautiful ❤️</h4>
          <p>My dearest,</p>
          <p>On this special day, I just want to remind you</p>
          <p>how deeply you are loved and cherished.</p>
          <p>May your heart be filled with laughter,</p>
          <p>your soul with sunshine,</p>
          <p>and your life with all the dreams you hold close.</p>
          <p>Thank you for making every day brighter.</p>
          <p>May this birthday be just the beginning</p>
          <p>of a year filled with happiness and love.</p>
          <p className="text-right">Happy Birthday, my love! 🎂✨</p>
          <p className="text-right">💖 Forever Yours</p>
        </div>
      </div>
    </>
  );
};

export default BirthdayCard;
