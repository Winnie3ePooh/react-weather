import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

Title.propTypes = {
  title: PropTypes.string
}

export default function Title (props) {
  return (
    <TitleWrapper>
      <BigTitle>
        {props.title}
      </BigTitle>
    </TitleWrapper>
  )
}

const TitleWrapper = styled.div`
  text-align: center;
  margin: 50px 0;
`

const BigTitle = styled.div`
  font-size: 50px;
  font-family: 'Montserrat', sans-serif;
  color: #ffffff;
`
