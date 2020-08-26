import React from 'react'
import { Row, Col, Form, Input, DatePicker, Button } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { IProjectInfo } from '../../redux/store/projectScheduler/types';
const SubTask = ({ id }: { id: number }) => {
    return (
        <Form.List name={[id, 'subtask']}>
            {(fields, { add, remove }) => {
                return (
                    <div>
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => {
                                    add();
                                }}
                                style={{ width: '60%' }}
                            >
                                <PlusOutlined /> Add SubTask
                            </Button>
                        </Form.Item>
                        {fields.map((field, index) => (
                            <div key={field.key} className='flex'>
                                <Form.Item
                                    name={[field.name, 'title']}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input Subtask title",
                                        },
                                    ]}
                                    noStyle
                                >
                                    <Input placeholder="Subtask title" />
                                </Form.Item>
                            </div>
                        ))}
                    </div>
                )
            }}
        </Form.List>
    )
}
const Task = () => {
    return (
        <Form.List name="task">
            {(fields, { add, remove }) => {
                return (
                    <div>
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => {
                                    add();
                                }}
                                style={{ width: '60%' }}
                            >
                                <PlusOutlined /> Add Task
                            </Button>
                        </Form.Item>
                        {fields.map((field, index) => (
                            <div key={field.key}>
                                <div className='flex'>
                                    <Form.Item
                                        name={[field.name, 'title']}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please input task title",
                                            },
                                        ]}

                                    >
                                        <Input placeholder="Task title" />
                                    </Form.Item>
                                    <Form.Item
                                        name={[field.name, 'description']}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please input task description",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Task description" />
                                    </Form.Item>
                                    <Form.Item
                                        name={[field.name, 'member']}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please input task member",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Task member" />
                                    </Form.Item>
                                    <Form.Item
                                        name={[field.name, 'dateRange']}
                                    >
                                        {/* <RangePicker picker='week' placeholder={["Task start week", "Task finish week"]} /> */}
                                    </Form.Item>
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        style={{ margin: '0 8px' }}
                                        onClick={() => {
                                            remove(field.name);
                                        }}
                                    />
                                </div>
                                <SubTask id={field.name}></SubTask>
                            </div>
                        ))}
                    </div>
                );
            }}
        </Form.List>
    )
}

const ModifyProjectInfo = ({ saveSetting }: { saveSetting: (projectSetting: IProjectInfo) => void }) => {
    const { RangePicker } = DatePicker;
    const [form] = Form.useForm();
    const saveProjectSettings = () => {
        form
            .validateFields()
            .then(values => {                
                console.log(values);
            })
            .catch(reason => {
                console.log(reason);
            })
    }
    return (
        <div>
            <Form form={form}>
                <Form.Item name='projectName' label='Project Name'>
                    <Input />
                </Form.Item>
                <Form.Item name='description' label='Description'>
                    <Input />
                </Form.Item>
                <Form.Item name='member' label='Member'>
                    <Input />
                </Form.Item>
                <Form.Item name='totalDateRange' label='Total Date Range'>
                    <RangePicker picker='week' />
                </Form.Item>
                <Task></Task>
                <Button onClick={saveProjectSettings}>Save</Button>
            </Form>
        </div>
    )
}

export default ModifyProjectInfo;