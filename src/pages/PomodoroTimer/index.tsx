import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Row, Col, InputNumber } from 'antd';
import useTimer from '../../hooks/useTimer';
import { CaretRightFilled, SearchOutlined, UndoOutlined } from '@ant-design/icons';

enum Stage {
    init,
    workingTime,
    restingTime,
    wait
}

const PomodoroTimer = () => {
    const [form] = Form.useForm();
    const initialValues = {
        workingInterval: 0.1,
        restInterval: 0.1
    }
    const workflow = [Stage.init, Stage.workingTime, Stage.wait, Stage.restingTime];
    const [currentStage, setCurrentStage] = useState(0);
    const { time,
        startTimer,
        setTimer,
        pauseTimer,
        resetTimer, } = useTimer({ initialValue: initialValues.workingInterval * 60 * 1000 });
    const [secondHandAnimationState, setSecondHandAnimationState] = useState<any>({
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        transform: ''
    });
    const [totalSecond, setTotalSecond] = useState(0);
    const second = Math.floor(time / 1000);
    const nextStage = (currentStage: number) => {
        setCurrentStage(Math.floor((currentStage + 1) % workflow.length));
    }
    const showNotification = (currentStage: number) => {
        if (workflow[currentStage] === Stage.workingTime) {
            let n = new Notification('Resting Time! 請按開始休息按鈕');
            n.onshow = () => setTimeout(() => n.close(), 3000);
        }
        if (workflow[currentStage] === Stage.restingTime) {
            let n = new Notification('Working Time! 請按開始工作按鈕');
            n.onshow = () => setTimeout(() => n.close(), 3000);
        }
    }
    useEffect(() => {
        setSecondHandAnimationState((state: any) => ({
            ...state,
            transform: `rotateZ(${(360 / totalSecond) * (totalSecond - second)}deg)`
        }));
        if (second === 0) {
            showNotification(currentStage);
            nextStage(currentStage);
        }
    }, [second])
    const start = () => {
        form
            .validateFields()
            .then(fields => {
                if (workflow[currentStage] === Stage.init) {
                    setTimer(fields.workingInterval * 60 * 1000);
                    setTotalSecond(fields.workingInterval * 60);
                    startTimer();
                    nextStage(currentStage);
                }
                if (workflow[currentStage] === Stage.wait) {
                    setTimer(fields.restInterval * 60 * 1000);
                    setTotalSecond(fields.restInterval * 60);
                    startTimer();
                    nextStage(currentStage);
                }
            })
            .catch(reason => {
                console.log(reason);
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
                    start();
                });
            return;
        }
        start();
    }
    const onResetTimer = () => {
        form
            .validateFields()
            .then(fields => {
                setCurrentStage(0);
                setTimer(fields.workingInterval * 60 * 1000);
                setTotalSecond(fields.workingInterval * 60);
                setSecondHandAnimationState((state: any) => ({
                    ...state,
                    transform: 'rotateZ(360deg)'
                }));
                resetTimer();
            })
            .catch(reason => {
                console.log(reason);
            });
    }

    return (
        <div className='mx-auto container'>
            <div className='mx-auto'>
                <Form form={form} initialValues={initialValues}>
                    <Input.Group>
                        <Row gutter={[16, 16]}>
                            <Col offset={9}>
                                工作
                        </Col>
                            <Col>
                                <Form.Item noStyle name='workingInterval' rules={[{ required: true }]}>
                                    <Input type='number' />
                                </Form.Item>
                            </Col>
                            <Col>
                                分鐘
                        </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col offset={9}>
                                休息
                        </Col>
                            <Col>
                                <Form.Item noStyle name='restInterval' rules={[{ required: true }]}>
                                    <Input type='number' />
                                </Form.Item>
                            </Col>
                            <Col>
                                分鐘
                        </Col>
                        </Row>
                    </Input.Group>
                </Form>
                <Row gutter={[16, 16]}>
                    <Col offset={9}>
                        <Button icon={<CaretRightFilled />} onClick={onStartTimer} disabled={(workflow[currentStage] === Stage.workingTime || workflow[currentStage] === Stage.restingTime)}>
                            {(workflow[currentStage] === Stage.wait || workflow[currentStage] === Stage.workingTime ? '開始休息' : '開始工作')}
                        </Button>
                    </Col>
                    <Col>
                        <Button icon={<UndoOutlined />} onClick={onResetTimer}>Reset</Button>
                    </Col>
                </Row>
            </div>
            <article className="rounded-full border-black border-2 h-64 w-64 relative mx-auto clock">
                <div style={secondHandAnimationState}>
                    <div className="seconds"></div>
                </div>
            </article>
        </div >
    )
}

export default PomodoroTimer;