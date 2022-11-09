import React, { useContext, useState } from 'react';
import RestaurantFinder from '../api/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
    const { addRestaurant } = useContext(RestaurantsContext);

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('Price Range');

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const response = await RestaurantFinder.post('/', {
                name,
                location,
                price_range: priceRange
            });
            console.log(response);
            addRestaurant(response.data.data.restaurant);
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='m-4 w-75 mx-auto'>
            <form>
                <div className="row g-3">
                    <div className="col">
                        <input type="text" className='form-control' placeholder='Name' value={name} onChange={event => setName(event.target.value)} />
                    </div>
                    <div className="col">
                        <input type="text" className='form-control' placeholder='Location' value={location} onChange={event => setLocation(event.target.value)} />
                    </div>
                    <div className="col">
                        <select className="custom-select mr-sm-2 form-control" value={priceRange} onChange={event => setPriceRange(event.target.value)}>
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <div className="col">
                        <button type='submit' onClick={handleSubmit} className="btn btn-primary form-control">Add</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddRestaurant;