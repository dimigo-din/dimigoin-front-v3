import css from '@emotion/css'
import React, { useEffect, useState } from 'react'
import DimiCard from './dimiru/DimiCard'

const MealList: React.FC = () => {
  return <DimiCard css={css`
    border-top: 5px solid #3c70e8;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    /* width: 100%; */
  `}>

  </DimiCard>
}

export default MealList