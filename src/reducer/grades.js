import {arrToMap} from '../helpers'
import {
    START,
    SUCCESS,
    FAIL,
    LOAD_ALL_GRADES,
    ADD_GRADE,
    DELETE_GRADE,
    ADD_STUDENT,
    DELETE_STUDENT,
    RENAME_GRADE
} from '../constants'
import {OrderedMap, Record} from 'immutable'

const GradesRecord = Record({
    title: 'new',
    id: undefined,
    students: []
})
const ReducerState = Record({
    loading: false,
    loaded: false,
    entities: new OrderedMap({})
})


const defaultState = new ReducerState();
export default (gradesState = defaultState, action)=>{
    const {type, payload, response, randomId, error} = action
    switch(type){
        case LOAD_ALL_GRADES + START:
        return gradesState
            .set('loading', true);
        case LOAD_ALL_GRADES + FAIL:
             console.log( error)
             return gradesState
        case LOAD_ALL_GRADES + SUCCESS:
            return gradesState
                .set( 'entities', arrToMap(response, GradesRecord),  )
                .set('loading', false)
                .set('loaded', true)
        case ADD_GRADE:
            return gradesState
                .setIn(['entities', randomId], new GradesRecord({id: randomId}))
        case DELETE_GRADE:
            return gradesState.deleteIn(['entities', payload.gradeId]);
        case ADD_STUDENT:
            return gradesState.updateIn(
                ['entities', payload.gradeId, 'students'],
                students => students.concat(randomId)
            )
        case DELETE_STUDENT:
            return gradesState
                .updateIn(['entities', payload.gradeId,'students'], (students)=>students.filter(student=>student.id != payload.studentId))
        case RENAME_GRADE:
            return gradesState
                .setIn(['entities', payload.gradeId, 'title'], payload.newTitle)
    }

    return gradesState
}