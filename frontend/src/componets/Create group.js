// src/components/CreateGroup.js
import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function CreateGroup() {
    const [form, setForm] = useState({ group_name: '', course_name: '', description: '', meeting_location: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/groups', form);
            alert('Group created!');
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.message || 'Creation failed');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px' }}>
            <h2>Create a Study Group</h2>
            <form onSubmit={handleSubmit}>
                <input name="group_name" placeholder="Group Name" onChange={handleChange} required className="form-input" />
                <input name="course_name" placeholder="Course Name/Code" onChange={handleChange} required className="form-input" />
                <textarea name="description" placeholder="Description" onChange={handleChange} rows="3" className="form-input"></textarea>
                <input name="meeting_location" placeholder="Meeting Location (e.g., Library or Zoom link)" onChange={handleChange} className="form-input" />
                <button type="submit">Create Group</button>
            </form>
        </div>
    );
}

export default CreateGroup;