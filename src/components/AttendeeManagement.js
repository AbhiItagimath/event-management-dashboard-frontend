import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AttendeeManagement() {
    const [attendees, setAttendees] = useState([]);
    const [newAttendee, setNewAttendee] = useState({ name: '', email: '' });

    useEffect(() => {
        fetchAttendees();
    }, []);

    const fetchAttendees = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/attendees');
            setAttendees(response.data);
        } catch (error) {
            console.error('Error fetching attendees:', error);
        }
    };

    const handleInputChange = (e) => {
        setNewAttendee({ ...newAttendee, [e.target.name]: e.target.value });
    };

    const handleAddAttendee = async () => {
        try {
            await axios.post('http://localhost:8080/api/attendees', newAttendee);
            fetchAttendees();
            setNewAttendee({ name: '', email: '' });
        } catch (error) {
            console.error('Error adding attendee:', error);
        }
    };

    const handleDeleteAttendee = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/attendees/${id}`);
            fetchAttendees();
        } catch (error) {
            console.error('Error deleting attendee:', error);
        }
    };

    return (
        <div className="container">
            <h2>Attendee Management</h2>
            <div className="mb-3">
                <input type="text" name="name" value={newAttendee.name} onChange={handleInputChange} placeholder="Attendee Name" className="form-control" />
                <input type="email" name="email" value={newAttendee.email} onChange={handleInputChange} placeholder="Email" className="form-control" />
                <button onClick={handleAddAttendee} className="btn btn-primary mt-2">Add Attendee</button>
            </div>
            <ul className="list-group">
                {attendees.map(attendee => (
                    <li key={attendee.id} className="list-group-item">
                        <h5>{attendee.name}</h5>
                        <p>{attendee.email}</p>
                        <button onClick={() => handleDeleteAttendee(attendee.id)} className="btn btn-danger">Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AttendeeManagement;
