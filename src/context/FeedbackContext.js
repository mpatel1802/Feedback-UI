import { createContext, useState } from 'react';
/* Context provides a way to pass data through the component tree without having to pass props down manually at every level. */
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: "This is the feedback 1",
            rating: 9
        },
        {
            id: 2,
            text: "This is the feedback 2",
            rating: 10
        },
        {
            id: 3,
            text: "This is the feedback 3",
            rating: 8
        }
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    });

    const addFeedback = (nF) => {
        nF.id = uuidv4();
        // The state of the object is immutable - we cant just push onto it. We have to basically make a copy of it.
        setFeedback([nF, ...feedback])
    }

    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete ?')) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item: item,
            edit: true
        })
    }

    const updateFeedback = (id, newItem) => {
        setFeedback(feedback.map((item) => item.id === id ? { ...item, ...newItem } : item));
    }

    return <FeedbackContext.Provider value={{
        // The variables in the provider are accesseible to the instance of Context we use.
        feedback: feedback,
        handleDelete: deleteFeedback,
        handleAdd: addFeedback,
        handleEdit: editFeedback,
        feedbackEdit: feedbackEdit,
        handleUpdate: updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;