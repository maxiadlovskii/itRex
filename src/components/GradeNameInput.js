import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, InputNumber, Input, Button, Row, Col } from 'antd';
const FormItem = Form.Item;

class GradeNameInput extends Component {
    state={
        changed: false
    }
    check = () => {
        const {form, gradeId, renameGrade} = this.props
        form.validateFields(
            (err) => {
                if (!err) {
                    const {gradeName} = form.getFieldsValue()
                    renameGrade(gradeId, gradeName);
                    this.setState({changed: false})
                }
            },
        );
    };
    handleChange = () => {
        this.setState({changed: true})
    }
    handleOnBlur = () =>{
        if(this.state.changed ){this.check()}
    };
    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    render() {
        const errName = 'You should input Grade name';
        const {gradeName, gradeId} = this.props
        const { getFieldDecorator, getFieldsError, getFieldError} = this.props.form;
        return (
            <Form layout="inline" >
                        <Row>
                        <FormItem>
                            {getFieldDecorator('gradeName', {
                                initialValue: gradeName,
                                rules: [{ required: true, message: errName}],
                            })(
                                <Input
                                    style = {{width: '300px'}}
                                    addonBefore={'Grade title'}
                                    onChange={this.handleChange}
                                    onBlur={this.handleOnBlur}
                                />
                            )}
                        </FormItem>

                        <FormItem>
                            <Button
                                type="primary"
                                onClick={this.check}
                                disabled={this.hasErrors(getFieldsError())}
                            >
                                Rename
                            </Button>
                        </FormItem >
                        </Row>

            </Form>

        );
    }
}
const WrappedGradeNameInput = Form.create()(GradeNameInput);
export default WrappedGradeNameInput;
