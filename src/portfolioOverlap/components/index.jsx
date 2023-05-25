import React, { useState, Fragment } from 'react'
import axios from 'axios'
import FilterArea from './filterArea.jsx'
import StocksTable from './stocksTable.jsx'
import PortfolioOverlap from './portfolioOverlap.jsx'
import '../media/css/loader.css';

export default function Index() {
  const [loading, setLoading] = useState(false)
  const [holdingsDetails, setHoldingsDetails] = useState()
  const [dropdownA, setDropdownA] = useState(true)
  const [dropdownB, setDropdownB] = useState(true)
  const [schemeA, setSchemeA] = useState({})
  const [schemeB, setSchemeB] = useState({})
  const [mutualFunds, setMutualFunds] = useState('')
  const [sortTable, setSortTable] = useState({ name: "", direction: true })
  const [debounce, setDebounce] = useState()

  const handleInputChange = (event, label) => {
    let debounceTimer = debounce
    clearTimeout(debounceTimer)
    const name = event.target.value
    debounceTimer = setTimeout(() => {
      axios
        .get(`http://localhost:3000/portfolioOverlap/getSchemes`, { params: { schemeName: name } })
        .then((res) => {
          if (res.data && res.data.status == 0) {
            setMutualFunds(res.data.result);
          } else {
            setMutualFunds();
          }
        })
    }, 600)
    setDebounce(debounceTimer)
    switch (label) {
      case "Scheme A":
        setSchemeA({ scheme: name, id: 0 })
        break
      case "Scheme B":
        setSchemeB({ scheme: name, id: 0 })
        break
    }
  }

  const handleSubmit = () => {
    setLoading(true);
    axios.get(`http://localhost:3000/portfolioOverlap/getPortfolioOverlap`, { params: { schid1: schemeA.id, schid2: schemeB.id } })
      .then(res => {
        if (res.data && res.data.status == 0) {
          setHoldingsDetails({ holding: res.data.result.holding, vennDiagram: res.data.result.vennDiagram, overlapValue: res.data.result.overlapValue, schemeAName: schemeA.scheme, schemeBName: schemeB.scheme })
          setLoading(false);
        }
      })
  }

  const proceedDisable = () => {
    if (schemeA.id > 0 && schemeB.id > 0)
      return false
    else
      return true
  }

  const sort = (holding) => {
    let obj = [...holdingsDetails.holding]
    holding == "A" && obj.sort((a, b) => (a.holdingsA > b.holdingsA) ? (sortTable.direction ? 1 : -1) : (sortTable.direction ? -1 : 1))
    holding == "B" && obj.sort((a, b) => (a.holdingsB > b.holdingsB) ? (sortTable.direction ? 1 : -1) : (sortTable.direction ? -1 : 1))
    holding == "asset" && obj.sort((a, b) => (Math.min(a.netAssetA, a.netAssetB) > Math.min(b.netAssetA, b.netAssetB)) ? (sortTable.direction ? 1 : -1) : (sortTable.direction ? -1 : 1))
    setHoldingsDetails({ holding: obj, vennDiagram: holdingsDetails.vennDiagram, overlapValue: holdingsDetails.overlapValue, schemeAName: schemeA.scheme, schemeBName: schemeB.scheme })
    setSortTable({ name: holding, direction: !(sortTable.direction) })
  }

  return (
    <Fragment>
      <title>Portfolio Overlap</title>
      <div className='outerContainer '>
        <h3 className='info'> Diversity the holding across different categories of fund investing in different asset classes after comparing the portfolio of various fund houses
          to avoid portfolio overlap</h3>
        <div className='filterArea'>
          <FilterArea
            handleSubmit={handleSubmit}
            mutualFunds={mutualFunds}
            setSchemeA={setSchemeA}
            schemeA={schemeA}
            setSchemeB={setSchemeB}
            schemeB={schemeB}
            proceedDisable={proceedDisable}
            dropdownA={dropdownA}
            setDropdownA={setDropdownA}
            dropdownB={dropdownB}
            setDropdownB={setDropdownB}
            handleInputChange={handleInputChange}
          />
        </div>
        {loading ? <div className='loader' /> : <>
          {holdingsDetails && <PortfolioOverlap holdingsDetails={holdingsDetails} />}   {holdingsDetails && <StocksTable holdingsDetails={holdingsDetails} sort={sort} sortTable={sortTable} />}
        </>}
      </div>
    </Fragment>
  )
}

