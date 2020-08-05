import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [averageFuelLap, setAverageFuelLap] = useState(0);
  const [averageLaptime, setAverageLaptime] = useState(0);
  const [fuelInTank, setFuelInTank] = useState(0);
  const [fuelRequired, setFuelRequired] = useState(0);
  const [lapsRemaining, setLapsRemaining] = useState(0);
  const [fuelToTake, setFuelToTake] = useState(0);
  const [oneLapBuffer, setOneLapBuffer] = useState(0);
  const [twoLapBuffer, setTwoLapBuffer] = useState(0);

  useEffect(() => {
    console.log("Recalculating");
    let calcLapsRemaining = (timeLeft*60)/averageLaptime;
    console.log("Laps remaining: " + calcLapsRemaining);
    let calcFuelRequired = calcLapsRemaining * averageFuelLap;
    console.log("Fuel required: " + calcFuelRequired);
    let calcFuelToTake = calcFuelRequired - fuelInTank;
    console.log("Fuel to take: " + calcFuelToTake);
    let calcOneLapBuffer = calcFuelToTake + (1*averageFuelLap);
    console.log("One lap buffer: " + calcOneLapBuffer);
    let calcTwoLapBuffer = calcOneLapBuffer + (1*averageFuelLap);
    console.log("Two lap buffer: " + calcTwoLapBuffer);

    setLapsRemaining(Math.ceil(calcLapsRemaining));
    setFuelRequired(Math.ceil(calcFuelRequired));
    setFuelToTake(Math.ceil(calcFuelToTake));
    setOneLapBuffer(Math.ceil(calcOneLapBuffer));
    setTwoLapBuffer(Math.ceil(calcTwoLapBuffer));

  }, [timeLeft, averageFuelLap, averageLaptime, fuelInTank]);


  return (
    <div className="container">
      <div className="App">
        <header><h1>Fuel Calculator</h1></header>
        <h3>Input</h3>
        <form>
          <div className="form-group">
            <label htmlFor="time">Time left in minutes</label>
            <input type="number" className="form-control" id="time" step="any"  onChange={e => setTimeLeft(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="average-fuel-lap">Average L/Lap</label>
            <input type="number" className="form-control" id="average-fuel-lap" step="any" onChange={e => setAverageFuelLap(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="average-laptime">Average Laptime in seconds</label>
            <input type="number" className="form-control" id="average-laptime" step="any" onChange={e => setAverageLaptime(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="fuel-in-tank">Fuel in tank</label>
            <input type="number" className="form-control" id="fuel-in-tank" step="any" onChange={e => setFuelInTank(e.target.value)} />
          </div>
        </form>
        <div className="results">
          <h3>Results</h3>
          <ul>
            <li>Laps Remaining: {!isNaN(lapsRemaining) && lapsRemaining}</li>
            <li>Fuel required: {!isNaN(fuelRequired) && fuelRequired}</li>
            <li>Fuel to take: {!isNaN(fuelToTake) && fuelToTake}</li>
            <li>With 1 lap buffer: {!isNaN(oneLapBuffer) && oneLapBuffer}</li>
            <li>With 2 lap buffer: {!isNaN(twoLapBuffer) && twoLapBuffer}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
