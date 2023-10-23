declare type AnyFunction = (...args: any[]) => any;
declare type AnyObject = { [Key in string]: any };

declare type Task = {
  text: string;
  colorLabels: Array<string>;
  dayId: string;
  id: number;
};

declare type TasksType = Array<Task>
declare type DaysWithTask = Array<{ id: string, tasks: TasksType }>