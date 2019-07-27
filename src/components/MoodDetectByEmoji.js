import React, { Component } from 'react';
import { EMOJI, EMOJI_URL } from '../AppConst';

class MoodDetectByEmoji extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMoodEmoji: null,
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
                    })
                    break;
                case EMOJI.DISGUSTING:
                    this.setState({
                        currentMoodEmoji: EMOJI_URL.DISGUSTING,
                    })
                    break;
                case EMOJI.FEARFUL:
                    this.setState({
                        currentMoodEmoji: EMOJI_URL.FEARFUL,
                    })
                    break;
                case EMOJI.HAPPY:
                    this.setState({
                        currentMoodEmoji: EMOJI_URL.HAPPY,
                    })
                    break;
                case EMOJI.NEUTRAL:
                    this.setState({
                        currentMoodEmoji: EMOJI_URL.NEUTRAL,
                    })
                    break;
                case EMOJI.SAD:
                    this.setState({
                        currentMoodEmoji: EMOJI_URL.SAD,
                    })
                    break;
                case EMOJI.SURPRISED:
                    this.setState({
                        currentMoodEmoji: EMOJI_URL.SURPRISED,
                    })
                    return;
                case EMOJI.DEFAULT:
                    this.setState({
                        currentMoodEmoji: EMOJI_URL.NEUTRAL,
                    })
                    return;

                default:
                    return null;

            }
        }
    }
    render() {
        const { currentMoodEmoji } = this.state;
        const { currentMood } = this.props
        return (
            <img src={currentMoodEmoji} alt={currentMood} />
        );
    }
}



export default MoodDetectByEmoji;