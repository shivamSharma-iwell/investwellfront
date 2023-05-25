import React, { useState } from "react"

const Dropdown = (props) => {
  const [currentMenu, setCurrentMenu] = useState()
  const [value, setValue] = useState('')

  function handleChangeSchemeOption(event) {
    const arr = []
    if (event.target.value == '' || props.selected && props.selected.length < 0) {
      setCurrentMenu(props.option)
    }
    else {
      for (let i = 0; i < props.option && props.option.length; i++) {
        if ((props.option[i].name.toLowerCase()).startsWith(event.target.value.toLowerCase())) {
          arr.push(props.option[i])
        }
      }
      setCurrentMenu(arr)
    }
  }

  return <>
    {props.isSearchable && <div className="dropdownContainer" onClick={() => { props.setShowMenu(props.label); setCurrentMenu(props.option); if(props.showMenu == '')props.setShowMenu()}} >
      <input type="text" className='searchInput' onChange={(event) => { handleChangeSchemeOption(event); setValue(event.target.value) }} placeholder="Search" value={value}></input>
      <div className="dropdownTool">
        <a href='#' className="close" onClick={() => { setValue('')}} />
      </div>
    </div>
    }
    {props.showMenu == props.label && (<div className="dropdownMenu">
      {currentMenu && currentMenu.map((id) => (
        <div onClick={(e) => { setValue(id.name);props.setSelected(id);props.setShowMenu('') }} key={id.value} className={`dropdownItem ${(!props.selected) ? false : props.selected.value === id.value && "selected"}`} >
          {id.name}
        </div>
      ))}
    </div>
    )}
  </>
}

export default Dropdown