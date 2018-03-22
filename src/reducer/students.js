import {
    FAIL,
    SUCCESS,
    LOAD_MY_STUDENTS,
    START, DELETE_GRADE,
    ADD_STUDENT,
    DELETE_STUDENT
} from '../constants'
import {arrToMap} from "../helpers";
import {OrderedMap,  Record} from 'immutable'

const StudentsRecord = Record({
    id: '',
    name: '',
    gpa: ''

})
const ReducerState = Record({
    loading: false,
    loaded: false,
    entities: new OrderedMap({})
})

const defaultState = new ReducerState();
export default (studentsState = defaultState, action)=>{
    const {type, payload, response, randomId, error} = action
    switch (type){
        case LOAD_MY_STUDENTS + START:
            return studentsState
                .set('loading', true);
        case LOAD_MY_STUDENTS + FAIL:
            console.log(error)
            return studentsState
        case LOAD_MY_STUDENTS + SUCCESS:
            return studentsState
                .set( 'entities', arrToMap(response.records, StudentsRecord)  )
                .set('loading', false)
                .set('loaded', true)
        case DELETE_GRADE:
            return studentsState
                .updateIn(['entities'], (students)=>students.filter(student=>!payload.students.includes(student.id)))
        case ADD_STUDENT:
            return studentsState.setIn(['entities', randomId], new StudentsRecord({...payload.studentInfo, id: randomId}));
        case DELETE_STUDENT:
            return studentsState.deleteIn(['entities', payload.studentId]);
    }
    return studentsState
}