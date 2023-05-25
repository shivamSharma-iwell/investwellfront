import React from 'react'

export default function BottomTable(props){
    return(
        <div className='descriptionTableDiv'>
                <table className='descriptionTable'>
                    <tr>
                        <th>Cell Color</th>
                        <th>Description</th>
                        <th>Diversification Benefits</th>
                    </tr>
                    <tr className='lowerTableRow'>
                        <td className='colorGreen'>-1.00 to -0.40</td>
                        <td>Assest pair with negative correlation</td>
                        <td>Excellent Diversification</td>
                    </tr>
                    <tr className='lowerTableRow'>
                        <td className='colorSkyBlue' >-0.40 to 0.00</td>
                        <td>Assest pair with slight negative correlation</td>
                        <td>Good Diversification</td>
                    </tr>
                    <tr className='lowerTableRow'>
                        <td className='colorOrange'>0.00 to 0.60</td>
                        <td>Assest pair with mild positive correlation</td>
                        <td>Moderate Diversification</td>
                    </tr>
                    <tr className='lowerTableRow'>
                        <td className='colorRed'>0.60 to 1.00</td>
                        <td>Assest pair with strong positive correlation</td>
                        <td>Poor Diversification</td>
                    </tr>
                </table>
        </div>

    )
}