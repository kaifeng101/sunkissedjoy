import { ArrowForward, ArrowForwardIos } from '@mui/icons-material';
import React from 'react'

const StepItem = ({value,activeValue,title,handleClick})=>{
    let isActive = value === activeValue;
    return (
        <div onClick={handleClick?handleClick:()=>{}} className={`text-xl max-md:text-base max-sm:text-base max-xs:text-xs text-center cursor-pointer ${isActive?'font-[700]':'opacity-50 font-[500]'}`}>{title}</div>
    )
}

const Stepper = ({activeValue,stepOneClick,stepTwoClick,stepThreeClick}) => {
  return (
    <div className='my-6 max-sm:gap-2 w-full flex items-center justify-center gap-4'>
        <StepItem handleClick={stepOneClick} value={0} activeValue={activeValue} title='Select your favourite gift'/>
        <ArrowForwardIos sx={{opacity : '0.4'}}/>
        <StepItem handleClick={stepTwoClick} value={1} activeValue={activeValue} title="Let's Get Creative"/>
        <ArrowForwardIos sx={{opacity : '0.4'}}/>
        <StepItem handleClick={stepThreeClick} value={2} activeValue={activeValue} title='Sit back and relax!'/>
    </div>
  )
}

export default Stepper