import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EventManagement from './components/EventManagement';
import AttendeeManagement from './components/AttendeeManagement';
import TaskTracker from './components/TaskTracker';

function App() {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> {/* Updated classes */}
                    <Link className="navbar-brand" to="/">Event Management Dashboard</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/events">Events</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/attendees">Attendees</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/tasks">Tasks</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="container mt-3">
                    <Routes>
                        <Route path="/events" element={<EventManagement />} />
                        <Route path="/attendees" element={<AttendeeManagement />} />
                        <Route path="/tasks" element={<TaskTracker />} />
                        <Route path="/" element={<h2>Welcome to the Event Management Dashboard</h2>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
