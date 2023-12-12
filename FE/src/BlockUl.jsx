import React, { useState, useEffect } from 'react';
import TextAuto from "./TextAuto"

const BlockUl = ({ mess, textItem }) => {
  const [indexRun, setIndexRun] = useState(0)

  return (
    <ul className="list-disc ml-5">
      {textItem.map((trCh, indexTrCh) => (
        <li className={`${indexTrCh > indexRun ? "hidden" : ""}`}>
          <TextAuto text={trCh} action={mess.object === "chatbot" && indexTrCh === indexRun} setIndexRun={setIndexRun} />
        </li>
      ))}
    </ul>
  );
};

export default BlockUl;