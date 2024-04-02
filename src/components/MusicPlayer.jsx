import React, {useState} from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

export default function MusicPlayer() {
  const [audio, setAudio] = useState(null);
  const handleUpload = (e) => {
    let myfile = e.target.files[0];
    console.log(myfile);
    setAudio(URL.createObjectURL(myfile));

  };

  return (
    <div className='audio-player'>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <p>Now playing: &nbsp;</p>
        <input type='file' id='audiofile' name='audiofile' accept='audio/*' onChange={(e) => handleUpload(e)} />
      </div>
      
      <AudioPlayer
          src={audio}
          onPlay={e => console.log("onPlay")}
          // other props here
      />
    </div>
      
  )
}