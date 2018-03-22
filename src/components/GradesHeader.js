import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Rate} from 'antd'

class GradesHeader extends Component {
    getAvgRate = () => {
        const gpas = (this.props.students && this.props.students.length > 0) ? this.props.students.map(student=>student.gpa) : [0];
        console.log( gpas );
        let sum = gpas.reduce(function(sum, current) {
            return +sum + +current;
        }, 0);
        return ( Math.round((sum/gpas.length) * 100) / 100 )
    }
    render() {
        const rate = this.getAvgRate()
        return (
            <div className={'GradesHeader'}>
                <h1>{'School GPA calculator'}</h1>
                <span>{'Average GPA rate is '}</span><Rate disabled value={rate} count = {12}/><span style={{fontSize: '20px', color: 'red', fontWeight: 'bold'}}>{rate}</span>
                <div></div>
            </div>
        );
    }
}

GradesHeader.propTypes = {};
GradesHeader.defaultProps = {};

export default GradesHeader;
