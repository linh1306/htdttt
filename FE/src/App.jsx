import axios from "axios";
import { useEffect, useState } from "react";
import TextAuto from "./TextAuto"
import BlockUl from "./BlockUl";

let render = 0

function App() {
  const [input, setInput] = useState("")
  const [send, setSend] = useState(false)
  const [load, setLoad] = useState(false)
  const [run, setRun] = useState(0)
  const [message, setMessage] = useState([
    // {
    //   object: "chatbot",
    //   mess: [
    //     {
    //       type: "text",
    //       value: "xin chào tôi là linh"
    //     },
    //     {
    //       type: "table",
    //       value: [
    //         ["triệu chứng", "hay đau đầu, chóng mặt, đầu óc không tỉnh táo hay đau đầu, chóng mặt, đầu óc không tỉnh táo"],
    //         ["triệu chứng", "hay đau đầu, chóng mặt, đầu óc không tỉnh táo"],
    //         ["triệu chứng", "hay đau đầu, chóng mặt, đầu óc không tỉnh táo"],

    //       ]
    //     },
    //     {
    //       type: "img",
    //       value: "https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg"
    //     },
    //     {
    //       type: "text",
    //       value: ["xin chào tôi là linh", ["đau cơ", "đau đầu"], "nguyên nhân", ["đau cơ", "đau đầu", "đau cơ", "đau đầu"]]
    //     },
    //   ]
    // },
    // {
    //   object: "user",
    //   mess: [
    //     {
    //       type: "text",
    //       value: "chào bạn"
    //     }
    //   ]
    // },
  ])

  useEffect(() => {
    var scrollableBlock = document.getElementById('scrollableBlock');
    scrollableBlock.scrollTop = scrollableBlock.scrollHeight;
  }, [message])

  useEffect(() => {
    if (render == 0) {
      document.querySelectorAll('textarea').forEach(function (textarea) {
        textarea.style.height = '30px';
        textarea.style.overflowY = 'hidden';
        textarea.addEventListener('input', function () {
          this.style.height = 'auto';
          this.style.height = (this.scrollHeight) + 'px';
        });
        textarea.addEventListener('focus', function () {
          setSend(true)
        })
        textarea.addEventListener('blur', function () {
          setSend(false)
        })
      });
      render = 1
    }
  }, [])

  const pust = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          object: "chatbot",
          mess: [
            {
              type: "text",
              value: "xin chào tôi là linh"
            }
          ]
        });
      }, 1000);
    });
  }

  const pustMessage = () => {
    if (!load) {
      setLoad(true)
      const obj = {
        object: "user",
        mess: [
          {
            type: "text",
            value: input
          }
        ]
      }
      setMessage(prop => [...prop, obj])
      axios.post("http://192.168.0.38:8080/chatbot", { mess: input })
        // axios.post("http://10.20.70.98:8080/chatbot", {mess:input})
        .then(res => {
          console.log(res);
          res = res.data
          setMessage(prop => [...prop, res])
          setLoad(false)
        })
        .catch((error) => {
          setLoad(false)
          console.error('Error:', error);
        });

      setInput("")
    }
  }

  const checkEnter = (event) => {
    if (event.key === "Enter" && input !== "") {
      event.preventDefault()
      pustMessage()
    }
  }



  return (
    <div className="w-screen h-screen bg-gray-600 py-4">
      <div className="max-w-xl h-full bg-slate-700 m-auto overflow-hidden rounded-3xl flex flex-col">
        <div className="w-full h-14 bg-gray-800 text-white flex justify-center items-center">
          <p>Chatbot-Nhóm 24</p>
        </div>
        <div id="scrollableBlock" className={`flex-1 transition-all duration-500 overflow-y-scroll`}>
          <div className="w-full text-white p-2 flex flex-col gap-2 justify-end min-h-[100%]">
            {message.map((mess, index_mess) => (
              <div key={index_mess} className={`flex items-end gap-1 ${mess.object === "user" && "flex-row-reverse"}`}>
                {mess.object === "chatbot" && (
                  <div className="w-10 rounded-full text-[14px] aspect-square bg-black flex justify-center items-center">
                    <i class="fa-solid fa-message-bot"></i>
                  </div>
                )}
                <div className={`w-full flex flex-col gap-1 ${mess.object === "user" && "items-end"}`}>
                  {mess.mess.map((item, index) => (
                    <div key={index} className={`flex max-w-[350px] overflow-hidden first:rounded-tl-2xl last:rounded-bl-2xl ${mess.object === "user" && "justify-end"}`}>
                      {item.type === "text" &&
                        <div className={`${mess.object === "chatbot" ? "rounded-r-3xl rounded-l-xl" : "rounded-3xl"} bg-slate-900 py-2 p-3`}>
                          {typeof item.value === "string" ?
                            <TextAuto text={item.value} action={mess.object === "chatbot"} />
                            :
                            <div>
                              {item.value.map((textItem, ỉndexItem) => (
                                <div>
                                  {typeof textItem === "string" ?
                                    <TextAuto text={textItem} action={mess.object === "chatbot"} />
                                    :
                                    <BlockUl mess={mess} textItem={textItem}/>
                                    }
                                    </div>
                              ))}
                                </div>
                          }
                            </div>
                          }
                          {
                            item.type === "img" &&
                            <div className={`${mess.object === "chatbot" ? "rounded-r-3xl rounded-l-xl" : "rounded-l-3xl rounded-r-xl"} overflow-hidden`}>
                              <img className="w-48" src={item.value} />
                            </div>
                          }
                          {
                            item.type === "table" &&
                            <div className={`rounded-r-3xl rounded-l-xl border overflow-hidden bg-slate-900 `}>
                              <table className="text-sm">
                                <tbody>
                                  {item.value.map((row, indexRow) => (
                                    <tr className="border-t-2 first:border-none">
                                      {row.map((itemRow, indexItem) => (
                                        <td className="border-l-2 first:border-none p-2">{itemRow}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          }
                        </div>
                  ))}
                    </div>
              </div>
            ))}
                {load &&
                  <div className={`flex items-end gap-1`}>
                    <div className="w-10 rounded-full text-[14px] aspect-square bg-black flex justify-center items-center">
                      <i class="fa-solid fa-message-bot"></i>
                    </div>
                    <div className={`w-14 flex flex-col gap-1 justify-center items-center`}>
                      <div className={`rounded-3xl bg-slate-900 py-2 p-3 flex gap-[2px]`}>
                        <p className="animate-bounce">.</p>
                        <p className="animate-bounce p2">.</p>
                        <p className="animate-bounce p3">.</p>
                      </div>
                    </div>
                  </div>
                }
              </div>
        </div>
          <div className="w-full group max-h-[200px] bg-gray-800 flex flex-col p-4 relative justify-center items-center">
            <div className="w-full h-full rounded-xl bg-gray-700 py-4 flex justify-center items-center">
              <textarea id="Input"
                rows={1}
                onChange={(e) => setInput(e.target.value.replace(/^\s+/, ''))}
                value={input}
                placeholder="Nhập tin nhắn"
                className="w-full max-h-[70px] overflow-hidden bg-transparent text-white resize-none outline-none px-3 py-1 pr-16"
                onKeyDown={(e) => checkEnter(e)}
              />
            </div>
            <div onClick={() => pustMessage()} className={`absolute right-7 w-8 ${input !== "" && !load ? "bg-green-500 active:scale-95 cursor-pointer" : (send ? "bg-red-500" : "")} rounded-xl flex justify-center items-center aspect-square  text-gray-300`}>
              <i class="fa-solid fa-paper-plane-top"></i>
            </div>
          </div>
        </div>
      </div>
      );
}

      export default App;