import React from 'react'
import { motion, useAnimation } from "framer-motion"


const MusicButtom = ({ onvalue, onhandleVolumeChange}) => {
    return (
    <motion.div className="flex justify-center items-center mb-0 mt-0" whileTap={{ scale: 1.1 }}>
        <img src="/img/componentImage/vol_0.png" alt="" className="size-4 mr-1"/>
        <motion.input className="
        w-36 md:w-48 lg:w-48
        border-solid border-2 border-gray-300 rounded-full
        appearance-none bg-transparent
        [&::-webkit-slider-runnable-track]:bg-gray-300
        [&::-webkit-slider-runnable-track]:rounded-full
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:h-2
        [&::-webkit-slider-thumb]:w-2
        [&::-webkit-slider-thumb]:bg-gray-100
        [&::-webkit-slider-thumb]:rounded-full
        "
        type="range"
        max={100}
        min={0}
        step={1}
        value={onvalue}
        onChange={e => onhandleVolumeChange(Number(e.target.value))}
        />
        <img src="/img/componentImage/vol_100.png" alt="" className="size-4 ml-1"/>
    </motion.div>
    )
}

export default MusicButtom