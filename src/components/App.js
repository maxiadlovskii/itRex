import React, {Component} from 'react'
import GradesControlPanel from './GradesControlPanel'
import 'antd/dist/antd.css'
import '../css/style.css'

class App extends  Component{
    static propTypes = {
    };
    render(){
        return(
            <div>
                <GradesControlPanel />
            </div>
        )
    }
}

export  default App