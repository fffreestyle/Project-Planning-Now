import { createReducer } from "@reduxjs/toolkit";
import { IProjectInfo } from "./types";
import { v4 as uuidv4 } from "uuid";
import { addProject, editProject, deleteProject } from "./actions";
import { clone } from 'ramda';
const initialState: IProjectInfo[] = [];

export const projectSchedulerReducer = createReducer(initialState, builder =>
    builder
        .addCase(addProject, (state, action) => {
            const beAddedProject = clone(action.payload);
            beAddedProject.projectUUID = uuidv4();
            state.push(beAddedProject);
        })
        .addCase(editProject, (state, action) => {
            const beEditedProjectIndex = state.findIndex(x => x.projectUUID === action.payload.projectUUID);
            if (beEditedProjectIndex !== -1) {
                state.splice(beEditedProjectIndex, 1, action.payload);
            }
        })
        .addCase(deleteProject, (state, action) => {
            return state.filter(project => {
                return project.projectUUID !== action.payload.projectUUID
            });
        })
)