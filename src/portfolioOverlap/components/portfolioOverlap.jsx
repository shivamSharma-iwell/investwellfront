import React from 'react'
import GraphArea from './graphArea.jsx'
import DonutChart from './donutChart.jsx'
import UpperLogo from '../media/images/commonStock.png'
import LowerLogo from '../media/images/unCommonStock.png'

export const PortfolioOverlap = (props) => {
  const values = props.holdingsDetails.overlapValue && props.holdingsDetails.overlapValue
  const array = [{ outerDiv: 'rightContainerB', imageDiv: 'commonStockDiv', image: UpperLogo, imageClass: 'commonStockIcon', spanAClass: 'commonStock', spanAValue: values.commonHoldings && values.commonHoldings, textAValue: '#common stocks' },
  { outerDiv: 'rightContainerC', imageDiv: 'unCommonStockDiv', image: LowerLogo, imageClass: 'unCommonStockIcon', spanAClass: 'unCommonStockA', spanAValue: values.unCommonHoldingsInA && values.unCommonHoldingsInA, textAValue: '#uncommon stocks in A', spanBClass: 'totalStockA', spanBValue: values.totalHoldingsInA && values.totalHoldingsInA, textBValue: '#total stocks in A' },
  { outerDiv: 'rightContainerD', imageDiv: 'unCommonStockDiv', image: LowerLogo, imageClass: 'unCommonStockIcon', spanAClass: 'unCommonStockB', spanAValue: values.unCommonHoldingsInB && values.unCommonHoldingsInB, textAValue: '#uncommon stocks in B', spanBClass: 'totalStockB', spanBValue: values.totalHoldingsInB && values.totalHoldingsInB, textBValue: '#total stocks in B' }]
  return (
    <div className='portfolioOverlap'>
      <GraphArea values={props.holdingsDetails.vennDiagram}/>
      <div className='rightDiv'>
        <div className='rightContainerA'><DonutChart values={props.holdingsDetails.overlapValue.overlapPercentage} /></div>
        {array.map((item) => (
          <div className={item.outerDiv}>
            <div className={item.imageDiv}><img src={item.image} alt='Logo' className={item.imageClass} ></img></div>
            <span className={item.spanAClass}>{item.spanAValue}<br />
              <div className='text'>{item.textAValue}</div>
            </span>
            {item.spanBClass && <span className={item.spanBClass}>{item.spanBValue}<br />
              <div className='text'>{item.textBValue}</div>
            </span>}
          </div>
        ))}
      </div>
    </div>
  )
}
export default PortfolioOverlap