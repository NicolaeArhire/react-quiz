import { useEffect, useRef } from "react";
import "./nav.css";

const Navigation = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    const text = titleRef.current;
    const letters = text.innerText.split("");
    text.innerText = "";

    for (let i = 0; i < letters.length; i++) {
      const span = document.createElement("span");
      span.innerText = letters[i];
      span.style.animationDelay = i * 0.05 + "s";
      text.appendChild(span);
    }
    text.style.display = "inline-block";
  }, []);

  return (
    <div>
      <div className="title_container">
        <h1 className="title" ref={titleRef}>
          TRAIN YOUR KNOWLEDGE!
        </h1>
      </div>
    </div>
  );
};

export default Navigation;
