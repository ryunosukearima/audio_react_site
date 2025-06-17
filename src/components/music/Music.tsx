import { useState, useRef } from "react";
import { motion } from "motion/react"
import MusicData from "./MusicData";

  type song = {
    id: number;
    title: string;
    artist: string;
    coverUrl: string;
    musicUrl: string;
    };

    const songs: song[] = [
    {
        id: 1,
        title: "mix1",
        artist: "artist1",
        coverUrl: "/img/walkure.jpg",
        musicUrl: "/audio/FIRST_LOVE_SONG.mp3",
    },
    {
    id: 2,
    title: "mix2",
    artist: "artist2",
    coverUrl: "/img/kiri.jpg",
    musicUrl: "/audio/Meteor_Light.mp3"     
    }
  ]

 const Music = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentSong = songs[currentSongIndex];
  const [duration, setDuration] = useState(0);
  const [timePosition, setTimePosition] = useState(0);
  const [volume, setVolume] = useState(50);


  const handlePrevious = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
    setIsPlaying(false);
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setTimePosition(audioRef.current.currentTime);
  };

  const handleEnded = () => {
    setTimePosition(0);
    setPlayState('stop');
  };

  const handleLoadedMetadata = () => {
    const duration = audioRef.current.duration;
    setDuration(duration);
  };

  const handleChangeTimePosition = (e) => {
    const position = parseInt(e.target.value);
    setTimePosition(position);
    audioRef.current.currentTime = position;
  };

const handleVolumeChange = (value: number[]) => {
  setVolume(value[0]); // スライダーの値をvolume状態に反映
  if (audioRef.current) {
    audioRef.current.volume = value[0] / 100;
  }
};

  return (
    <div className="text-center">
      <div>
        <img
          src={currentSong.coverUrl}
          alt="Cover"
          style={{ width: "300px", height: "300px" }}
        />
      </div>
      <input 
        type="range"
        min={0}
        max={duration}
        value={timePosition}
        onInput={handleChangeTimePosition}>
      </input>
      <div>
        <h2>{currentSong.title}</h2>
        <p>{currentSong.artist}</p>
      </div>
      <div>
        <button onClick={handlePrevious}>戻る</button>
        <motion.button onClick={togglePlayPause}
        whileTap="tap"
  whileHover="hover">
          {isPlaying ? "一時停止" : "再生"}
        </motion.button>
        <motion.button onClick={handleNext}>次へ</motion.button>
      </div>
      <audio ref={audioRef}
      src={currentSong.musicUrl}
      onEnded={handleNext}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      />
      <motion.input
      type="range"
      value={volume}
      max={100}
      min={0}
      defaultValue={50}
      step={1}
      onChange={(e) => handleVolumeChange([parseInt(e.target.value)])}
      />
      

    </div>
  );
}

export default Music