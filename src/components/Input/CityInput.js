import React from 'react'
import styled from 'styled-components'
import VirtualizedSelect from 'react-virtualized-select'
import Button from '@material-ui/core/Button'

import 'react-select/dist/react-select.css'
import 'react-virtualized-select/styles.css'

const StyledVirtualizedSelect = styled(VirtualizedSelect)`
  && {
    width: 100%;
    margin-bottom: 20px;
  }
`

class CityInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedCity: null,
      options: [],
      buttonCheck: false
    }
    this.getCitiesSuggestion = this.getCitiesSuggestion.bind(this)
    this.onSelectChange = this.onSelectChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onSelectChange (input) {
    this.setState({
      selectedCity: input,
      buttonCheck: true
    })
  }

  handleSubmit (input) {
    this.props.getWeather()
  }

  getCitiesSuggestion (formValue) {
    if (!formValue) {
      return Promise.resolve({ options: [] })
    }
    let regExp = new RegExp(formValue, 'gi')
    let foundedMatches = this.props.citiesList.filter(el => {
      return regExp.test(el.name)
    })
    this.setState({
      options: foundedMatches
    })
    return Promise.resolve({ options: foundedMatches })
  }

  // nodemon app.js --exec babel-node
  render () {
    return (
      <FormWrapper>
        <StyledVirtualizedSelect
          async
          value={this.state.selectedCity}
          backspaceRemoves
          labelKey='name'
          loadOptions={this.getCitiesSuggestion}
          minimumInput={1}
          onChange={this.onSelectChange}
          valueKey='id'
          onBlurResetsInput={false}
        />
        {this.state.buttonCheck && (
          <Button onClick={this.handleSubmit} type='submit' variant='contained' color='primary' size='medium'>
            find
          </Button>
        )}
      </FormWrapper>
    )
  }
}

export default CityInput

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`
