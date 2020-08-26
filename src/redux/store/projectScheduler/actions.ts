import { createAction } from '@reduxjs/toolkit'
import { IProjectInfo, IDeleteIProjectInfo } from './types';

export const addProject = createAction<IProjectInfo>('ADD_PROJECT');
export const deleteProject = createAction<IDeleteIProjectInfo>('DELETE_PROJECT');
export const editProject = createAction<IProjectInfo>('EDIT_PROJECT'); 