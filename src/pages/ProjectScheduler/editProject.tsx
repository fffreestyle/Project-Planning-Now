import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { editProject } from '../../redux/store/projectScheduler/actions';
import { IProjectInfo } from '../../redux/store/projectScheduler/types';
import ModifyProjectInfo from './modifyProjectInfo';
type Param = {
    projectUUID: string
}
const EditProject = () => {
    const { projectUUID } = useParams<Param>();
    console.log(projectUUID);
    const dispatch = useDispatch();
    const history = useHistory();
    const saveSetting = (setting: IProjectInfo) => {
        dispatch(editProject(setting));
        history.push('/ProjectScheduler')
    }
    const projectInfo = useSelector((state: RootState) => state.projectScheduler.find(x => x.projectUUID === projectUUID));
    console.log(projectInfo);
    return (
        <div className='flex container mx-auto'>
            <ModifyProjectInfo saveSetting={saveSetting} initialValues={projectInfo}></ModifyProjectInfo>
        </div>
    )
}

export default EditProject;