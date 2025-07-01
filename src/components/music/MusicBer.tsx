import React from 'react'
import { motion, useAnimation } from "framer-motion"

type MusicBerProps = {
  value: number;
  max: number;
  min: number;
  defaultValue: number;
  step: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const MusicButton = ({
  value,
  max,
  min,
  defaultValue,
  step,
  onChange,
}: MusicBerProps) => {
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
        [&::-webkit-slider-thumb]:h-3
        [&::-webkit-slider-thumb]:w-3
        [&::-webkit-slider-thumb]:bg-gray-100
        [&::-webkit-slider-thumb]:rounded-full
        "
        type="range"
        value={value}
        max={max}
        min={min}
        defaultValue={defaultValue}
        step={step}
        onChange={onChange}
        />
        <img src="/img/componentImage/vol_100.png" alt="" className="size-4 ml-1"/>
    </motion.div>
    )   
}

export default MusicButton