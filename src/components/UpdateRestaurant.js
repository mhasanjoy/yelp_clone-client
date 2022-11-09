import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RestaurantFinder from '../api/RestaurantFinder';

const UpdateRestaurant = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`);
                const { name, location, price_range } = response.data.data.restaurant;
                setName(name);
                setLocation(location);
                setPriceRange(price_range);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleSubmit = async event => {
        event.preventDefault();

        const response = await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range: priceRange
        });
        console.log(response);
        navigate("/");
    };

    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={event => setName(event.target.value)} id='name' className='form-control' type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input value={location} onChange={event => setLocation(event.target.value)} id='location' className='form-control' type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input value={priceRange} onChange={event => setPriceRange(event.target.value)} id='price_range' className='form-control' type="number" />
                </div>
                <button type='submit' onClick={handleSubmit} className="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    );
};

export default UpdateRestaurant;