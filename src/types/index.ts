export type Task = {
  id: string
  title: string
  subtitle?: string
  notes?: string
  completed: boolean
  priority?: string
}

export enum Filter {
  ALL = 'all',
  COMPLETED = 'completed',
  NOT_COMPLETED = 'not_completed',
}

export enum Priority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}
