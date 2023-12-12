import React, { useEffect, useState } from 'react';
// let count = true
const TextAuto = ({ text, action = false, setIndexRun = null }) => {
  const [displayText, setDisplayText] = useState(action ? "" : text);
  const [count, setCount] = useState(true);

  useEffect(() => {
    var scrollableBlock = document.getElementById('scrollableBlock');
    scrollableBlock.scrollTop = scrollableBlock.scrollHeight;
  }, [displayText])

  if (action && count) {
    setDisplayText("")
    setCount(false)
    var s = text[0] + text
    const interval = setInterval(() => {
      console.log(s);
      if (s.length <= 1) {
        if (setIndexRun !== null) {
          setIndexRun(prop => prop + 1)
        }
        clearInterval(interval);
      }
      else {
        setDisplayText(prop => {
          s = s.slice(1)
          return prop + s[0]
        });
      }
    }, 50);
  }


  return (
    <div className="text-container">
      <p>{displayText}</p>
    </div>
  );
};

export default TextAuto;