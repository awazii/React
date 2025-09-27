import React,{useReducer} from 'react'
const Quiz = () => {
  const questions = [
    { id: 1, text: "React is a ___?", options: ["Library", "Language"], correct: "Library" },
    { id: 2, text: "Hook for state?", options: ["useReducer", "useEffect"], correct: "useReducer" },
    { id: 3, text: "JSX stands for?", options: ["Java Syntax Extension", "JavaScript XML"], correct: "JavaScript XML" },
  ];

  const initialState = {
    index: 0,
    score: 0,
    finished: false,
  };
  function reducer(state, action) {
    switch (action.type) {
      case "answer":
        const isCorrect = action.answer === action.userAnswer;
        const nextIndex = state.index + 1;
        return {
          ...state,
          score: isCorrect ? state.score + 1 : state.score,
          index: nextIndex,
          finished: nextIndex === questions.length,
        };
      case "restart":
        return initialState;
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  if (state.finished) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-96">
          <h1 className="text-2xl font-bold mb-4">Quiz Finished 🎉</h1>
          <p className="text-lg mb-6">
            Your score:{" "}
            <span className="font-semibold text-blue-600">
              {state.score}/{questions.length}
            </span>
          </p>
          <button
            onClick={() => dispatch({ type: "restart" })}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Restart
          </button>
        </div>
      </div>
    );
  }

  const current = questions[state.index];

  return (
    <div className="flex items-center justify-center h-100 bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Quiz App</h1>
        <p className="text-lg font-medium mb-4">{current.text}</p>
        <div className="flex flex-col gap-3 mb-6">
          {current.options.map((opt) => (
            <button
              key={opt}
              onClick={() => dispatch({ type: "answer", answer: current.correct, userAnswer: opt })}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-blue-500 hover:text-white transition"
            >
              {opt}
            </button>
          ))}
        </div>
        <p className="text-gray-600 text-sm text-center">
          Score: <span className="font-semibold">{state.score}</span>
        </p>
      </div>
    </div>
  );
};
const Reducer = () => {
const Action={INCREMENT:"increment",DECREMENT:"decrement",MULTIPLY:"multiply",Reset:"reset"}
function reducer(state, action) {
  switch (action.type) {
    case Action.INCREMENT:
      return {count:state.count+1}
    case Action.DECREMENT:
      return {count:state.count-1}
    case Action.MULTIPLY:
      return {count:state.count*2}
      case Action.Reset:
        return initialState
      default:
        throw new Error("Unknown action type" + action.type)
  }
}
  const initialState={count:0}
  const[state,dispatch]= useReducer(reducer, initialState)
  const [toggle,toggleset]=useReducer((state)=>!state,false)
  return (
    <>
    <div className='border '>
      <h1 className='text-center'>Reducer Component</h1>
      <div className='flex justify-between p-4'>
        <button className='border p-4 py-2 rounded-md' onClick={() => dispatch({ type: Action.INCREMENT })}>Increment</button>
        <button className='border p-4 py-2 rounded-md' onClick={() => dispatch({ type: Action.DECREMENT })}>Decrement</button>
        <button className='border p-4 py-2 rounded-md' onClick={() => dispatch({ type: Action.MULTIPLY })}>Multiply</button>
        <button className='border p-4 py-2 rounded-md' onClick={() => dispatch({ type: Action.Reset })}>Reset</button>
      </div>
      <h2 className='text-center'>{state.count}</h2>
      <button className='border p-4 py-2 rounded-md' onClick={toggleset}>{toggle ? "ON" : "OFF"}</button>
    </div>
      <Quiz/>
    </>
  )
}

export default Reducer
