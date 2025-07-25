import { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';
import moment from 'moment';
import { doc } from 'firebase/firestore';

export const useTasks = selectedProject => {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);
    
    useEffect(() => {
        let unsubscribe = firebase.firestore().collection('tasks')
            .where('userId', '==', 'kjs1');

            // Gets the tasks from the selected project depending on each condition
            unsubscribe = selectedProject && !collatedTasksExist(selectedProject) ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
            : selectedProject === 'TODAY'
            ? (unsubscribe = unsubscribe.where('date', '==', moment().format('MM/DD/YYYY')))
            : selectedProject === 'INBOX' || selectedProject === 0
            ? (unsubscribe = unsubscribe.where('date', '==', ''))
            : unsubscribe;

            unsubscribe = unsubscribe.onSnapshot(snapshot => {
                const newTasks = snapshot.docs.map(task => ({
                    id: task.id,
                    ...task.data(),
                }));

                setTasks(
                    selectedProject === 'NEXT_7'
                    ? newTasks.filter(task => moment(task.date, 'MM/DD/YYYY').diff(moment(), 'days') <= 7 && task.archived !== true)
                    : newTasks.filter(task => task.archived !== true)
                );

                setArchivedTasks(newTasks.filter(task => task.archived !== false));
            });

            return () => unsubscribe();
    }, [selectedProject]);

    return { tasks, archivedTasks };
};

export const useProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        firebase.firestore().collection('projects').where('userId', '==', 'kjs1')
        .orderBy('projectId')
        .get()
        .then(snapshot => {
            const allProjects = snapshot.docs.map(project => ({
                ...project.data(),
                docId: project.id,
            }));

            // Checks if the projects are already in the state, if not, sets the projects in the state
            // This prevents the infinite loop of useEffect
            if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
                setProjects(allProjects);
            }
        });
    }, [projects]);

    return { projects, setProjects };
};
