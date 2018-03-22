import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, InputNumber, Input, Button, Row, Col } from 'antd';
const FormItem = Form.Item;

class StudentForm extends Component {
    state = {
        number: {
            value: 0,
        },
    };
    handleNumberChange = (value) => {
        this.setState({
            number: {
                ...this.validatePrimeNumber(value),
                value,
            },
        });
    }
    validatePrimeNumber = (number) =>{
        if (number > 0 && number < 13) {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
        return {
            validateStatus: 'error',
            errorMsg: 'The GPA should be between 0 and 12',
        };
    }
     hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    check = () => {
        const {form, gradeId} = this.props
        form.validateFields(
            (err) => {
                if (!err) {

                    const studentInfo = {
                        name: form.getFieldsValue().name,
                        gpa: form.getFieldsValue().gpa
                    };
                    console.log( studentInfo )
                    this.props.addStudent( gradeId, studentInfo )
                }
            },
        );
    }
    render() {
        const number = this.state.number;
        const tipsGPA = 'Input student GPA';
        const tipsName = 'Input student name';
        const errName = 'You should input student name';
        const { getFieldDecorator, getFieldsError, getFieldError } = this.props.form;
        return (
            <Form layout="inline" >
              <Row>
                  <Col span={12}>

                      <FormItem
                          help={getFieldError('name') || tipsName}
                      >
                          {getFieldDecorator('name', {
                              rules: [{ required: true, message: errName, tips:  tipsName}],
                          })(
                              <Input />
                          )}
                      </FormItem>
                  </Col>
                  <Col span={6}>
                      <FormItem style={{padding: '5px'}}
                          validateStatus={number.validateStatus}
                          help={number.errorMsg || tipsGPA}
                      >
                          {getFieldDecorator('gpa', {
                              rules: [{ required: true}],
                          })(
                              <InputNumber
                                  min={0}
                                  max={12}
                                  style={{minWidth: '150px'}}
                                  onChange={this.handleNumberChange}
                              />
                          )}

                      </FormItem>
                  </Col>
                  <Col span={6}>
                <FormItem style={{padding: '5px'}}>
                    <Button
                        type="primary"
                        onClick={this.check}
                        disabled={this.hasErrors(getFieldsError())}
                    >
                        Add
                    </Button>
                </FormItem >
                  </Col>
              </Row>
            </Form>

        );
    }
}

StudentForm.propTypes = {};
StudentForm.defaultProps = {};

const WrappedStudentForm = Form.create()(StudentForm);
export default WrappedStudentForm;
