// ToolBar Component class
import React from 'react';
import PropTypes from 'prop-types';
import {ToolBarButton} from './icons/ToolBarButton';
import {openFile} from '../commonfunctions';

const buttonList = ["file","folder","hard-drive","action-redo","action-undo",
                    "circle-check","arrow-circle-top","arrow-circle-bottom",
                    "trash"];

export class ToolBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(iconName){
        switch(iconName){
            case 'file':
                openFile();
            break;
            case 'hard-drive':
                this.props.saveFile();
            break;
            default:
                alert('Watch where you click');
        }
        
    }

    render() {
        return (
            <div className="toolbar">
                {buttonList.map((iconName, index) => 
                    <ToolBarButton key={index} iconName={iconName} onClick={this.handleClick}/>)}
            </div>
        );
    }
}

ToolBar.propTypes = {
    saveFile: PropTypes.func
}
