import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../api/RestaurantFinder';

const AddReview = ({ render, setRender }) => {
    const { id } = useParams();

    const [name, setName] = useState('');
    const [rating, setRating] = useState('Rating');
    const [reviewText, setReviewText] = useState('');

    const handleSubmitReview = async event => {
        event.preventDefault();

        try {
            const response = await RestaurantFinder.post(`/${id}/addReview`, {
                name,
                review: reviewText,
                rating
            });
            console.log(response);
            setRender(!render);
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='mt-5'>
            <form action="">
                <div className="row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input value={name} onChange={event => setName(event.target.value)} id='name' type="text" className='form-control' />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select id="rating" className="custom-select form-control" value={rating} onChange={event => setRating(event.target.value)}>
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="review">Review</label>
                    <textarea value={reviewText} onChange={event => setReviewText(event.target.value)} id="review" className="form-control"></textarea>
                </div>
                <button type='submit' onClick={handleSubmitReview} className="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    );
};

export default AddReview;