import React, { useEffect, useState, useRef } from 'react'
import RightMain from './rightMain.jsx'
import { categoryOption, timePeriodOption } from '../constants/index.js'
import axios from 'axios'
import '../media/css/loader.css'

export default function Index() {

  const [schemeOption, setSchemeOption] = useState()
  const [category, setCategory] = useState(null)
  const [timePeriod, setTimePeriod] = useState(null)
  const [scheme, setScheme] = useState([])
  const [count, setCount] = useState(1)
  const [schemeArr, setSchemeArray] = useState([])
  const [showMatrix, setShowMatrix] = useState(false)
  const [navData, setNavData] = useState()
  const [showMenu, setShowMenu] = useState('')
  const [error, setError] = useState({})

  const clearData = (field, data) => {
    switch (field) {
      case 'clearOne':
        setCount(1)
        const index = schemeArr.findIndex((item) => item.schid === data.schid)
        schemeArr.splice(index, 1)
        for (let i = 0; i < schemeArr.length; i++) {
          schemeArr[i].legend = "SC" + (i + 1)
          setCount(count - 1)
          setShowMatrix(false)
        }
        break
      case 'clearAll':
        setCount(1)
        schemeArr.splice(0,)
        setShowMatrix(false)
        break
      default:
    }
  }
  const drillDownData = (obj) => {
    if (obj == '') {
      setError({'noScheme':'Please select scheme!'})
    }
    else if (schemeArr.some(obj => obj.schid == scheme.schid)) {
      setError({'schemeAlready':'Scheme already exist'})
      return
    }
    else {
      setError({})
      axios.get("http://localhost:3000/portfolioCorrelation/getLaunchDate", {
        params: {
          schid: obj.schid
        }
      })
        .then((response) => {
          if (response.data.status == -1) {
            const newObj = { ...obj, launchDate: '' }
            let updatedSchemeArray = Array.from(schemeArr)
            updatedSchemeArray.push(newObj)
            setSchemeArray(updatedSchemeArray)
          }
          else {
            if (response.data.result == "Scheme ID doesn't exist") {
              setError({'noSchemeId':'Invalid Scheme!'})
            }
            else {
              const newObj = { ...obj, launchDate: response.data && response.data.result, legend: `SC${count}` }
              let updatedSchemeArray = Array.from(schemeArr)
              updatedSchemeArray.push(newObj)
              setSchemeArray(updatedSchemeArray)
              setCount(count + 1)
              setShowMatrix(false)
            }
          }
        })
        .catch(error => {
          console.log("error", error)
        })
    }
  }
  const matrixData = () => {
    
    if (timePeriod == null || (timePeriod && timePeriod.value < 3)) {
      setError({'timePeriod':'Please select time period!'})
    }
    else if (schemeArr && schemeArr.length <= 1) {
      setError({'2Schemes':'Please select atleast two schemes'})
    }
    else if (schemeArr.length > 15) {
      setError({'15schemes':'Only 15 schemes can be selected!!'})
    }
    else{
    setError({})
    let data = []
    schemeArr.map((object) => (
      data.push(object.schid)
    ))
    axios.get("http://localhost:3000/portfolioCorrelation/getNavs", {
      params: {
        schid: { 'arr': data },
        timePeriod: timePeriod && timePeriod.value
      }
    })
      .then((response) => {
        if (response.data.status == -1) {
          setError(response.data.result)

        }
        else {
          setShowMatrix(true)
          let responseData = response.data.result
          setNavData(responseData)
        }
      })
      .catch(error => {
        console.log("error", error)
      })
    }
  }
  useEffect(() => {
    if (category != null) {
      axios.get("http://localhost:3000/portfolioCorrelation/getSchemes", {
        params: {
          category: category && category.value
        }
      })
        .then((response) => {
          response.data && response.data.status == 0 &&
            setSchemeOption(response.data.result)

        })
        .catch(error => {
          console.log("error", error)
        })
    }
  }, [category])

  return (
    <div className='mainBox'>
      <div className='navHeader'></div>
      <div className='logo'></div>
      <div className={showMatrix ? 'sideNavWithMatrix' : 'sideNav'}></div>
      <RightMain
        category={category}
        setSchemeOption={setSchemeOption}
        setCategory={setCategory}
        categoryOption={categoryOption}
        timePeriodOption={timePeriodOption}
        schemeOption={schemeOption}
        timePeriod={timePeriod}
        setTimePeriod={setTimePeriod}
        scheme={scheme}
        setScheme={setScheme}
        schemeArr={schemeArr}
        showMatrix={showMatrix}
        setShowMatrix={setShowMatrix}
        matrixData={matrixData}
        navData={navData}
        drillDownData={drillDownData}
        count={count}
        setCount={setCount}
        clearData={clearData}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        error={error}
      />
    </div>

  )
}
