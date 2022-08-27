import "./App.css";
import { useReducer, useState } from "react";

const initState = {
  list: [],
  completeList: [],
};

function removeItems(state, action) {
  const { list } = state;
  const newList = list.filter((el, index) => index !== action.payload);
  return { list: newList };
}

function completeItems(state, action) {
  const index = action.payload;
  const completeList = [...state.completeList, state.list[index]];
  const currentCompleteListIndex = completeList.length - 1;
  completeList[currentCompleteListIndex].complete = true;
  const list = state.list.filter((el, index) => index !== action.payload);
  return { list, completeList };
}

function incompleteItems(state, action) {
  const completeItemIndex = action.payload;
  const list = [...state.list, state.completeList[completeItemIndex]];
  const listIndex = state.list.length - 1;
  list[listIndex].complete = false;
  const completeList = state.completeList.filter(
    (el, index) => index !== completeItemIndex
  );
  return { list, completeList };
}

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        list: [...state.list, action.payload],
        completeList: [],
      };
    case "remove":
      return removeItems(state, action);
    case "complete":
      return completeItems(state, action);
    case "incomplete":
      return incompleteItems(state, action);
    default:
      return state;
  }
}

function App() {
  const [item, setItem] = useState("");
  const [state, dispatch] = useReducer(reducer, initState);

  const { list, completeList } = state;

  function nameHandler(e) {
    setItem(e.target.value);
  }

  function addHandler() {
    if (item === "") {
      return;
    }
    dispatch({
      type: "add",
      payload: { itemName: item, complete: false },
    });
    setItem("");
  }

  function removeHandler(index) {
    dispatch({
      type: "remove",
      payload: index,
    });
  }

  function keyUpHandler(e) {
    if (e.keyCode === 13) {
      addHandler();
    }
  }

  function taskCompleteHandler(index) {
    dispatch({
      type: "complete",
      payload: index,
    });
  }

  function taskInCompleteHandler(index) {
    dispatch({
      type: "incomplete",
      payload: index,
    });
  }

  return (
    <div className="App">
      <input
        onChange={(e) => nameHandler(e)}
        value={item}
        onKeyUp={(e) => keyUpHandler(e)}
      />
      <button onClick={addHandler}>+</button>
      <h3>Incomplete List</h3>
      {list.length
        ? list.map((el, index) => {
            return (
              <>
                <ul key={index}>
                  <li>
                    <div className="container">
                      <input
                        checked={false}
                        type="checkbox"
                        onClick={() => taskCompleteHandler(index)}
                      />
                      <p>{el.itemName}</p>
                      <button onClick={() => removeHandler(index)}>X</button>
                    </div>
                  </li>
                </ul>
              </>
            );
          })
        : null}
      <h3>Complete List</h3>
      {completeList.length
        ? completeList.map((el, index) => {
            return (
              <ul key={index}>
                <li>
                  <div className="container">
                    <input
                      checked={el.complete}
                      type="checkbox"
                      onClick={() => taskInCompleteHandler(index)}
                    />
                    <p>{el.itemName}</p>
                    <button onClick={() => removeHandler(index)}>X</button>
                  </div>
                </li>
              </ul>
            );
          })
        : null}
    </div>
  );
}

export default App;
