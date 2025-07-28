import {useState, useCallback, useEffect, useRef} from 'react'
import Buttons from './components/buttons'
import './App.css'

function App() {
  const [color, setColor] = useState("#0F0E47")
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let base = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*-_+=[]{}~`";
    let allChars = base;
    let mustInclude = [];
    if (numberAllowed) {
      allChars += numbers;
      mustInclude.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }
    if (charAllowed) {
      allChars += symbols;
      mustInclude.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }
    for (let i = 0; i < length - mustInclude.length; i++) {
      let randIndex = Math.floor(Math.random() * allChars.length);
      pass += allChars.charAt(randIndex);
    }
    pass += mustInclude.join("");
    pass = pass.split('').sort(() => 0.5 - Math.random()).join('');
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  const copyPasswordToClip = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])
  useEffect(() => {passwordGenerator()}, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <div className='w-full h-screen flex flex-col justify-between items-center p-6 duration-200' style={{ backgroundColor: color }}>
    {/*top content*/}
      <pre className="text-white text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-bold font-mono whitespace-pre text-center leading-tight">
{`
___   _      __       __     _    ___  ____    _                _ 
 / _ \\ (_) _ _ \\ \\  _  / /___ | |  |  _|| | / _ | |__   ___  ____| |_ 
| |_| || || '_| \\ \\/ \\/ // _ \\| |_ | |_ | |__| ||  _ \\ / _ \\/__ /| |_ 
|_| |_||_||_|    \\_/ \\_/ \\___/|___||_|  |_____/ |_| |_|\\___/__)_){___)
`}
      </pre>

      {/*middle content*/}
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 text-2xl">
        <h2 className="text-white text-2xl font-bold text-center mb-4">Password Generator</h2>
        <div className="text-orange-600 text-4xl font-semibold bg-gray-600 rounded-lg">
          <div className='flex shadow overflow-hidden mb-4'>
          <input type='text' value = {password} className='outline-none w-full py-1 px-3' style={{}} placeholder='password' readOnly ref={passwordRef}>
          </input>
          <button className='outline-none bg-blue-800 text-white px-3 py-1 shrink-0 text-sm' onClick={copyPasswordToClip}>copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input type = "range" min={8} max={20} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}}></input>
            </div>
            <label>length: {length}</label>
            <input type='checkbox' defaultChecked={numberAllowed} id='numberInput' onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}> 
          </input>
          <label>numbers</label>
            <input type='checkbox' defaultChecked={charAllowed} id='charInput' onChange={() => {
            setCharAllowed((prev) => !prev);
          }}>
          </input>
          <label>characters</label>
          </div>
        </div>
      </div>

      {/*bottom buttons */}
      <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl'>
        <Buttons color="purple" setColor={setColor} />
        <Buttons color="blue" setColor={setColor} />
        <Buttons color="black" setColor={setColor} />
        <Buttons color="green" setColor={setColor} />
        <Buttons color="yellow" setColor={setColor} />
        <Buttons color="orange" setColor={setColor} />
        <Buttons color="red" setColor={setColor} />
        <Buttons color="#0F0E47" setColor={setColor} colorname="original" />
      </div>
    </div>
  )
}

export default App
