import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion"
import MusicVol from "./MusicVol";
import MusicButton from "./MusicButton";
import MusicButtom from "./MusicButtom";
import MusicTime from "./MusicTime";

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
        title: "7 Girls War",
        artist: "Wake Up, Girls!",
        coverUrl: "/img/audioImage/7 Girls War.jpg",
        musicUrl: "/audio/7 Girls War.mp3",
    },
    {
    id: 2,
    title: "Beyond the Bottom",
    artist: "Wake Up, Girls!",
    coverUrl: "/img/audioImage/Beyond the Bottom.jpg",
    musicUrl: "/audio/Beyond the Bottom.mp3"     
    },
    {
    id: 3,
    title: "Polaris",
    artist: "Wake Up, Girls!",
    coverUrl: "/img/audioImage/Polaris.jpg",
    musicUrl: "/audio/Polaris.mp3"     
    },
    {
    id: 4,
    title: "タチアガレ!",
    artist: "Wake Up, Girls!",
    coverUrl: "/img/audioImage/タチアガレ!.jpg",
    musicUrl: "/audio/タチアガレ!.mp3"     
    },
        {
    id: 4,
    title: "言の葉 青葉",
    artist: "Wake Up, Girls!",
    coverUrl: "/img/audioImage/言の葉 青葉.jpg",
    musicUrl: "/audio/言の葉 青葉.mp3"     
    },
        {
    id: 4,
    title: "少女交響曲",
    artist: "Wake Up, Girls!",
    coverUrl: "/img/audioImage/少女交響曲.jpg",
    musicUrl: "/audio/少女交響曲.mp3"     
    }
    ];

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

    const handleVolumeChange = (value: number) => {
    setVolume(value); // スライダーの値をvolume状態に反映
    if (audioRef.current) {
        audioRef.current.volume = value / 100;
    }
    };

    useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [audioRef, volume]);


    return (
    <div className="flex justify-center items-center text-center pt-40">
        <div className="bg-gray-200 rounded-2xl p-7 pb-10 md:p-10 lg:p-13">
        <div className="flex justify-center">
            <motion.img
            className="size-48 mb-1 opacity-80 rounded-2xl md:size-72 md:mb-3 lg:size-96"
            src={currentSong.coverUrl}
            alt="Cover"
            animate={{scale: isPlaying ? 1.1 : 1, opacity: isPlaying ? 1 : 0.8}}
            transition={{ duration: 0.4 }}
            />
        </div>
        <div className="pt-1">
            <div>
                <p className="font-bold text-gray-600">{currentSong.title}</p>
                <p className="text-gray-600">{currentSong.artist}</p>
            </div>
            <MusicTime
            onhandleChangeTimePosition = {handleChangeTimePosition}
            onduration = {duration}
            ontimePosition ={timePosition}
            />
            <div className="flex justify-center items-center mb-1">
                <MusicButton
                isPlaying={isPlaying}
                onhandlePrevious={handlePrevious}
                onhandleNext={handleNext}
                onTogglePlayPause={togglePlayPause}/>
            </div>
            <audio
            ref={audioRef}
            src={currentSong.musicUrl}
            preload="metadata"
            onEnded={handleNext}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            />
            <MusicButtom
            onvalue={volume}
            onhandleVolumeChange={handleVolumeChange}
            />
            </div>
        </div>
    </div>
    );
}

export default Music