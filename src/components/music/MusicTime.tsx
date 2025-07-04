import React from 'react'
import { motion, useAnimation } from "framer-motion"


const MusicTime = ({ onhandleChangeTimePosition, onduration, ontimePosition}) => {
    return (
    <motion.input
        className="
        w-48
        md:w-64
        lg:w-96
        appearance-none bg-transparent
        border-solid border-2 border-gray-300 rounded-full
        [&::-webkit-slider-runnable-track]:bg-gray-300
        [&::-webkit-slider-runnable-track]:rounded-full
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:h-2
        [&::-webkit-slider-thumb]:w-2
        [&::-webkit-slider-thumb]:bg-gray-100
        [&::-webkit-slider-thumb]:rounded-full
        "
        type="range"
        min={0}
        max={onduration}
        value={ontimePosition}
        whileTap={{ scale: 1.1 }}
        onInput={onhandleChangeTimePosition}>
    </motion.input>
    )
}

export default MusicTime