import React, {Component} from 'react';
import PropTypes from 'prop-types';
import antd from 'antd'
import { Tabs, Button } from 'antd';
import Grade from "./Grade";
import StudentsList from "./StudentsList";
import {mapToArr} from "../helpers";
const TabPane = Tabs.TabPane;

class GradesTabs extends Component {
    constructor(props) {
        super(props);
    }

    onChange = (activeKey) => {
        this.setState({ activeKey });
    }
    onEdit = (targetKey, action) => {
        const {grades} = this.props
      //  this[action](targetKey);
        if(action === 'add'){
            this.props.addGrade()
        }   else if(action === 'remove'){

            const studentsToDell = grades.filter(grade=>grade.id == targetKey)[0].students;
            console.log( studentsToDell ) ;
            this.props.deleteGrade(targetKey, studentsToDell)
        };

    }
/*
    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
    }
    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        th
        */
    getMyStudents(arrIds, arrStudents){
        return (arrStudents || []).filter(st=>{
            return arrIds.find(function(id) {
                return id === st.id
            })
        })
    }
    render() {
        const {grades, students, addStudent, deleteStudent, renameGrade} = this.props
        return (
            <div>
                <Tabs
                    onChange={this.onChange}
                    type="editable-card"
                    onEdit={this.onEdit}
                >
                    {grades.map(pane =>
                        <TabPane tab={pane.title} key={pane.id}>
                        <Grade
                            gradeName={pane.title}
                            gradeId={pane.id}
                            myStudents = {this.getMyStudents(pane.students, students)}
                            addStudent = {(gradeId,studentInfo) => addStudent(gradeId, studentInfo)}
                            deleteStudent = {(gradeId, studentId) => deleteStudent(gradeId, studentId)}
                            renameGrade = {(gradeId, newTitle) => renameGrade(gradeId, newTitle)}
                        />
                    </TabPane>)}
                </Tabs>
            </div>
        );
    }
}

export default GradesTabs;
