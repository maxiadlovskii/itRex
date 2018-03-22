import React, {Component} from 'react';
import PropTypes from 'prop-types';
import StudentsList from "./StudentsList";
import {Input} from 'antd'
import GradeNameInput from './GradeNameInput'


class Grade extends Component {
    render() {
        const {myStudents, gradeId, gradeName, addStudent, deleteStudent, renameGrade} = this.props
        return (
            <div>
                <div className={'GradeNameInput'}>
                    <GradeNameInput
                        gradeId = {gradeId}
                        gradeName = {gradeName}
                        renameGrade = {(gradeId, newTitle) => renameGrade(gradeId, newTitle)}
                    />
                </div>
                <StudentsList
                    gradeId = {gradeId}
                    myStudents = {myStudents}
                    addStudent = {(gradeId,studentInfo) => addStudent(gradeId,studentInfo)}
                    deleteStudent = {(gradeId, studentId) => deleteStudent(gradeId, studentId)}

                />
            </div>
        );
    }
}

Grade.propTypes = {};
Grade.defaultProps = {};

export default Grade;
