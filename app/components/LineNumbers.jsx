import React from 'react';
import Proptypes from 'prop-types';

export class LineNumbers extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        let lineNumberList = Array.from(new Array(this.props.lineNumbers),(val,index)=>index+1).map(
            (lineNumber) => <div className="line-numbers">{lineNumber}</div>
        );
        
        return (
            <div>
            {lineNumberList}
            </div>
        );
    }
}

LineNumbers.Proptypes = {
    lineNumbers: Proptypes.number.isRequired
}