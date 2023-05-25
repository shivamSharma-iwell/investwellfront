import React from 'react'
import BottomTable from './bottomTable.jsx'
import CorrelationMatrix from './correlationMatrix.jsx'

function MatrixArea(props){
    return(
        <div className="matrixArea">
           {props.navData && <CorrelationMatrix 
            schemeArr={props.schemeArr}
            navData = {props.navData}
            />
           }
            <BottomTable/>
        </div>
    )
}

export default MatrixArea