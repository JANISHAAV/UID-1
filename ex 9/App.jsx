import React, { useEffect, useMemo, useRef, useState } from 'react';

const STORAGE_KEY = 'todos-hooks-v1';

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(t => ({
      id: String(t.id ?? crypto.randomUUID()),
      text: String(t.text ?? ''),
      completed: Boolean(t.completed),
      createdAt: Number(t.createdAt ?? Date.now()),
    }));
  } catch {
    return [];
  }
}

function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function useLocalStorageTodos() {
  const [todos, setTodos] = useState(() => loadTodos());
  useEffect(() => { saveTodos(todos); }, [todos]);
  return [todos, setTodos];
}

function TodoItem({ todo, toggleTodo, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const editInputRef = useRef(null);

  useEffect(() => { if (isEditing) editInputRef.current?.focus(); }, [isEditing]);

  function submitEdit() {
    setIsEditing(false);
    if (text !== todo.text) editTodo(todo.id, text);
  }

  return (
    <li className="item" role="listitem" aria-label={todo.text}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
      />
      {!isEditing ? (
        <div
          className={"text " + (todo.completed ? 'completed' : '')}
          onDoubleClick={() => setIsEditing(true)}
          title="Double‑click to edit"
        >
          {todo.text}
        </div>
      ) : (
        <input
          ref={editInputRef}
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onBlur={submitEdit}
          onKeyDown={(e) => { if (e.key === 'Enter') submitEdit(); if (e.key === 'Escape') { setIsEditing(false); setText(todo.text); } }}
          aria-label="Edit to‑do"
        />
      )}
      <div className="actions">
        <button className="ghost" onClick={() => setIsEditing(true)} aria-label="Edit" title="Edit">Edit</button>
        <button className="danger" onClick={() => deleteTodo(todo.id)} aria-label="Delete" title="Delete">Delete</button>
      </div>
    </li>
  );
}

export default function App() {
  const [todos, setTodos] = useLocalStorageTodos();
  const [draft, setDraft] = useState('');
  const [filter, setFilter] = useState('all');
  const inputRef = useRef(null);

  const activeCount = useMemo(() => todos.filter(t => !t.completed).length, [todos]);
  const completedCount = useMemo(() => todos.filter(t => t.completed).length, [todos]);

  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter(t => !t.completed);
    if (filter === 'completed') return todos.filter(t => t.completed);
    return todos;
  }, [todos, filter]);

  function handleAdd(e) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    const todo = { id: crypto.randomUUID(), text, completed: false, createdAt: Date.now() };
    setTodos([todo, ...todos]);
    setDraft('');
    inputRef.current?.focus();
  }

  function toggleTodo(id) {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  function deleteTodo(id) {
    setTodos(todos.filter(t => t.id !== id));
  }

  function editTodo(id, newText) {
    const text = newText.trim();
    if (!text) {
      setTodos(todos.filter(t => t.id !== id));
      return;
    }
    setTodos(todos.map(t => t.id === id ? { ...t, text } : t));
  }

  function clearCompleted() {
    setTodos(todos.filter(t => !t.completed));
  }

  return (
    <div className="app" role="application" aria-label="To‑Do app">
      <div className="header">
        <h1>To‑Do</h1>
        <div className="count" aria-live="polite">{activeCount} item{activeCount !== 1 ? 's' : ''} left</div>
      </div>

      <form className="input-row" onSubmit={handleAdd} aria-label="Add to‑do">
        <label htmlFor="newTodo" className="sr-only" style={{position:'absolute', left:'-10000px'}}>New to‑do</label>
        <input
          id="newTodo"
          ref={inputRef}
          type="text"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          placeholder="What needs to be done?"
          aria-label="New to‑do"
        />
        <button className="primary" type="submit" disabled={!draft.trim()} aria-label="Add to‑do">Add</button>
      </form>

      <div className="toolbar">
        <div className="filters" role="tablist" aria-label="Filters">
          <button
            role="tab"
            className={filter === 'all' ? 'active' : ''}
            aria-selected={filter === 'all'}
            onClick={() => setFilter('all')}
          >All</button>
          <button
            role="tab"
            className={filter === 'active' ? 'active' : ''}
            aria-selected={filter === 'active'}
            onClick={() => setFilter('active')}
          >Active</button>
          <button
            role="tab"
            className={filter === 'completed' ? 'active' : ''}
            aria-selected={filter === 'completed'}
            onClick={() => setFilter('completed')}
          >Completed</button>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span className="count">{completedCount} completed</span>
          <button className="ghost" onClick={clearCompleted} disabled={completedCount === 0} aria-label="Clear completed">Clear completed</button>
        </div>
      </div>

      <ul role="list" aria-label="To‑do list">
        {filteredTodos.length === 0 && (
          <div className="empty">No items {filter !== 'all' ? `in ${filter}` : ''}. Add something above.</div>
        )}
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} />
        ))}
      </ul>
    </div>
  );
}


