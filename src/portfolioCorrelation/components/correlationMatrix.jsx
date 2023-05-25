import React from 'react'

const correlationMatrix = (props) => {

    const labels = []
    // making array for labels
    props.schemeArr.map((object) => (labels.push(object.legend)))
    const xLabels = labels
    const yLabels = labels

    const data = new Array(yLabels.length)
        .fill()
        .map((_, yIndex) =>
            new Array(xLabels.length)
                .fill()
                .map((_, xIndex) => props.navData && props.navData[xIndex] && props.navData[yIndex] && props.navData[xIndex][yIndex])

        )

    return (
        <div className='correlationMatrix'>
            <div className='heatMap'>
                <table className='matrixTable'>
                    <thead className='xAxis'>
                        <tr className='xLabel'>
                            <td></td>
                            {xLabels.map((label) => (
                                <td key={label}>{label}</td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className='yLabel'>{yLabels[rowIndex]}</td>
                                {row.map((cell, colIndex) => (
                                    <td
                                        className='matrixCells'
                                        key={`${rowIndex}-${colIndex}`}
                                        style={{
                                            background:
                                                cell >= -1.0 && cell < -0.4
                                                    ? 'rgb(138, 236, 49)'
                                                    : cell >= -0.4 && cell < 0.0
                                                        ? 'rgb(135, 243, 193)'
                                                        : cell >= 0.0 && cell < 0.6
                                                            ? 'rgb(232, 119, 16)'
                                                            : cell >= 0.6 && cell < 1.0
                                                                ? 'rgb(228, 69, 11)'
                                                                : cell == 1.00 ? 'rgb(0, 0, 0)' : 'rgb(220,220,119)',
                                            color: cell >= -1.0 && cell<1.0? 'rgb(0,0,0)':'rgb(255,255,255)'
                                        }}
                                    >
                                        {cell && `${cell}`}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default correlationMatrix