import React from 'react';
import './tools.styles.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { BRIGHTNESS, CONTRAST, CROP, ROTATE, ADD_TAGS } from '../tool_names';


//custom components
import AddTagTool from './addTagTool/addTagTool.component';
import BrightnessTool from './brightnessTool/brightnessTool.component';
import ContrastTool from './contrastTool/contrastTool.component';
import CropTool from './cropTool/cropTool.component';
import RotateTool from './rotateTool/rotateTool.component';

//reusable components
import Icon from '../../../../../reusableComponent/icon/icon.component';

const Tools = ({ activeTool, setActiveTool, dispatch, effect }) => {
    console.log(effect);
    return (
        <div className="toolsContainer">
            {
                (() => {
                    switch (activeTool) {
                        case BRIGHTNESS:
                            return <BrightnessTool dispatch={dispatch} value={effect[BRIGHTNESS]} />;
                        case CONTRAST:
                            return <ContrastTool dispatch={dispatch} value={effect[CONTRAST]} />;
                        case CROP:
                            return <CropTool dispatch={dispatch} value={effect[CROP]} />;
                        case ROTATE:
                            return <RotateTool dispatch={dispatch} value={effect[ROTATE]} />;
                        case ADD_TAGS:
                            return <AddTagTool dispatch={dispatch} value={effect[ADD_TAGS]} />;
                        default:
                            return <BrightnessTool dispatch={dispatch} />;
                    }
                })()
            }
            <div className="exitTools">
                <Icon lightColor='rgba(255,255,255,.6)' darkColor='rgba(255,255,255,.8)' iconColor='white' size='23px' onClick={(e) => { setActiveTool(null) }}>
                    <AiOutlineClose title='exit' />
                </Icon>
            </div>
        </div>
    );
}

export default Tools;