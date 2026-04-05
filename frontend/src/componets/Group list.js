// src/components/GroupList.js
import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

function GroupList() {
    const [groups, setGroups] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchGroups = async () => {
            const res = await api.get('/groups');
            setGroups(res.data);
        };
        fetchGroups();
    }, []);

    const filtered = groups.filter(g => 
        g.group_name.toLowerCase().includes(search.toLowerCase()) ||
        g.course_name.toLowerCase().includes(search.toLowerCase())
    );

    const handleJoin = async (groupId) => {
        try {
            await api.post(`/groups/${groupId}/join`);
            alert('Joined group!');
            // Refresh list
            const res = await api.get('/groups');
            setGroups(res.data);
        } catch (err) {
            alert(err.response?.data?.message || 'Join failed');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>All Study Groups</h2>
            <input type="text" placeholder="Search by name or course" value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '20px' }} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {filtered.map(group => (
                    <div key={group.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', width: '280px' }}>
                        <h3>{group.group_name}</h3>
                        <p><strong>Course:</strong> {group.course_name}</p>
                        <p>{group.description}</p>
                        <p><strong>Members:</strong> {group.member_count}</p>
                        <p><strong>Leader:</strong> {group.leader_name}</p>
                        <button onClick={() => handleJoin(group.id)}>Join Group</button>
                        <Link to={`/group/${group.id}`} style={{ marginLeft: '10px' }}>Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GroupList;