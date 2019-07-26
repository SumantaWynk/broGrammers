import React, { Component } from 'react';
import './App.css';
import * as faceapi from 'face-api.js';
import MoodDetectByEmoji from './components/MoodDetectByEmoji';
import LayoutContainer from './components/LayoutContainer';


let globalmood = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detecting: false,
      currentMood: null
    }
  }
  componentDidMount() {
    const video = document.getElementById('video');
    video.addEventListener('play', () => this.detectMood(video));
  }

  fetchOneMood = () => {
    if (globalmood.length === 0)
      return;
    var modeMap = {};
    var max = globalmood[0], maxCount = 1;
    for (var i = 0; i < globalmood.length; i++) {
      var el = globalmood[i];
      if (modeMap[el] == null)
        modeMap[el] = 1;
      else
        modeMap[el]++;
      if (modeMap[el] > maxCount) {
        max = el;
        maxCount = modeMap[el];
      }
    }
    return max;
  }

  init = (videoObject) => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models')
    ]).then(() => this.startVideo(videoObject))
  }

  startVideo = (videoObject) => {
    navigator.getUserMedia(
      { video: {} },
      stream => {
        videoObject.srcObject = stream;
        this.MediaStream = stream.getTracks()[0];
      },
      err => console.error(err)
    )
  }

  endVideo = () => {
    // const video = document.getElementById('video');
    //  const canvas = document.querySelector('canvas');
    this.MediaStream.stop();
    // video.remove();
    // canvas.remove();
    const currentMood = this.detectsinglemood();

    console.log(globalmood);
    if (globalmood.length === 0) {
      this.setState({
        detecting: false,
        currentMood: 'default'
      })
    } else {
      this.setState({
        detecting: false,
        currentMood: currentMood
      })
    }

    globalmood = [];
  }

  detectsinglemood() {
    if (globalmood.length === 0)
      console.log("null");
    var modeMap = {};
    var max = globalmood[0], maxCount = 1;
    for (var i = 0; i < globalmood.length; i++) {
      var el = globalmood[i];
      if (modeMap[el] == null)
        modeMap[el] = 1;
      else
        modeMap[el]++;
      if (modeMap[el] > maxCount) {
        max = el;
        maxCount = modeMap[el];
      }
    }
    return max;
  }
  detectMood(video) {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.getElementById('canvasElem').append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
      const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withFaceDescriptor()
      if (!detections) {
        return;
      }
      //  const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      //faceapi.draw.drawDetections(canvas, resizedDetections)
      //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
      //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
      const detection = await this.getMood(detections);
      return detection;
    }, 100)
  }

  startDetectingMood = () => {
    this.setState({
      detecting: true
    })
    const video = document.getElementById('video');
    this.init(video);

  }

  getMood = async (detections) => {
    if (detections) {
      var angrystring = detections.expressions.angry.toString().split('.')[1].slice(0, 5);
      var dstring = detections.expressions.disgusted.toString().split('.')[1].slice(0, 5);
      var fxstring = detections.expressions.fearful.toString().split('.')[1].slice(0, 5);
      var happystring;
      var exacthappy = detections.expressions.happy;
      var exactneutral = detections.expressions.neutral;

      if (exacthappy === 1) {
        happystring = 100000;
        //console.log(happystring)
      }
      else
        happystring = detections.expressions.happy.toString().split('.')[1].slice(0, 5);
      var neutralstring;
      if (exactneutral === 1) {
        neutralstring = 100000;
      }
      else
        neutralstring = detections.expressions.neutral.toString().split('.')[1].slice(0, 5);


      var sadstring = detections.expressions.sad.toString().split('.')[1].slice(0, 5);
      var surstring = detections.expressions.surprised.toString().split('.')[1].slice(0, 5);

      var angry = parseInt(angrystring);
      var disgusted = parseInt(dstring);
      var fearful = parseInt(fxstring);
      var happy = parseInt(happystring);
      var neutral = parseInt(neutralstring);
      var sad = parseInt(sadstring);
      var surprised = parseInt(surstring);
      let obj = {
        angry: angry,
        disgusted: disgusted,
        fearful: fearful,
        happy: happy,
        neutral: neutral,
        sad: sad,
        surprised: surprised
      }
      var mood = Math.max(angry, disgusted, fearful, happy, neutral, sad, surprised);
      Object.keys(obj).forEach(function (key) {
        if (obj[key] === mood) {
          if (key !== "neutral") {
            globalmood.push(key);
          }
        }
      });
    }
  }

  render() {
    const { currentMood } = this.state;
    return (
      <div className="App">
        <div className="jumbotron">
          <div className="row">
            <div className="col-md-6">
              <span id="canvasElem">
                <video id="video" width="600" height="340" autoPlay muted style={{ border: '1px solid red' }}></video>
              </span>
              <br />
              {
                this.state.detecting ? <button type="button" className="btn btn-info" disabled>Detecting Mood...</button> : <button type="button" className="btn btn-success" onClick={this.startDetectingMood}>Detect Mood</button>
              }
              <button type="button" className="btn btn-danger" onClick={this.endVideo}>End Detection</button>
            </div>
            <div className="col-md-6">
              {
                !currentMood ? null :
                  <MoodDetectByEmoji
                    currentMood={currentMood}
                  />
              }
            </div>
          </div>
        </div>
        {
          !currentMood || currentMood === 'default' ? null :
            <LayoutContainer
              currentMood={currentMood}
            />
        }
      </div>
    )
  }
}

export default App;
