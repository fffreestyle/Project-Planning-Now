import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Row, Col, InputNumber } from 'antd';
import useTimer from '../../hooks/useTimer';
//TODO 精度問題，如果中途按暫停之後目前的寫法會導致秒數還是會被多扣 1
const PomodoroTimer = () => {
    const [form] = Form.useForm();
    const initialValues = {
        workingInterval: 25,
        restInterval: 5
    }
    const { time, startTimer: testStart,
        setTimer,
        pauseTimer,
        resetTimer, } = useTimer({})
    const [isActive, setIsActive] = useState(false);
    const [isWorkingTime, setIsWorkingTime] = useState(false);
    const [isRestTime, setIsRestTime] = useState(false);
    const [workingSeconds, setWorkingSeconds] = useState(0);
    const [restSeconds, setRestSeconds] = useState(0);
    const [workingInterval, setWorkingInterval] = useState(initialValues.workingInterval);
    const [restInterval, setRestInterval] = useState(initialValues.restInterval);

    const second = Math.floor(time / 1000)
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
    const startTimer = () => {
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
    // console.log('time', time)
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
            <br />
            <br />
            <br />
            <h4>以下為 useTimer demo</h4>
            <div />
            <InputNumber onChange={(number) => typeof number === 'number' ? setTimer(number) : undefined}></InputNumber>
            <Button onClick={testStart}>開始</Button>
            <Button onClick={pauseTimer}>暫停</Button>
            <Button onClick={resetTimer}>重置</Button>
            <div>{second}</div>
        </div >
    )
}

export default PomodoroTimer;