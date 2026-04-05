// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [myGroups, setMyGroups] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchMyGroups = async () => {
            try {
                const res = await api.get('/groups/my-groups');
                setMyGroups(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMyGroups();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Welcome, {user?.name}!</h1>
            <Link to="/create-group"><button>Create New Group</button></Link>
            <Link to="/groups"><button>Browse All Groups</button></Link>
            <h2>Your Groups</h2>
            {myGroups.length === 0 && <p>You haven't joined any groups yet.</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {myGroups.map(group => (
                    <div key={group.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '250px' }}>
                        <h3>{group.group_name}</h3>
                        <p>{group.course_name}</p>
                        <Link to={`/group/${group.id}`}>View Group</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;