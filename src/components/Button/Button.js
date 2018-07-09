import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'

export default function Btn (props) {
  return (
    <ButtonWrapper>
      <Button type={props.type} variant='contained' color='primary'>
        find
      </Button>
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.div`
  margin-top: 20px;
`
