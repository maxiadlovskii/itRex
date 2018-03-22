import { combineReducers } from 'redux'
import grades from './grades'
import students from './students'

export  default combineReducers({
    students,
    grades
})

