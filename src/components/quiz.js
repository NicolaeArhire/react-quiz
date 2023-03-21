import { useState, useEffect, useRef } from "react";
import "./quiz.css";
import { getQuestions, getCategories } from "../services/api";
import he from "he";

const Quiz = () => {
  const [state, setState] = useState({
    position: "-",
    userName: "-",
    category: "-",
    score: "-",
    queNo: "-",
    time: "-",
  });
  const timerQuiz = useRef(null);
  const titleRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [queNo, setQueNo] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [userName, setUserName] = useState("");
  const [question, setQuestion] = useState();
  const [answer1, setAnswer1] = useState();
  const [answer2, setAnswer2] = useState();
  const [answer3, setAnswer3] = useState();
  const [answer4, setAnswer4] = useState();
  const [answerArraySwitched, setAnswerArraySwitched] = useState([]);
  const [trigger, setTrigger] = useState(true);
  const [entry, setEntry] = useState([]);
  const [quizResults, setQuizResults] = useState([]);

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

  useEffect(() => {
    selectedDomain &&
      getQuestions(selectedDomain.replaceAll(" ", "_").replaceAll("&", "and").toLowerCase()).then(
        (res) => {
          setQuestion(he.decode(res[queNo - 1].question));
          setAnswer1(he.decode(res[queNo - 1].correctAnswer));
          setAnswer2(he.decode(res[queNo - 1].incorrectAnswers[0]));
          setAnswer3(he.decode(res[queNo - 1].incorrectAnswers[1]));
          setAnswer4(he.decode(res[queNo - 1].incorrectAnswers[2]));
        }
      );
  }, [queNo, selectedDomain]);

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  useEffect(() => {
    const answerArray = [answer1, answer2, answer3, answer4];
    const answerArraySwitched = answerArray.sort(() => Math.random() - 0.5);
    setAnswerArraySwitched(answerArraySwitched);
  }, [queNo, answer1, answer2, answer3, answer4]);

  useEffect(() => {
    const optA = document.querySelector(".optA");
    const optB = document.querySelector(".optB");
    const optC = document.querySelector(".optC");
    const optD = document.querySelector(".optD");

    if (optA.innerHTML.includes(answer1)) {
      optA.classList.remove("wrong_color");
      optA.classList.add("disableCorrectAnswerButton");
      optB.classList.add("wrong_color");
      optB.classList.remove("disableCorrectAnswerButton");
      optC.classList.add("wrong_color");
      optC.classList.remove("disableCorrectAnswerButton");
      optD.classList.add("wrong_color");
      optD.classList.remove("disableCorrectAnswerButton");
    }
    if (optB.innerHTML.includes(answer1)) {
      optA.classList.add("wrong_color");
      optA.classList.remove("disableCorrectAnswerButton");
      optB.classList.remove("wrong_color");
      optB.classList.add("disableCorrectAnswerButton");
      optC.classList.add("wrong_color");
      optC.classList.remove("disableCorrectAnswerButton");
      optD.classList.add("wrong_color");
      optD.classList.remove("disableCorrectAnswerButton");
    }
    if (optC.innerHTML.includes(answer1)) {
      optA.classList.add("wrong_color");
      optA.classList.remove("disableCorrectAnswerButton");
      optB.classList.add("wrong_color");
      optB.classList.remove("disableCorrectAnswerButton");
      optC.classList.remove("wrong_color");
      optC.classList.add("disableCorrectAnswerButton");
      optD.classList.add("wrong_color");
      optD.classList.remove("disableCorrectAnswerButton");
    }
    if (optD.innerHTML.includes(answer1)) {
      optA.classList.add("wrong_color");
      optA.classList.remove("disableCorrectAnswerButton");
      optB.classList.add("wrong_color");
      optB.classList.remove("disableCorrectAnswerButton");
      optC.classList.add("wrong_color");
      optC.classList.remove("disableCorrectAnswerButton");
      optD.classList.remove("wrong_color");
      optD.classList.add("disableCorrectAnswerButton");
    }
  }, [queNo, selectedDomain, correctAnswers, wrongAnswers]);

  useEffect(() => {
    const optA = document.querySelector(".optA");
    const optB = document.querySelector(".optB");
    const optC = document.querySelector(".optC");
    const optD = document.querySelector(".optD");

    optA.classList.remove("wrong_color");
    optA.classList.remove("disableCorrectAnswerButton");
    optB.classList.remove("wrong_color");
    optB.classList.remove("disableCorrectAnswerButton");
    optC.classList.remove("wrong_color");
    optC.classList.remove("disableCorrectAnswerButton");
    optD.classList.remove("wrong_color");
    optD.classList.remove("disableCorrectAnswerButton");
  }, [queNo, selectedDomain]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      position: entry.length + 1,
      userName: userName === "" ? "-" : userName,
      category:
        selectedDomain === ""
          ? "-"
          : selectedDomain
              .replaceAll("_", " ")
              .replaceAll("and", "&")
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" "),
      score: correctAnswers,
      queNo: correctAnswers === 0 && wrongAnswers === 0 ? "0" : correctAnswers + wrongAnswers,
      time: document.querySelector(".quiz_time").innerHTML,
    }));
  }, [queNo, selectedDomain]);

  function handleDomainChange(e) {
    setSelectedDomain(e.target.value);
    setQueNo(1);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setTrigger(!trigger);
    stopWatch();
  }

  function handleAnswer1() {
    if (!document.querySelector(".optA").textContent.includes(answer1)) {
      setWrongAnswers((prev) => prev + 1);
    } else {
      setCorrectAnswers((prev) => prev + 1);
    }
  }

  function handleAnswer2() {
    if (!document.querySelector(".optB").textContent.includes(answer1)) {
      setWrongAnswers((prev) => prev + 1);
    } else {
      setCorrectAnswers((prev) => prev + 1);
    }
  }

  function handleAnswer3() {
    if (!document.querySelector(".optC").textContent.includes(answer1)) {
      setWrongAnswers((prev) => prev + 1);
    } else {
      setCorrectAnswers((prev) => prev + 1);
    }
  }

  function handleAnswer4() {
    if (!document.querySelector(".optD").textContent.includes(answer1)) {
      setWrongAnswers((prev) => prev + 1);
    } else {
      setCorrectAnswers((prev) => prev + 1);
    }
  }

  function nextQue() {
    setQueNo((prev) => prev + 1);
    // setTrigger(!trigger);
  }

  function stopWatch() {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    timerQuiz.current = setInterval(function () {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }

      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      document.querySelector(".quiz_time").innerHTML = formattedTime;
    }, 1000);
  }

  function submitQuiz() {
    clearInterval(timerQuiz.current);
    document.querySelector(".quiz_time").innerHTML = "00:00:00";
    const newQuizResult = {
      position: entry.length + 1,
      userName: state.userName,
      category: state.category,
      score: state.score,
      queNo: state.queNo,
      time: state.time,
    };
    setQuizResults((prevState) => [...prevState, newQuizResult]);
  }

  return (
    <div>
      <div>
        <div className="title_container">
          <h1 className="title" ref={titleRef}>
            TRAIN YOUR KNOWLEDGE!
          </h1>
        </div>
      </div>
      <div className="quiz_user">
        Your Name:
        <input
          id="user"
          type="text"
          placeholder="Such empty..."
          maxLength={8}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        ></input>
      </div>
      <div id="dropdown_container">
        <label className="pick_domain">
          Pick a domain:
          <select name="domains" id="dropdown" onChange={handleDomainChange}>
            <option style={{ fontSize: "20px" }}>-</option>
            {categories.map((items) => (
              <option value={items} id="dropdown_options" key={items} style={{ fontSize: "20px" }}>
                {items}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={`que_show ${trigger ? "triggered" : ""}`}>
        <div className="questions">
          <span style={{ color: "yellow" }}>{queNo}/20.</span>{" "}
          {selectedDomain === "-" || selectedDomain === " " ? "" : question}
        </div>
        <button
          className="optA"
          onClick={handleAnswer1}
          disabled={
            correctAnswers + wrongAnswers === 20 || selectedDomain === "-" || selectedDomain === ""
          }
        >
          A. {selectedDomain === "-" || selectedDomain === " " ? "" : answerArraySwitched[0]}
        </button>
        <br />
        <button
          className="optB"
          onClick={handleAnswer2}
          disabled={
            correctAnswers + wrongAnswers === 20 || selectedDomain === "-" || selectedDomain === ""
          }
        >
          B. {selectedDomain === "-" || selectedDomain === " " ? "" : answerArraySwitched[1]}
        </button>
        <br />
        <button
          className="optC"
          onClick={handleAnswer3}
          disabled={
            correctAnswers + wrongAnswers === 20 || selectedDomain === "-" || selectedDomain === ""
          }
        >
          C. {selectedDomain === "-" || selectedDomain === " " ? "" : answerArraySwitched[2]}
        </button>
        <br />
        <button
          className="optD"
          onClick={handleAnswer4}
          disabled={
            correctAnswers + wrongAnswers === 20 || selectedDomain === "-" || selectedDomain === ""
          }
        >
          D. {selectedDomain === "-" || selectedDomain === " " ? "" : answerArraySwitched[3]}
        </button>
        <span className="time_container">
          <span className="quiz_time">00:00:00</span>
        </span>
        <div className="next_container">
          <div>
            <span id="correct_que">
              Correct: {correctAnswers} ({((correctAnswers / queNo) * 100).toFixed(2)}%)
            </span>
            <br />
            <span id="wrong_que">
              Wrong: {wrongAnswers} ({((wrongAnswers / queNo) * 100).toFixed(2)}
              %)
            </span>
            <br />
          </div>
          <div className="submit_container">
            <button className="submit" onClick={submitQuiz}>
              Submit Quiz
            </button>
            <button
              className="next_que"
              onClick={nextQue}
              disabled={queNo === 20 || queNo > correctAnswers + wrongAnswers}
            >
              {correctAnswers + wrongAnswers === 20 ? "Test done" : "Next question"}
            </button>
          </div>
        </div>
        <div></div>
      </div>
      <div className="standing_container">
        <span className="standings_header">STANDINGS</span>
        <div className="standing_title">
          <span>#.</span>
          <span>User</span>
          <span>Category</span>
          <span>Score</span>
          <span>Time</span>
        </div>
        {quizResults.map((result, index) => (
          <div key={index} className="standing_content">
            <span>{index + 1}.</span>
            <span>{result.userName}</span>
            <span>{result.category}</span>
            <span>
              {result.score}/{result.queNo}
            </span>
            <span>{result.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
