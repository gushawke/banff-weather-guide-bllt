import React from 'react'
import { images } from './constants'
import { motion } from 'framer-motion'
import './App.css'

var today = new Date() 

class App extends React.Component {
  


constructor(props) {
  super();
  this.state = {
    list: [],
    error: null,
  };
  this.state.location = {
    long: "-115.569",
    lat: "51.1762"
  }
  // console.log(this.state.location);
}

buildList = (data) => {
  console.log(data);
  this.setState({list: data.dataseries})
}

async componentDidMount() {
  let url = `http://www.7timer.info/bin/api.pl?lon=${this.state.location.long}&lat=${this.state.location.lat}&product=civillight&output=json`
  // const tomorrow = today
 
  fetch(url)
  .then(response => response.json())
  .then(this.buildList)
  .catch()
}




render() {

  return (
    <div className="body">
      <div className='header'>
      <h5> {today.toLocaleDateString('en-us', { weekday:"long", month: 'short', day: 'numeric'})}</h5>
        <h2>The Banff Weather Guide</h2>
        <h4>Banff & Lake Louise Tourism</h4>
        <a href='https://www.banfflakelouise.com/trip-planning/weather-forecast' title="Full week forecast" target='blank'>
        <img className='responsive'  src={images.banff} alt='logo'></img>
        </a>
      </div>
      <motion.div 
         whileInView={{y: [100, 0], opacity: [0, 1] }}
         transition={{ duration:  0.8 }}
          className="row">
       
        <div className="card">
          <div >
            { this.state.list.slice(0,1).map(item => (
              <div key={item.date} className="container">
               
                <h3 >Today</h3>
         
                <p className="maxTemp">{item.temp2m.max}&deg;C</p>
                <p className='temp'>MAX</p>
                <p className="minTemp">{item.temp2m.min}&deg;C</p>
                <p className="minTemp">Min Temp</p>
                <p className="description">{item.weather}</p>
              </div>

              ))}   
          </div>
        </div>

        <div className="card">
          <div >
          { this.state.list.slice(1,2).map(item => (
            <div key={item.date} className="container">
              <h3>Tommorow</h3>

              <p className="maxTemp">{item.temp2m.max}&deg;C</p>
                <p className='temp'>MAX</p>
                <p className="minTemp">{item.temp2m.min}&deg;C</p>
                <p className="minTemp">Min Temp</p>
                <p className="description">{item.weather}</p>
            </div>

            ))}

          </div>
        </div>
      </motion.div>
    </div>
  );
}
}

// ReactDOM.render(<App />, document.querySelector("#app"));

export default App