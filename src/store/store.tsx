/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext, useState, createContext } from 'react'
import { v4 } from 'uuid'

import useLocalStorage from '../hooks/useLocalStorage'

import { Task, Priority } from '../types'

const { HIGH, MEDIUM, LOW } = Priority

const emptyTask: Task = {
  id: '',
  title: '',
  completed: false,
}

export type TaskContext = {
  tasks: Task[]
  currentTask: Task
  addTask: (newTask: Task) => void
  editTask: (currentTask: Task) => void
  selectTask: (id?: string) => void
  removeTask: (id: string) => void
  toggleTask: (id: string) => void
}

const Context = createContext<TaskContext>(
  // Default context
  {
    tasks: [],
    currentTask: emptyTask,
    addTask: () => {},
    editTask: () => {},
    selectTask: () => {},
    removeTask: () => {},
    toggleTask: () => {},
  },
)

const Provider = (props: { children: any }) => {
  const [currentTask, setCurrentTask] = useState<any>()
  // children are all the child components in this component
  // eslint-disable-next-line react/prop-types
  const { children } = props
  const [tasks, setTasks] = useLocalStorage('tasks', [
    {
      id: v4(),
      title: 'feed the dog',
      subtext: 'sub feed',
      notes: 'dog stuff to be dealt with',
      completed: false,
      priority: HIGH,
    },
    {
      id: v4(),
      title: 'go shopping',
      subtext: 'shopping stuff',
      notes: 'stuff about shopping is difficult',
      completed: false,
      priority: MEDIUM,
    },
    {
      id: v4(),
      title: 'read the book',
      subtext: 'library ',
      notes: 'stuff about books is difficult',
      completed: true,
      priority: LOW,
    },
  ])

  const selectTask = (id?: string) => {
    const currentTask = tasks.find((task: Task) => task.id === id)
    if (id) {
      setCurrentTask(currentTask)
    } else {
      setCurrentTask('')
    }
  }

  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask])
  }

  const editTask = (newTask: Task) => {
    const newTasks = tasks.map((task: Task) => {
      if (task.id === newTask.id) {
        return newTask
      }
      return task
    })
    setTasks(newTasks)
  }

  const removeTask = (id: string) => {
    const newTasks = tasks.filter((task: Task) => task.id !== id)
    setTasks(newTasks)
    setCurrentTask('')
  }

  const toggleTask = (id: string) => {
    const foundTask = tasks.find((task: Task) => task.id === id)
    if (foundTask) {
      foundTask.completed = !foundTask.completed
    }

    const newTasks = tasks.map((task: Task) => {
      if (task.id === id) {
        return foundTask
      }
      return task
    })
    setTasks(newTasks)
  }

  return (
    <Context.Provider
      value={{
        tasks,
        currentTask,
        addTask,
        editTask,
        selectTask,
        removeTask,
        toggleTask,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useTasks = () => useContext(Context)

export const withProvider = (Component: any) => {
  // eslint-disable-next-line react/display-name
  return (props: JSX.IntrinsicAttributes) => {
    return (
      <Provider>
        <Component {...props} />
      </Provider>
    )
  }
}
