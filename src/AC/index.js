import {
    LOAD_ALL_GRADES,
    LOAD_MY_STUDENTS,
    ADD_GRADE,
    DELETE_GRADE,
    ADD_STUDENT,
    DELETE_STUDENT,
    RENAME_GRADE
} from '../constants'

export function loadAllGrades() {
    return {
        type: LOAD_ALL_GRADES,
        callAPI: '/api/grades'
    }
}
export function loadMyStudents() {
    return {
        type: LOAD_MY_STUDENTS,
        callAPI: `/api/students`
    }
}
export function addGrade(){
    return {
        type: ADD_GRADE,
        generateId: true
    }
}
export function deleteGrade(gradeId, students){
    return {
        type: DELETE_GRADE,
        payload: {gradeId, students}
    }
}
export function addStudent(gradeId, studentInfo) {
    console.log(gradeId, studentInfo)
    return {
        type: ADD_STUDENT,
        payload: {gradeId, studentInfo},
        generateId: true
    }
}
export function deleteStudent(gradeId, studentId) {
    return {
        type: DELETE_STUDENT,
        payload: {gradeId, studentId}
    }

}
export function renameGrade(gradeId, newTitle) {
    return {
        type: RENAME_GRADE,
        payload: {gradeId, newTitle}
    }
}