import React from 'react'
import FilterArea from './filterArea.jsx'
import MatrixArea from './matrixArea.jsx'

function RightMain(props) {
    return (
        <div className={props.showMatrix ? 'rightMainWithMatrix' : 'rightMain'}>
            <FilterArea {...props} />
            {props.showMatrix && props.navData ?
                <MatrixArea
                    schemeArr={props.schemeArr}
                    navData={props.navData}
                /> : ""
            }
        </div>
    )
}

export default RightMain