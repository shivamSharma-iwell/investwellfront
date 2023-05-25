import React, { Fragment } from 'react'
import SearchField from './searchField.jsx'

export const FilterArea = (props) => {
  return (
    <Fragment>
      <SearchField
        label="Scheme A"
        setScheme={props.setSchemeA}
        scheme={props.schemeA}
        mutualFunds={props.mutualFunds}
        dropdown={props.dropdownA}
        setDropdown={props.setDropdownA}
        handleInputChange={props.handleInputChange}
      />
      <SearchField
        label="Scheme B"
        setScheme={props.setSchemeB}
        scheme={props.schemeB}
        mutualFunds={props.mutualFunds}
        dropdown={props.dropdownB}
        setDropdown={props.setDropdownB}
        handleInputChange={props.handleInputChange}
      />
      <button className='proceedButton' disabled={props.proceedDisable()} onClick={() => props.handleSubmit()} >Go</button>
    </Fragment>
  )
}
export default FilterArea
