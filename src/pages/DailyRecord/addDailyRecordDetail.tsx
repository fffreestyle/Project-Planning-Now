import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import ModifyRecordDetailModal from './modifyRecordDetailModal';
import { useDispatch } from 'react-redux'
import { addRecordDetail as addDetail } from '../../redux/store/dailyRecord/actions'

type PropsFromParent = {
    recordUUID: string
};
type Props = PropsFromParent

const AddDailyRecordDetail = (props: Props) => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    const openModal = () => setVisible(true);

    return (
        <div className='flex'>
            <a className=' text-lg' onClick={openModal}><PlusOutlined /></a>
            <ModifyRecordDetailModal
                modalTitle='New Record'
                recordUUID={props.recordUUID}
                visible={visible}
                onOk={(values) => {
                    dispatch(addDetail(values));
                    setVisible(false);
                }}
                handleCancel={() => setVisible(false)} />
        </div>
    )
}

export default AddDailyRecordDetail;