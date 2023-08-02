import Typing from "react-typing-animation";

const TypingAnimation = ({ text }) => {
  return (
    <Typing>
      <span>{text}</span>
    </Typing>
  );
};

export default TypingAnimation;
