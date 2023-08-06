import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  state = {
    status: 'off',
    time: 1200,
  };

  intervalRef = React.createRef();
  bellSound = new Audio('sounds/bell.wav');

handleStatus(status) {
  this.setState({ status: status})
  console.log(status)
}

formatTime(time){
  let m = Math.floor(time/60)
  let s = time%60;
  if (m < 10) m = '0' + m.toString()
  if (s < 10) s = '0' + s.toString()
  return m + ':' + s
}

playBell() {
  this.bellSound.play()
}

startTimer() {
  this.setState({status: 'work'})
  this.intervalRef.current = setInterval(() => {
    if (this.state.time > 0) {
    this.setState({ 
      time: this.state.time - 1
    })}
    else { if (this.state.status === 'work') {
      this.setState({ status: 'rest', time: 20 });
      this.playBell()
      } else {
        this.setState({ status: 'work', time: 1200 })
        this.playBell()}
      }
  }, 1000)
  }
  
  stopTimer() {
    this.setState({status: 'off', time: 1200})
    clearInterval(this.intervalRef.current)
  }

  closeApp() {
    window.close()
  }


  render() {
    return (
      <div>
        <h1>Protect your eyes</h1>
        {this.state.status === 'off' &&
          <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
        }
        
        {this.state.status !== 'off' && 
        <div>
          <img src={"./images/" + this.state.status + ".png"} />
          <div className="timer"> 
            {this.formatTime(this.state.time)}
          </div>
        </div>}
        {this.state.status === 'off' &&
         <button className="btn" onClick={() => this.startTimer()} >Start</button>
        }         
        {this.state.status !== 'off' &&
         <button className="btn" onClick={() => this.stopTimer()} >Stop</button>
        } 
        
        <button className="btn btn-close" onClick={() => this.closeApp()}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
