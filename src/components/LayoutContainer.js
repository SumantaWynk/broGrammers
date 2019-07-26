import React, { Component } from 'react';
import axios from 'axios';
import { PACKAGE_URL_ATV, PACKAGE_ID, MUSIC_PACKAGES } from '../AppConst';

class LayoutContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tvData: [],
            musicData: []
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
        const mood = currentMood.toUpperCase();
        axios.get(PACKAGE_URL_ATV[mood]).then((tvData) => {
            const { content } = tvData.data[PACKAGE_ID[mood]];
            this.setState({
                tvData: [...content]
            })
        });
        axios.get(MUSIC_PACKAGES[mood]).then((musicData) => {
            const { items } = musicData.data;
            this.setState({
                musicData: [...items]
            })
        })
    }
    redirectToAirtelXstream = (atvId) => {
        window.open(`https://staging.airtelxstream.in/movies/moviename/${atvId}`, "_blank");
    }

    redirectToWynkMusic = (musicId) => {
        window.open(`https://web-test.wynk.in/music/song/khadke-glassy/${musicId}`, "_blank");
    }

    render() {
        const { tvData, musicData } = this.state;
        let atvData;
        let wynkMusicData;
        if (tvData && tvData.length > 0) {
            atvData = tvData.map((data) => {
                return (
                    <div className="tile" key={data.id} onClick={() => this.redirectToAirtelXstream(data.id)}>
                        <div className="tile__media">
                            <img className="tile__img" src={data.images.LANDSCAPE_169 || data.images.PORTRAIT} alt="" />
                        </div>
                        <div className="tile__details">
                            <div className="tile__title">
                                {data.title}
                            </div>
                        </div>
                    </div>
                )
            })
        }
        if (musicData && musicData.length > 0) {
            wynkMusicData = musicData.map(data => {
                return (
                    <div className="tile" key={data.id} onClick={() => this.redirectToWynkMusic(data.id)}>
                        <div className="tile__media">
                            <img className="tile__img" src={data.largeImage} alt="" />
                        </div>
                        <div className="tile__details">
                            <div className="tile__title">
                                {data.title}
                            </div>
                        </div>
                    </div>
                )
            })
        }
        return (
            <>
                <div className="contain">
                    <div className="row">
                        <div className="row__inner">
                            {atvData}
                        </div>
                    </div>
                </div>
                <div className="contain">
                    <div className="row">
                        <div className="row__inner">
                            {wynkMusicData}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


export default LayoutContainer;