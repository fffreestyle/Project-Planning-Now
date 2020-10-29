import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Row, Col, InputNumber } from 'antd';
import useTimer from '../../hooks/useTimer';
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

    const second = Math.floor(time / 1000);
    const nextStage = (currentStage: number, workflow: Stage[]) => {
        setCurrentStage(Math.floor((currentStage + 1) % workflow.length));
    }

    useEffect(() => {
        const showNotification = (currentStage: number, workflow: Stage[]) => {
            if (workflow[currentStage] === Stage.workingTime) {
                let n = new Notification('Resting Time! 請按開始休息按鈕');
                n.onshow = () => setTimeout(() => n.close(), 3000);

            }
            if (workflow[currentStage] === Stage.restingTime) {
                let n = new Notification('Working Time! 請按開始工作按鈕');
                n.onshow = () => setTimeout(() => n.close(), 3000);
            }
        }
        if (second === 0) {
            showNotification(currentStage, workflow);
            nextStage(currentStage, workflow);
        }
    }, [second])
    const start = () => {
        form
            .validateFields()
            .then(fields => {
                if (workflow[currentStage] === Stage.init) {
                    setTimer(fields.workingInterval * 60);
                    startTimer();
                    nextStage(currentStage, workflow);
                }
                if (workflow[currentStage] === Stage.wait) {
                    setTimer(fields.restInterval * 60);
                    startTimer();
                    nextStage(currentStage, workflow);
                }
            })
            .catch(reason => {
                console.log(reason);
            });;
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
                setTimer(fields.workingInterval * 60);
                resetTimer();

            })
            .catch(reason => {
                console.log(reason);
            });
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
            <Button onClick={onStartTimer} disabled={(workflow[currentStage] === Stage.workingTime || workflow[currentStage] === Stage.restingTime)}>
                {(workflow[currentStage] === Stage.wait || workflow[currentStage] === Stage.workingTime ? '開始休息' : '開始工作')}
            </Button>
            <Button onClick={onResetTimer}>Reset</Button>
            {second}
        </div >
    )
}

export default PomodoroTimer;