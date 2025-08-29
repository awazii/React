import { useMemo, useState ,useContext} from 'react';
const tasks = [
  { id: 1, title: 'Design UI', status: 'completed' },
  { id: 2, title: 'Fix sidebar bug', status: 'pending' },
  { id: 3, title: 'Refactor theme logic', status: 'completed' },
];
export default function TaskList() {
  const [filter, setFilter] = useState('all');
  const filteredTasks = useMemo(() => {
    console.log('Filtering tasks...');
    return filter === 'all'
      ? tasks
      : tasks.filter(task => task.status === filter);
  }, [filter]);

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-2">
        {['all', 'completed', 'pending'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 rounded ${
              filter === status ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>
      <ul className="space-y-2">
        {filteredTasks.map(task => (
          <li key={task.id} className="border p-2 rounded">
            {task.title} — <span className="italic">{task.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}