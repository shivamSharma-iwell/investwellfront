import React from "react";

const Taxes = (props) => {
    return (
        <table className="taxTable">
        <tbody className="highlight">
            {props.taxes && props.taxes.map((tax) => (
                <tr key={tax.taxID}>
                    <td>
                        {
                            props.currFocus==`${tax.taxID} taxName`?
                            <input className="inputBox highlight" name="taxName" 
                            onChange={(event) => props.modifyTaxes("changeTax", event, tax.taxID)}
                            value={tax.taxName} maxLength="40" onBlur={()=>props.handleInputBlur()} autoFocus/>:
                            <div onClick={()=>props.handleDivClick(`${tax.taxID} taxName`)}>{tax.taxName}</div>
                        }   
                    </td>
                    <td>
                        {
                            props.currFocus==`${tax.taxID} taxPercentage`?
                            <>
                            <input className="highlight taxPercentage" name="taxPercentage" 
                            onChange={(event) => props.modifyTaxes("changeTax", event, tax.taxID)} type="number"
                            value={tax.taxPercentage} onBlur={()=>props.handleInputBlur()} autoFocus/>
                            <span>%</span>
                            </>:
                            <>
                            <div className="alignCenter"  onClick={()=>props.handleDivClick(`${tax.taxID} taxPercentage`)}>{tax.taxPercentage} %</div>
                            </>
                        }
                    </td>
                    <td className="highlight alignRight" name="taxAmount">{
                        props.price.currencySymbol} {tax.taxAmount}
                        <button className="btn remove" onClick={(event) => props.modifyTaxes("deleteTax", event, tax.taxID)}>&#x2715;</button>
                    </td>      
                </tr>
            ))}
        </tbody>
        <tfoot className="taxesTotal highlight">
            <tr>
                <td colSpan="3">
                    <button className="btn addNewEntity" onClick={() => props.modifyTaxes("addTax")}>+ Add tax</button>
                </td>   
             </tr>
            <tr>
                <td className="alignLeft" colSpan="2">
                    {
                        props.currFocus=="totalWithTaxName"?
                        <input className="inputBox highlight" maxLength="40"
                        name="totalWithTaxName" value={props.data.totalWithTaxName} onChange={(event)=>props.handleChange(event)}
                        onBlur={()=>props.handleInputBlur()}/>:
                        <div onClick={()=>props.handleDivClick("totalWithTaxName")}>{props.data.totalWithTaxName}</div>
                    }
                    </td>
                <td className="alignRight"><b>{props.price.currencySymbol} {props.totalWithTax}</b></td>
            </tr>
        </tfoot>
    </table>
    )
}
export default Taxes;