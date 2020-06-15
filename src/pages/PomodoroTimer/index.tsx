import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Row, Col } from 'antd';

const PomodoroTimer = () => {
    const [form] = Form.useForm();
    const initialValues = {
        workingInterval: 25,
        restInterval: 5
    }
    const [isActive, setIsActive] = useState(false);
    const [isWorkingTime, setIsWorkingTime] = useState(false);
    const [isRestTime, setIsRestTime] = useState(false);
    const [workingSeconds, setWorkingSeconds] = useState(0);
    const [restSeconds, setRestSeconds] = useState(0);
    const [workingInterval, setWorkingInterval] = useState(initialValues.workingInterval);
    const [restInterval, setRestInterval] = useState(initialValues.restInterval);
    useEffect(() => {
        let timer = window.setTimeout(() => {
            if (isActive && isWorkingTime) {
                if (workingSeconds > workingInterval * 60) {
                    new Notification('Resting Time!');
                    console.log('Time to rest');
                    setIsRestTime(true);
                    setIsWorkingTime(false);
                    setWorkingSeconds(0);
                    return;
                }
                setWorkingSeconds((seconds) => seconds + 1);
                console.log(workingSeconds)
            }
        }, 1000)
        return () => window.clearTimeout(timer);
    }, [isActive, isWorkingTime, workingSeconds])
    useEffect(() => {
        let timer = window.setTimeout(() => {
            if (isActive && isRestTime) {
                if (restSeconds > restInterval * 60) {
                    new Notification('Working Time!');
                    console.log('Time to work');
                    setIsRestTime(false);
                    setIsWorkingTime(true);
                    setRestSeconds(0);
                    return;
                }
                setRestSeconds((seconds) => seconds + 1);
                console.log(restSeconds)
            }
        }, 1000)
        return () => window.clearTimeout(timer);
    }, [isActive, isRestTime, restSeconds])
    const startTimer = ()=>{
        form
            .validateFields()
            .then(fields => {
                setWorkingInterval(fields.workingInterval);
                setRestInterval(fields.restInterval);
                setIsWorkingTime(true);
                setIsActive(true);
            });
    }
    const onStartTimer = () => {
        if (Notification && Notification.permission !== "granted") {
            Notification.requestPermission()
                .then((permission) => {
                    if (permission !== 'granted') {
                        alert('請同意網頁通知番茄鐘提醒');
                        return;
                    }
                    startTimer();
                });
                return;
        }
        startTimer();

    }
    const onStopTimer = () => {
        setIsWorkingTime(false);
        setIsRestTime(false);
        setIsActive(false);
        setWorkingSeconds(0);
        setRestSeconds(0);
    }
    return (
        <div>
            <Form form={form} initialValues={initialValues}>
                <Input.Group>
                    <Row>
                        每<Col>
                            <Form.Item noStyle name='workingInterval' rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                            分鐘提醒，並休息
                            <Col>
                            <Form.Item noStyle name='restInterval' rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                            分鐘
                    </Row>
                </Input.Group>
            </Form>
            <Button onClick={onStartTimer}>Start</Button><Button onClick={onStopTimer}>Stop</Button>
        </div >
    )
}

export default PomodoroTimer;