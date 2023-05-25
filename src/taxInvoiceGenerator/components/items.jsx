import React from "react";

const Items = (props) => {
    return (
    <table className="itemTable">
        <thead className="highlight">
            <tr>
                <th className="alignLeft">#</th>
                <th className="alignCenter">Description</th>
                <th className="alignCenter">Qty</th>
                <th className="alignCenter">

                   {
                    props.currFocus=="currencyName"?
                    <input
                        className="priceInput alignCenter inputBox"
                        type="text"
                        name="currencyName"
                        value={props.price.unitPriceName}
                        onChange={(event) => {props.handlePriceChange(event)}}
                        maxLength="25"
                        onBlur={()=>props.handleInputBlur()}
                        autoFocus
                    />:
                    <div onClick={()=>props.handleDivClick("currencyName")}>
                        {props.price.unitPriceName}</div>
                   }  
                </th>
                <th className="alignRight">Total</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {props.items && props.items.map((item, index) => (
                <tr key={item.itemID}>
                    <td className="alignLeft">{index + 1}</td>
                    <td>
                        {
                            props.currFocus==`${item.itemID} description`?
                            <input
                            className="inputBox alignCenter"
                            type="text"
                            name="description"
                            value={item.description}
                            onChange={(event) => {props.modifyItems("changeItem", event, item.itemID)}}
                            maxLength="80"
                            onBlur={()=>props.handleInputBlur()}
                            autoFocus/>:
                            <div className="alignCenter" onClick={()=>props.handleDivClick(`${item.itemID} description`)}>{item.description}</div>
                        }
                        
                    </td>
                    <td>
                        {
                            props.currFocus==`${item.itemID} quantity`?
                            <input
                            className="inputBox alignCenter"
                            type="number"
                            name="quantity"
                            value={item.quantity}
                            onChange={(event) => {props.modifyItems("changeItem", event, item.itemID)}}
                            min="0"
                            max="10"
                            onBlur={()=>props.handleInputBlur()}
                            autoFocus/>:
                            <div className="alignCenter" onClick={()=>props.handleDivClick(`${item.itemID} quantity`)}>{item.quantity}</div>
                        }

                    </td>
                    <td>
                        {
                            props.currFocus==`${item.itemID} unitPrice`?
                            <input
                            className="inputBox alignCenter"
                            type="number"
                            name="unitPrice"
                            value={item.unitPrice}
                            onChange={(event) => {props.modifyItems("changeItem", event, item.itemID)}}
                            min="0"
                            max="10"
                            onBlur={()=>props.handleInputBlur()}
                            autoFocus/>:
                            <div className="alignCenter" onClick={()=>props.handleDivClick(`${item.itemID} unitPrice`)}>{item.unitPrice}</div>
                        }   
                    </td>
                    <td className="alignRight lineTotal" type="number" name="lineTotal">
                        {props.price.currencySymbol} {item.lineTotal}  
                    </td>
                    <td className='alignRight'><button className="btn remove" onClick={(event) => props.modifyItems("deleteItem", event, item.itemID)}>&#x2715;</button></td>
                </tr>
            ))}
        </tbody>
        <tfoot className="itemsTotal highlight">
            <tr>
                <td colSpan="6">
                    <button className="btn addNewEntity" onClick={() => props.modifyItems("addItem")}>+ Add Item</button>
                </td>
            </tr>
        <tr>
            <td colSpan="4">
                {
                    props.currFocus=="subTotalName"?
                    <input className="inputBox highlight" name="subTotalName" 
                    value={props.data.subTotalName} onChange={(event)=>props.handleChange(event)} maxLength="25"
                    onBlur={()=>props.handleInputBlur()}/>:
                    <div onClick={()=>props.handleDivClick("subTotalName")}>{props.data.subTotalName}</div>
                }    
                </td>
            <td className="alignRight" colSpan="2"><b>{props.price.currencySymbol} {props.subTotal}</b></td>
        </tr>
        </tfoot>
    </table>
    )
}

export default Items;