import { useState,useMemo } from 'react';

export default function FocusTracker() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState({ title: '', duration: '', category: '' });
    
    const handleAddTask = () => {
        if (!input.title || !input.duration || !input.category) return;
        setTasks(prev => [...prev, { ...input, duration: Number(input.duration) }]);
        setInput({ title: '', duration: '', category: '' });
    };
   const totalTime = useMemo(() =>{ return tasks.reduce((curr, task) =>{
                   return curr + task.duration
   },0)} , [tasks])
const focusScore=  useMemo(() => {
    const workingtime= tasks.reduce((curr,task)=>{
                      if (task.category!=="break") {
                        return curr + task.duration
                      }
                      else
                        {
                        return curr 
                      }
    },0)
    console.log(workingtime,totalTime)
   return workingtime ? ( workingtime/totalTime * 100).toFixed(2) : 0
}, [tasks])


    return (
        <div className="p-6 max-w-md mx-auto space-y-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg mt-30">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Focus Tracker</h2>

            {/* Input Form */}
            <div className="space-y-2">
                <input
                    type="text"
                    placeholder="Task name"
                    value={input.title}
                    onChange={e => setInput({ ...input, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
                />
                <input
                    type="number"
                    placeholder="Duration (min)"
                    value={input.duration}
                    onChange={e => setInput({ ...input, duration: Math.max(0, Number(e.target.value)) })}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
                />
                <select
                    value={input.category}
                    onChange={e => setInput({ ...input, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
                >
                    <option value="">Select category</option>
                    <option value="work">Work</option>
                    <option value="study">Study</option>
                    <option value="break">Break</option>
                </select>
                <button
                    onClick={handleAddTask}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Add Task
                </button>
            </div>

            {/* Task List or Empty State */}
            {tasks.length === 0 ? (
                <div className="text-gray-500 dark:text-gray-400 text-center pt-4">
                    No tasks yet. Start tracking your focus!
                </div>
            ) : (
                <div className="space-y-2">
                    {tasks.map((task, idx) => (
                        <div key={idx} className="flex justify-between items-center border-b pb-2">
                            <span className="font-medium text-gray-700 dark:text-gray-300">{task.title}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {task.duration} min • {task.category}
                            </span>
                        </div>
                    ))}
                </div>
            )}
            {/* Summary Section — You’ll handle this */}
            <div className="pt-4 border-t space-y-1 text-sm text-gray-600 dark:text-gray-400">
                {/* Total time, focus score, category breakdowns — all yours */}
                 <div>Total Time: <span className="font-semibold text-gray-800 dark:text-white">{totalTime} min</span></div>
                <div>focusScore: <span className="font-semibold text-gray-800 dark:text-white">{focusScore} %</span></div>
            </div>
        </div>
    );
}