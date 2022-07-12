import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import Progress_bar from './Progress_bar';

const LOCAL_STORAGE_KEY = 'med.medications'
const LOCAL_STORAGE_KEY_TWO = 'med.today'



function App() {
  const [medtotal, setMedtotal] = useState(0)
  const [todaymed, setMedtoday] = useState(0)
  const amountofmed = useRef()

  useEffect(() => {
    const storedmedtotal = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedmedtotal) setMedtotal(storedmedtotal);
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(medtotal));
  }, [medtotal]);

  useEffect(() => {
    const storedmedtoday = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TWO));
    if (storedmedtoday) setMedtoday(storedmedtoday);
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_TWO, JSON.stringify(todaymed));
  }, [todaymed]);


  function addamount(e){
    const num = amountofmed.current.value
    if (num === '') return
    setMedtotal(Number(num))
    amountofmed.current.value = null
  }

  function resetamount(e) {
    setMedtotal(0)
  }

  function resettoday(e) {
    setMedtoday(0)
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Daily medicine Tracker</h1>
          <div>Track your medication intake each day so you do not forget</div>
          <div>How much of the prescribed medicine did your doctor encourage you to take each day</div>
          <input ref={amountofmed} type ="number" />
          <button onClick={addamount}>Add daily amount</button>
          <button onClick={resetamount}>Reset</button>
          <div> did you take a med?</div>
          <div>one click is one med</div>
      
          <button 
            onClick={() => setMedtoday(todaymed+1)}
            disabled={todaymed === medtotal}
          >
            took med?
          </button>
          <button onClick={resettoday}>Reset</button>
          <div>{todaymed} / {medtotal}</div>
          
          <Progress_bar bgcolor="red" progress={(todaymed /medtotal)*100}  height={30} />
        </header>
      </div>
    </>

  );
}

export default App;
