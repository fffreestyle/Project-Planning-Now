import React from 'react'
import { RootState } from '../../redux/store'
import { connect, ConnectedProps } from 'react-redux';
import { List } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useRouteMatch, Link } from 'react-router-dom';
import DeleteProject from './deleteProject';
const mapState = (state: RootState) => {
    return {
        projectList: state.projectScheduler
    }
}
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux
const ProjectList = (props: Props) => {
    const projectList = props.projectList;

    const { path, url } = useRouteMatch();
    return (
        <div className="container mx-auto">
            <List
                header={
                    <div className='flex'>
                        <div className='flex-shrink flex-grow'>Project List</div>
                        <div className='flex-grow-0 flex-shrink-0'>
                            <Link to={`${url}/add`} className='text-xl'><PlusOutlined /></Link>
                        </div>
                    </div>
                }
                bordered
                dataSource={projectList}
                renderItem={item => (
                    <List.Item actions={[
                        <InfoCircleOutlined />,
                        <Link className='text-xl' to={`${url}/edit/${item.projectUUID}`} key="list-loadmore-edit"><EditOutlined /></Link>,
                        <DeleteProject projectUUID={item.projectUUID === null ? '' : item.projectUUID}></DeleteProject>
                    ]}>
                        <List.Item.Meta
                            title={<div>{item.name}</div>}
                            description={item.name}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default connector(ProjectList);