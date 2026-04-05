// src/components/Register.js
import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '', program_of_study: '', year_of_study: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/register', form);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Full Name" onChange={handleChange} required className="form-input" />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="form-input" />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="form-input" />
                <input name="program_of_study" placeholder="Program (e.g., BSIT)" onChange={handleChange} className="form-input" />
                <input name="year_of_study" placeholder="Year (e.g., Year 1)" onChange={handleChange} className="form-input" />
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
}

export default Register;