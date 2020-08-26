import React from 'react'
import { useParams } from 'react-router-dom';

const EditProject = () => {
    const { projectUUID } = useParams();
    console.log(projectUUID);
    return (
        <div></div>
    )
}

export default EditProject;