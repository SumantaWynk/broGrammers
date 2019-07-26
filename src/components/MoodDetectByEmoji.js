import React, { Component } from 'react';
import { EMOJI, EMOJI_URL } from '../AppConst';

class MoodDetectByEmoji extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMoodEmoji: null,
            defaultCase: null
        }
    }
    componentDidMount() {
        this.init();
    }
    componentDidUpdate(prevProps, prevState) {
        const { currentMood } = this.props;
        if (prevProps.currentMood === currentMood) {
            return
        }
        this.init();
    }

    init = () => {
        const { currentMood } = this.props;
        if (currentMood) {
            switch (currentMood) {
                case EMOJI.ANGRY:
                    this.setState({
                        currentMoodEmoji: EMOJI_URL.ANGRY,
                        defaultCase: null
                    })
                    break;
                case EMOJI.DISGUSTING:
                    this.setState({
                        currentMoodEmoji: EMOJI_URL.DISGUSTING,
                        defaultCase: null
                    })
                    break;
                case EMOJI.FEARFUL:
                    this.setState({
                        currentMoodEmoji: EMOJI_URL.FEARFUL,
                        defaultCase: null
                    })
                    break;
                case EMOJI.HAPPY:
                    this.setState({
                        currentMoodEmoji: EMOJI_URL.HAPPY,
                        defaultCase: null
                    })
                    break;
                case EMOJI.NEUTRAL:
                    this.setState({
                        currentMoodEmoji: EMOJI_URL.NEUTRAL,
                        defaultCase: null
                    })
                    break;
                case EMOJI.SAD:
                    this.setState({
                        currentMoodEmoji: EMOJI_URL.SAD,
                        defaultCase: null
                    })
                    break;
                case EMOJI.SURPRISED:
                    this.setState({
                        currentMoodEmoji: EMOJI_URL.SURPRISED,
                        defaultCase: null
                    })
                    return;
                default:
                    this.setState({
                        defaultCase: "Hey ! Why Don't you smile ? Please smile && turn the camera on atleast 10 sec "
                    })
                    return null;

            }
        }
    }
    render() {
        const { currentMoodEmoji, defaultCase } = this.state;
        console.log(defaultCase)
        const { currentMood } = this.props
        return (
            <>
                {
                    !defaultCase ? <>
                        <img src={currentMoodEmoji} alt={currentMood} />
                        <p>Detected Mood : {currentMood}</p>
                    </> : <h3 style={{ marginTop: '20%' }}>{defaultCase}</h3>
                }
            </>
        );
    }
}



export default MoodDetectByEmoji;