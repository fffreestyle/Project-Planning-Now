import React from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { deleteProject } from '../../redux/store/projectScheduler/actions';
import { connect, ConnectedProps } from 'react-redux';
const mapDispatch = {
    deleteProject
}
const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>
type PropsFromParent = {
    projectUUID: string
};
type Props = PropsFromRedux & PropsFromParent
const DeleteProject = (props: Props) => {
    const { projectUUID, deleteProject } = props;
    return (
        <a onClick={() => { deleteProject({ projectUUID }) }} className='text-xl'>
            <DeleteOutlined />
        </a>
    )
}

export default connector(DeleteProject);
