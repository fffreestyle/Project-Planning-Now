import React from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { deleteProject } from '../../redux/store/projectScheduler/actions';
import { connect, ConnectedProps, useDispatch } from 'react-redux';

type PropsFromParent = {
    projectUUID: string
};
type Props = PropsFromParent
const DeleteProject = (props: Props) => {
    const dispatch = useDispatch();
    const onClickDelete = () => dispatch(deleteProject({ projectUUID }));
    const { projectUUID } = props;
    return (
        <a onClick={onClickDelete} className='text-xl'>
            <DeleteOutlined />
        </a>
    )
}

export default DeleteProject;
