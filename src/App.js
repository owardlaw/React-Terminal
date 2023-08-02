import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Typewriter from "typewriter-effect";
import headshot from "./assets/headshot.jpg";

function App() {
  const vistor = "vistor@mySite";
  const flasher = "$> ";
  
  const [terminalHistory, setTerminalHistory] = useState([
    {
      content: (
        <div className="user-output">
          {vistor} <p id="output-flasher">{flasher}</p>
          <p style={{ color: "white" }}>help</p>
        </div>
      ),
      isHtml: true,
    },
    {
      content: (
        <p className="terminal-output">
          bash-3.2: help, clear, astro, github, about me, linkedin, resume :D
        </p>
      ),
      isHtml: true,
    },
  ]);

  const [currentInput, setCurrentInput] = useState("");
  const [showInput, setShowInput] = useState(true);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const divRef = useRef();
  const terminalWindowRef = useRef();

  const [closeTerminalState, setCloseTerminalState] = useState(false);
  const [fullsizeTerminalState, setFullsizeTerminalState] = useState(false);

  useEffect(() => {
    if (!closeTerminalState) {
      const scrollContainer = terminalWindowRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [terminalHistory]);

  const closeTerminal = () => {
    setTerminalHistory([]);
    setCloseTerminalState(true);
    setCurrentInput("");
  };

  const minimizeTerminal = () => {
    setCloseTerminalState(true);
  };

  const fullsizeTerminal = () => {
    setFullsizeTerminalState(!fullsizeTerminalState);
  };

  const fullScreenStyles = fullsizeTerminalState
    ? { height: "100%", width: "100%", borderRadius: "0px" }
    : {};

    useEffect(() => {
      const updateDimensions = () => {
        if (terminalWindowRef.current) {
          setDimensions({
            width: terminalWindowRef.current.clientWidth,
            height: terminalWindowRef.current.clientHeight,
          });
        }
      };
    
      if (fullsizeTerminalState) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      } else {
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
    
        return () => {
          window.removeEventListener("resize", updateDimensions);
        };
      }
    }, [fullsizeTerminalState]);
    

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      setTerminalHistory((prevHistory) => [
        ...prevHistory,
        {
          content: (
            <div className="user-output">
              {vistor} <p id="output-flasher">{flasher}</p>
              <p style={{ color: "white" }}>{currentInput}</p>
            </div>
          ),
          isHtml: true,
        },
      ]);

      setCurrentInput("");

      const command = currentInput.toLowerCase();

      if (command === "clear") {
        setTerminalHistory([]);
      } else if (command === "github") {
        setTerminalHistory((prevHistory) => [
          ...prevHistory,
          {
            content: (
              <p className="terminal-output">
                <p> bash-3.2: Click</p>
                <a href="https://github.com/owardlaw" target="_blank">
                  me
                </a>
              </p>
            ),
            isHtml: true,
          },
        ]);
      } else if (command === "linkedin") {
        setTerminalHistory((prevHistory) => [
          ...prevHistory,
          {
            content: (
              <p className="terminal-output">
                <p> bash-3.2: Click</p>
                <a
                  href="https://www.linkedin.com/in/owenwardlaw/"
                  target="_blank"
                >
                  me
                </a>
              </p>
            ),
            isHtml: true,
          },
        ]);
      } else if (command === "resume") {
        setTerminalHistory((prevHistory) => [
          ...prevHistory,
          {
            content: (
              <p className="terminal-output">
                <p> bash-3.2: Click</p>
                <a
                  href="https://docs.google.com/document/d/1iZnDHxjBRJ8rRSAJenJsKZQt6G_zpbP7YI1VKSNA1_M/edit?usp=sharing"
                  target="_blank"
                >
                  me
                </a>
              </p>
            ),
            isHtml: true,
          },
        ]);
      } else if (command === "astro") {
        setTerminalHistory((prevHistory) => [
          ...prevHistory,
          {
            content: (
              <p className="terminal-output">
                <p> bash-3.2: Click</p>
                <a
                  href="https://www.astrobin.com/users/owardlaw/"
                  target="_blank"
                >
                  me
                </a>
              </p>
            ),
            isHtml: true,
          },
        ]);
      } else if (command === "about me") {
        setTerminalHistory((prevHistory) => [
          ...prevHistory,
          {
            content: (
              <p className="terminal-output-about-me">
                <p> bash-3.2:</p>
                <img alt="headshot" key="0" src={headshot} />
                <p>I love astrophotography, rubiks cubes, and playing piano!</p>
              </p>
            ),
            isHtml: true,
          },
        ]);
      } else if (command === "help") {
        setTerminalHistory((prevHistory) => [
          ...prevHistory,
          {
            content: (
              <p className="terminal-output">
                bash-3.2: help, clear, astro, github, about me, linkedin, resume
                :D
              </p>
            ),
            isHtml: true,
          },
        ]);
      } else {
        setTerminalHistory((prevHistory) => [
          ...prevHistory,
          {
            content: (
              <p className="terminal-output">bash-3.2: command not found</p>
            ),
            isHtml: true,
          },
        ]);
      }
    }
  };

  const handleInputChange = (event) => {
    setCurrentInput(event.target.value);
  };

  const text =
    "Hello and welcome to my terminal! Type 'help' for a list of commands.";

  return (
    <div className="App">
      {closeTerminalState ? (
        <button
          id="open-terminal-button"
          onClick={() => setCloseTerminalState(false)}
        >
          {" "}
          Open Terminal{" "}
        </button>
      ) : (
        <div
          className="terminal-container"
          style={fullScreenStyles}
          ref={terminalWindowRef}
        >
            <div className="terminal-header">
            <div className="terminal-buttons">
              <div
                className="circle"
                style={{ backgroundColor: "#FF605C" }}
                onClick={closeTerminal}
              />
              <div
                className="circle"
                style={{ backgroundColor: "#FFBD44" }}
                onClick={minimizeTerminal}
              />
              <div
                className="circle"
                style={{ backgroundColor: "#00CA4E" }}
                onClick={fullsizeTerminal}
              />
            </div>

            <div className="terminal-title">
              Owen Wardlaw -- -zsh {dimensions.height}px x {dimensions.width}px
            </div>
          </div>
          <div className="terminal-window" ref={divRef}>
            {terminalHistory.map((cmd, i) =>
              cmd.isHtml ? (
                <p key={i}>{React.cloneElement(cmd.content)}</p>
              ) : (
                <p key={i}>{cmd.content}</p>
              )
            )}
          </div>
          <div className="terminal-bar">
            <div className="terminal-text">{vistor}</div>
            <div className="terminal-carrot">{flasher}</div>

            {showInput ? (
              <input
                type="text"
                className="terminal-input"
                value={currentInput}
                onKeyPress={handleKeyPress}
                onChange={handleInputChange}
              />
            ) : (
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString(text)
                    .pauseFor(100)
                    .deleteAll()
                    .callFunction(() => {
                      setShowInput(true);
                    })
                    .start();
                }}
                options={{
                  delay: 1,
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
