import React, { useEffect, useState } from 'react';
import HabitService from '../Services/HabitService';
import '../styles/styles.css';

const Habits = () => {
  const [habit, sethabit] = useState([]);
  const [create, setcreate] = useState({
    name: '',
    habitType: '',
    status: 'NOT_STARTED',
    notes: ''
  });
  const [search, setsearch] = useState('');
  const [edit, setedit] = useState(null);
  const [showModal, setshowModal] = useState(false);

  useEffect(() => {
    FetchHabits();
  }, []);

  const FetchHabits = async () => {
    try {
      const response = await HabitService.Getall();
      sethabit(response.data);
    } catch (err) {
      console.log("not found", err);
    }
  };

  const FetchHabitsbyname = async (name) => {
    try {
      const response = await HabitService.Getbyname(name);
      sethabit(response.data);
    } catch (err) {
      console.log("not found by their id", err);
    }
  };

  const handleAdd = async () => {
    try {
      await HabitService.post(create);
      FetchHabits();
      closeModal();
    } catch (err) {
      console.error("Cannot add", err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await HabitService.update(id, create);
      FetchHabits();
      closeModal();
    } catch (err) {
      console.error("Updation failed", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await HabitService.deletehabit(id);
      FetchHabits();
    } catch (err) {
      console.error("Deletion failed", err);
    }
  };

  const openEditModal = (hab) => {
    setcreate(hab);
    setedit(hab.id);
    setshowModal(true);
  };

  const openAddModal = () => {
    setcreate({
      name: '',
      habitType: '',
      status: 'NOT_STARTED',
      notes: ''
    });
    setedit(null);
    setshowModal(true);
  };

  const closeModal = () => {
    setcreate({
      name: '',
      habitType: '',
      status: 'NOT_STARTED',
      notes: ''
    });
    setedit(null);
    setshowModal(false);
  };

  return (
    <>
      <div>
        <h1>Welcome to the Habit Tracker App!..</h1>

        <div className='top-bar'>
          <button className='add-btn' onClick={openAddModal}>Add Habit</button>
        </div>

        <input
          type="text"
          className='search-input'
          placeholder="Search"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
        <button className='search-btn'  onClick={() => FetchHabitsbyname(search)}>Search</button>
        <button className='clear-btn'  onClick={FetchHabits}>Clear</button>

        <ul>
          {habit.map((hab) => (
            <li key={hab.id}>
              <div><strong>ID:</strong> {hab.id}</div>
              <div><strong>NAME:</strong> {hab.name}</div>
              <div><strong>STATUS:</strong> {hab.status}</div>
              <div><strong>HABIT TYPE:</strong> {hab.habitType}</div>
              <div><strong>Notes:</strong> {hab.notes}</div>
              <button onClick={() => openEditModal(hab)}>✏️ Edit</button>
              <button onClick={() => handleDelete(hab.id)}>🗑️ Delete</button>
            </li>
          ))}
        </ul>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>{edit ? 'Edit Habit' : 'Add Habit'}</h2>
              <input
                type="text"
                placeholder="Habit name"
                value={create.name}
                onChange={(e) => setcreate({ ...create, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Habit type"
                value={create.habitType}
                onChange={(e) => setcreate({ ...create, habitType: e.target.value })}
              />
              <select
                value={create.status}
                onChange={(e) => setcreate({ ...create, status: e.target.value })}
              >
                <option value="NOT_STARTED">Not Started</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
              <input
                type="text"
                placeholder="Notes"
                value={create.notes}
                onChange={(e) => setcreate({ ...create, notes: e.target.value })}
              />
              <div className="modal-buttons">
                {edit ? (
                  <button onClick={() => handleUpdate(edit)}>Save</button>
                ) : (
                  <button onClick={handleAdd}>Add</button>
                )}
                <button onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Habits;
