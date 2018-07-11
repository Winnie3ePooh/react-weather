import React from 'react'
import styled from 'styled-components'

import WarningImg from 'assets/error.png'

export default function Warning () {
  return (
    <WarninWrapper>
      <WarningMsg>Something went wrong. Try again later.</WarningMsg>
      <ImgWrapper src={WarningImg} />
    </WarninWrapper>
  )
}

const WarninWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
`

const WarningMsg = styled.h2`
  text-align: center;
  `
const ImgWrapper = styled.img`
  width: 250px;
  height: auto;
`
