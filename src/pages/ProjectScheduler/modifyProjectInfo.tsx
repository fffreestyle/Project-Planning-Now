import React from 'react'
import { Row, Col, Form, Input, DatePicker, Button } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { IProjectInfo } from '../../redux/store/projectScheduler/types';

const SubTask = ({ id }: { id: number }) => {
    const { RangePicker } = DatePicker;
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
                                >
                                    <Input placeholder="Subtask title" />
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
                                    <RangePicker picker='week' placeholder={["Task start week", "Task finish week"]} />
                                </Form.Item>
                                <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    style={{ margin: '0 8px' }}
                                    onClick={() => {
                                        remove(field.name);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )
            }}
        </Form.List>
    )
}
const Task = () => {
    const { RangePicker } = DatePicker;
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
                                        <RangePicker picker='week' placeholder={["Task start week", "Task finish week"]} />
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

const ModifyProjectInfo = ({ saveSetting, initialValues }: { saveSetting: (projectSetting: IProjectInfo) => void, initialValues?: IProjectInfo }) => {
    const { RangePicker } = DatePicker;
    const [form] = Form.useForm();
    console.log(initialValues);
    const init = initialValues ? {
        projectUUID: initialValues.projectUUID,
        projectName: initialValues.name,
        description: initialValues.description,
        totalDateRange: [initialValues.startDate, initialValues.closeDate],
        task: initialValues.task
    } : undefined;
    const saveProjectSettings = () => {
        form
            .validateFields()
            .then(values => {
                const setting: IProjectInfo = {
                    projectUUID: initialValues ? initialValues.projectUUID : null,
                    name: values.projectName,
                    description: values.description,
                    members: [],
                    startDate: values.totalDateRange[0],
                    closeDate: values.totalDateRange[1],
                    task: values.task?.map((x: any) => ({
                        title: x.title,
                        description: x.description,
                        members: [],
                        startDate: x.dateRange[0],
                        closeDate: x.dateRange[1],
                        subTask: x.subtask?.map((y: any) => ({
                            title: y.title,
                            members: [],
                            startDate: y.dateRange[0],
                            closeDate: y.dateRange[1],
                        }))
                    })),
                }
                saveSetting(setting);
            })
            .catch(reason => {
                console.log(reason);
            })
    }
    return (
        <div>
            <Form form={form}
                initialValues={init}>
                <Form.Item name='projectName' label='Project Name'
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Please input project name",
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item name='description' label='Description'>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name='member' label='Member'
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Please input member",
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item name='totalDateRange' label='Total Date Range'
                    rules={[
                        {
                            required: true,
                            message: "Please input project duration",
                        },
                    ]}>
                    <RangePicker picker='week' />
                </Form.Item>
                <Task></Task>
                <Button onClick={saveProjectSettings}>Save</Button>
            </Form>
        </div>
    )
}

export default ModifyProjectInfo;