import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [button ,setButton]=useState("Copy");
  const [length, setLength] = useState(5);
  const [numberallowed, setNumberallowed] = useState(false);
  const [charallowed, setCharallowed] = useState(false);
  const [Password, setPassword] = useState("");
  const Passwordref = useRef(null);
  const PasswordGenerator = useCallback(() => {
    let pass = "";

    let str = "ABCDEFHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallowed) {
      str += "0123456789";
    }
    if (charallowed) {
      str += "!@#$%^&*()}{[]?/|";
    }
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
    setButton("Copy")
  }, [length, numberallowed, charallowed, setPassword]);
  const copyclipboard = useCallback(() => {
    setButton("Copied!!");
    
    Passwordref.current?.select();
    Passwordref.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(Password);
  }, [Password,button]);
  useEffect(() => {
    PasswordGenerator();
  }, [length, numberallowed, charallowed, PasswordGenerator]);
  return (
    <>
      <div className=" p-3   w-full max-w-md mx-auto shadow-md rounded-lg px-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-4xl text-center my-3 mb-5 mt-5">
          Password Generator
        </h1>
        <div className=" flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={Password}
            className="outline-none w-full py-1 px-3 "
            placeholder="Password"
            ref={Passwordref}
            readOnly
          />
          <button
            onClick={copyclipboard}
            className=" outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0"
          >
            {button}
          </button>
        </div>
        <div className=" flex text-sm gap-x-3 p-3">
          <div className=" flex items-center gap-x-1">
            <input
              type="range"
              min={5}
              max={20}
              value={length}
              className=" cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="">Length:{length}</label>
          </div>
          <div className=" flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberallowed}
              id="numberinput"
              className=" cursor-pointer"
              onChange={() => {
                setNumberallowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberinput">Numbers</label>
          </div>
          <div className=" flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charallowed}
              id="charinput"
              className=" cursor-pointer"
              onChange={() => {
                setCharallowed((prev) => !prev);
              }}
            />
            <label htmlFor="charinput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
