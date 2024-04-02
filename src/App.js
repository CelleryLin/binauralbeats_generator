import React, { Component } from 'react';
import logo from './logo.jpeg';
import './App.css';
import Fqslider from './components/Fqslider';
import Volslider from './components/Volslider';
import TriggerBtn from './components/TriggerBtn';
import bbosc from './components/osc';
import MusicPlayer from './components/MusicPlayer';
import Bookmarks from './components/Bookmarks';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            freq_left: 440,
            freq_right: 440,
            volume: 50,
            bookmarkid: 0,
            bookmarks: []
        }
        this.osc_left = new bbosc('Left', 440, 50);
        this.osc_right = new bbosc('Right', 440, 50);
        this.handleState = this.handleState.bind(this);
        this.setVol = this.setVol.bind(this);
        this.set2def = this.set2def.bind(this);
        this.setFreq = this.setFreq.bind(this);
        this.add2bookmark = this.add2bookmark.bind(this);
    }

    handleState(event, newstate) {
        if (newstate !== null) {
            if (newstate === 'play') {
                this.osc_left.play();
                this.osc_right.play();
            }
            else if (newstate === 'stop') {
                this.osc_left.stop();
                this.osc_right.stop();
            }
        }
    }

    setFreq(ch) {
        return (newfreq) => {
            // console.log(ch, this.osc_left.oscillator.frequency.value, this.osc_right.oscillator.frequency.value)
            if (ch === 'Left') {
                this.setState({ freq_left: newfreq });
                this.osc_left.update_osc(newfreq, this.osc_left.gainNode.gain.value * 100);
            }
            else if (ch === 'Right') {
                this.setState({ freq_right: newfreq });
                this.osc_right.update_osc(newfreq, this.osc_right.gainNode.gain.value * 100);
            }
        }
    }

    setVol(newvol) {
        this.setState({ volume: newvol });
        this.osc_left.update_osc(this.osc_left.oscillator.frequency.value, newvol);
        this.osc_right.update_osc(this.osc_right.oscillator.frequency.value, newvol);
    }

    set2def() {
        console.log('set2def');
        this.osc_left.reset();
        this.osc_right.reset();
        this.setState({ freq_left: 440, freq_right: 440, volume: 50 });

    }

    add2bookmark() {
        let newbookmark = { id: this.state.bookmarkid,
                            freq_left: this.state.freq_left,
                            freq_right: this.state.freq_right,
                            volume: this.state.volume };

        new Promise((resolve, reject) => {
            this.setState({ bookmarkid: this.state.bookmarkid + 1 });
            resolve();
        }).then(() => {
            this.setState({ bookmarks: this.state.bookmarks.concat(newbookmark) });
        }).then(() => {
            console.log(this.state.bookmarks);
        }).then(() => {
            localStorage.setItem('bookmarks', JSON.stringify(this.state.bookmarks));
        });
    }

    loadBookmarks() {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        if (bookmarks && bookmarks.length > 0) {
            this.setState({ bookmarks: bookmarks });
            // find max id
            new Promise((resolve, reject) => {
                let ids = bookmarks.map((b) => b.id);
                resolve(ids);
            }).then((ids) => {
                console.log('ids', ids);
                this.setState({ bookmarkid: Math.max(...ids)+1 });
            });
        }
    }

    selBookmark = (id) => {
        console.log('selBookmark', id);
        let bookmark = this.state.bookmarks.find((b) => b.id === id);
        this.setState({ freq_left: bookmark.freq_left, freq_right: bookmark.freq_right, volume: bookmark.volume });
        this.osc_left.update_osc(bookmark.freq_left, bookmark.volume);
        this.osc_right.update_osc(bookmark.freq_right, bookmark.volume);
    }

    deleteBookmark = (id) => {
        let newbookmarks = this.state.bookmarks.filter((b) => b.id !== id);
        new Promise((resolve, reject) => {
            this.setState({ bookmarks: newbookmarks });
            resolve();
        }).then(() => {
            localStorage.setItem('bookmarks', JSON.stringify(newbookmarks));
        });
    }


    componentDidMount() {
        this.loadBookmarks();
        console.log('Bookmarks loaded.');
    }
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h1>KMUH Binauralbeats Experiments</h1>
                </div>
                <div className="App-body">
                    <div className="bb-container">
                        <h3>Binaural Beats Generator</h3>
                        <TriggerBtn handleState={this.handleState} set2def={this.set2def} add2bookmark={this.add2bookmark} />
                        <div style={{display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}
                        >
                            <div className='slider-container' id='slider-container'>
                                <Fqslider channel='Left' freq={this.state.freq_left} setFreq={this.setFreq('Left')} />
                                <Fqslider channel='Right' freq={this.state.freq_right} setFreq={this.setFreq('Right')} />
                                <Volslider channel='Volume' vol={this.state.volume} setVol={this.setVol} />
                            </div>
                            <div className='bookmark-container' id='bookmark-container'>
                                <Bookmarks bookmarks={this.state.bookmarks} handleSelect={this.selBookmark} handleDelete={this.deleteBookmark} />
                            </div>
                        </div>

                    </div>
                    <div className="mp-container">
                        <h3>Music Player</h3>
                        <MusicPlayer />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
