import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {loadMyStudents} from '../AC'
import {Table, Button} from 'antd'
import StudentForm from "./StudentForm";

class StudentsList extends Component {

    handleDelete(e, studentId, gradeId, deleteStudent){
        console.log(e, studentId);
        deleteStudent(gradeId, studentId);
    }
    render() {
        const {gradeId, myStudents, addStudent, deleteStudent } = this.props;
        const columns = [
            { title: 'Name', width: 200, dataIndex: 'name', className: 'row200', key: `name${gradeId}` },
            { title: 'GPA', width: 100, dataIndex: 'gpa', className: 'row100',key: `gpa${gradeId}` },
            { title: ' ', width: 100, dataIndex: '', className: 'row100',key: `x${gradeId}`, render: (record) => <Button onClick={(e)=>{this.handleDelete(e, record.id, gradeId, deleteStudent)}}>Delete</Button> },
        ];
        return(
            <div>
                <Table
                    rowKey={'id'}
                    columns={columns}
                    dataSource={myStudents}
                    footer={() => <StudentForm gradeId = {gradeId} addStudent = {(gradeId, studentInfo) => addStudent(gradeId, studentInfo)}/>
                    }
                    scroll={{y: 500, x: 500}}
                    pagination={false}
                />
                <style>

                </style>
            </div>
        )
    }
}

StudentsList.propTypes = {};
StudentsList.defaultProps = {};

export default connect(null, {loadMyStudents})(StudentsList)
