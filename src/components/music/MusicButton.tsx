import { motion } from "framer-motion";

const MusicButton = ({ isPlaying, onhandlePrevious, onhandleNext, onTogglePlayPause }) => (
  <div className="flex justify-center items-center mb-1">
    <button className="size-4 mr-2 rotate-180" onClick={onhandlePrevious}>
      <img src="/img/componentImage/skip.png" alt="" />
    </button>
    <motion.button
      className="flex justify-center rotate-90 text-gray-600 md:text-2xl"
      onClick={onTogglePlayPause}
    >
      {isPlaying ? "〓" : "▲"}
    </motion.button>
    <button className="size-4 ml-2" onClick={onhandleNext}>
      <img src="/img/componentImage/skip.png" alt="" />
    </button>
  </div>
);

export default MusicButton;