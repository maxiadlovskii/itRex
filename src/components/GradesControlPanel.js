import React, {Component} from 'react';
import {loadAllGrades, loadMyStudents, addGrade, deleteGrade, addStudent, deleteStudent, renameGrade} from '../AC'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import GradesTabs from "./GradesTabs";
import GradesHeader from "./GradesHeader";
import {mapToArr} from "../helpers";
import Loader from "./Loader";

class GradesControlPanel extends Component {
    componentDidMount() {
        this.props.loadAllGrades();
        this.props.loadMyStudents();
    }

    render() {
        const {loadingGrades, loadingStudents, grades, students, addGrade, deleteGrade, addStudent, deleteStudent, renameGrade} = this.props;

        if (loadingGrades && loadingStudents ) return <Loader/>
        return (
            <div>
                <GradesHeader  students = {mapToArr(students)}/>
                <GradesTabs
                    grades = {mapToArr(grades)}
                    students = {mapToArr(students)}
                    addGrade = {() => addGrade() }
                    deleteGrade = {(gradeId, students) => deleteGrade(gradeId, students) }
                    addStudent = {(gradeId, studentInfo) => addStudent(gradeId, studentInfo) }
                    deleteStudent = {(gradeId, studentId) => deleteStudent(gradeId, studentId)}
                    renameGrade = {(gradeId, newTitle) => renameGrade(gradeId, newTitle)}
            />
            </div>
        );
    }
}

GradesTabs.propTypes = {};
GradesTabs.defaultProps = {};

export  default connect((state)=>{
    return {
        grades: state.grades.entities,
        students: state.students.entities,

        loadingGrades: state.grades.loading,
        loadedGrades: state.grades.loaded,

        loadingStudents: state.students.loading,
        loadedStudents: state.students.loaded
    }
}, {loadAllGrades, loadMyStudents, addGrade, deleteGrade, addStudent, deleteStudent, renameGrade})( GradesControlPanel )
