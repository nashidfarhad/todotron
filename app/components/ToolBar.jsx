// ToolBar Component class
import React from 'react';
import {ToolBarButton} from './icons/ToolBarButton';
import {openFile} from '../commonfunctions';
//import { Logo } from './icons/Logo';

const buttonList = ["file","folder","hard-drive","action-redo","action-undo",
                    "circle-check","arrow-circle-top","arrow-circle-bottom",
                    "trash"];

export class ToolBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(iconName){
        //alert(iconName + ' clicked');
        switch(iconName){
            case 'file':
                openFile();
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
