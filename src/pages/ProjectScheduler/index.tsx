import React from 'react'
import ModifyProjectInfo from './modifyProjectInfo';
import Calendar from './calendar';
import ProjectList from './projectList';


const ProjectScheduler = () => {

    return (
        <div className='flex'>
            {/* <ModifyProjectInfo saveSetting={(projectInfo) => { }}></ModifyProjectInfo> */}
            <ProjectList></ProjectList>
        </div>
    )
}

export default ProjectScheduler;