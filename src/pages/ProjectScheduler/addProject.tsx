import React from 'react'
import ModifyProjectInfo from './modifyProjectInfo'
import { useDispatch } from 'react-redux';
import { addProject } from '../../redux/store/projectScheduler/actions';
import { IProjectInfo } from '../../redux/store/projectScheduler/types';
import { useHistory } from 'react-router-dom';

const AddProject = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const saveSetting = (setting: IProjectInfo) => {
        dispatch(addProject(setting));
        history.push('/ProjectScheduler')
    }
    return (
        <div>
            <div className='flex container mx-auto'>
                <ModifyProjectInfo saveSetting={saveSetting}></ModifyProjectInfo>
            </div>
        </div>
    )
}

export default AddProject;