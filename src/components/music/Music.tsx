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
        coverUrl: "/img/audioImage/walkure.jpg",
        musicUrl: "/audio/FIRST_LOVE_SONG.mp3",
    },
    {
    id: 2,
    title: "mix2",
    artist: "artist2",
    coverUrl: "/img/audioImage/kiri.jpg",
    musicUrl: "/audio/Meteor_Light.mp3"     
    },
    {
    id: 2,
    title: "mix3",
    artist: "artist3",
    coverUrl: "/img/audioImage/misuzu.jpg",
    musicUrl: "/audio/Howling_over_the_World.mp3"     
    },
    {
    id: 2,
    title: "mix4",
    artist: "artist4",
    coverUrl: "/img/audioImage/kiri.jpg",
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
    <div className="flex justify-center text-center">
      <div className="bg-gray-100 rounded-2xl p-4">
        <div className="text-center">
          <img
          className="inline-block rounded-2xl"
          src={currentSong.coverUrl}
          alt="Cover"
          style={{ width: "200px", height: "200px" }}
          />
        </div>
        <div>
          <p className="font-bold text-gray-600">{currentSong.title}</p>
          <p className="text-gray-600">{currentSong.artist}</p>
        </div>
        <input
        className="
        w-48
        appearance-none bg-transparent
        border-solid border-2 border-gray-300 rounded-full
        [&::-webkit-slider-runnable-track]:bg-gray-300
        [&::-webkit-slider-runnable-track]:rounded-full
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:h-3
        [&::-webkit-slider-thumb]:w-3
        [&::-webkit-slider-thumb]:bg-gray-100
        [&::-webkit-slider-thumb]:rounded-full
        "
        type="range"
        min={0}
        max={duration}
        value={timePosition}
        onInput={handleChangeTimePosition}>
        </input>
        <div className="flex justify-center">
          <button onClick={handlePrevious}>
            <img className="size-4 rotate-180" src="/img/componentImage/skip.png" alt="" />
          </button>
          <motion.button 
          className="rotate-90 text-gray-600 ml-2 mr-2"
          onClick={togglePlayPause}
          whileTap="tap"
          whileHover="hover">
          {isPlaying ? "〓" : "▲"}
          </motion.button>
          <button onClick={handleNext}>
            <img className="size-4" src="/img/componentImage/skip.png" alt="" />
          </button>
        </div>
        <audio 
        ref={audioRef}
        src={currentSong.musicUrl}
        preload="metadata"
        onEnded={handleNext}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        />
        <div className="flex justify-center">
          <img src="/img/componentImage/vol_0.png" alt="" className="size-4 mr-1"/>
          <motion.input
          className="
          w-36
          border-solid border-2 border-gray-300 rounded-full
          appearance-none bg-transparent
          [&::-webkit-slider-runnable-track]:bg-gray-300
          [&::-webkit-slider-runnable-track]:rounded-full
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:h-3
          [&::-webkit-slider-thumb]:w-3
          [&::-webkit-slider-thumb]:bg-gray-100
          [&::-webkit-slider-thumb]:rounded-full
          "
          type="range"
          value={volume}
          max={100}
          min={0}
          defaultValue={50}
          step={1}
          onChange={(e) => handleVolumeChange([parseInt(e.target.value)])}
          whileTap="tap"
          whileHover="hover"
          ></motion.input>
          <img src="/img/componentImage/vol_100.png" alt="" className="size-4 ml-1"/>
        </div>
      </div>
      
      

    </div>
  );
}

export default Music