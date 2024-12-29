import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useForm } from 'react-hook-form';

function EventManagement() {
    const [events, setEvents] = useState([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        fetchEvents();
    }, []);
    const fetchEvents = async () => {
        try {
            const response = await api.get('/events');
            console.log('Fetched Events:', response.data);
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };
    
    const onSubmit = async (data) => {
        try {
            await api.post('/events', data);
            fetchEvents();
            reset();
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };
    

    const handleDeleteEvent = async (id) => {
        await api.delete(`/events/${id}`);
        fetchEvents();
    };

    return (
        <div className="container">
            <h2>Event Management</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
                <div className="form-group">
                    <input {...register('name', { required: true })} placeholder="Event Name" className="form-control" />
                    {errors.name && <span className="text-danger">This field is required</span>}
                </div>
                <div className="form-group">
                    <input {...register('description', { required: true })} placeholder="Description" className="form-control" />
                    {errors.description && <span className="text-danger">This field is required</span>}
                </div>
                <div className="form-group">
                    <input {...register('location', { required: true })} placeholder="Location" className="form-control" />
                    {errors.location && <span className="text-danger">This field is required</span>}
                </div>
                <div className="form-group">
                    <input type="date" {...register('date', { required: true })} className="form-control" />
                    {errors.date && <span className="text-danger">This field is required</span>}
                </div>
                <button type="submit" className="btn btn-primary">Add Event</button>
            </form>
            <ul className="list-group">
                {events.map(event => (
                    <li key={event.id} className="list-group-item">
                        <h5>{event.name}</h5>
                        <p>{event.description}</p>
                        <p>{event.location}</p>
                        <p>{event.date}</p>
                        <button onClick={() => handleDeleteEvent(event.id)} className="btn btn-danger">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventManagement;
