import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

export default function Loading () {
  return (
    <LoadingWrapper />
  )
}

function animationBuiler () {
  const rotation = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `
  return rotation
}

const LoadingWrapper = styled.div`
  display: inline-block;
  width: 64px;
  height: 64px;
  &:after {
    content: " ";
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: ${animationBuiler()} 1.2s linear infinite;
  }
`
