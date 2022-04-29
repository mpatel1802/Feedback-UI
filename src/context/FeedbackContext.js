import { createContext, useEffect, useState } from 'react';
/* Context provides a way to pass data through the component tree without having to pass props down manually at every level. */

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    
    const [feedback, setFeedback] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    });

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        const response = await fetch("/feedback?_sort=id&_order=desc");
        const data = await response.json();
        setFeedback(data);
        setLoading(false);
    }


    const addFeedback = async (nF) => {

        const response = await fetch('/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(nF) })

        const data = await response.json();
        // The state of the object is immutable - we cant just push onto it. We have to basically make a copy of it.
        setFeedback([data, ...feedback])
    }

    const deleteFeedback = async (id) => {
        
        if (window.confirm('Are you sure you want to delete ?')) {
            await fetch(`/feedback/${id}`, { method: 'DELETE' });
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item: item,
            edit: true
        })
    }

    const updateFeedback = async (id, newItem) => {
        const response = await fetch(`/feedback/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newItem) });
        const data = await response.json();
        setFeedback(feedback.map((item) => item.id === id ? { ...item, ...data } : item));
    }

    return <FeedbackContext.Provider value={{
        // The variables in the provider are accesseible to the instance of Context we use.
        feedback: feedback,
        handleDelete: deleteFeedback,
        handleAdd: addFeedback,
        handleEdit: editFeedback,
        feedbackEdit: feedbackEdit,
        handleUpdate: updateFeedback,
        isLoading: isLoading
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;