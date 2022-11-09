import React, { useContext, useEffect } from 'react';
import RestaurantFinder from '../api/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { Link, useNavigate } from "react-router-dom"
import StarRating from './StarRating';

const RestaurantList = (props) => {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get('/');
                setRestaurants(response.data.data.restaurants);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (event, id) => {
        event.stopPropagation();

        try {
            const response = await RestaurantFinder.delete(`/${id}`);
            console.log(response);
            setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = (event, id) => {
        event.stopPropagation();
        navigate(`restaurants/${id}/update`);
    };

    const handleRestaurantSelect = id => {
        navigate(`/restaurants/${id}`);
    };

    return (
        <div className='list-group'>
            <table className="table table-hover table-dark table-bordered">
                <thead>
                    <tr className="table-primary">
                        <th scope='col'>Restaurant</th>
                        <th scope='col'>Location</th>
                        <th scope='col'>Price Range</th>
                        <th scope='col'>Ratings</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        restaurants &&
                        restaurants.map(restaurant =>
                            <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{'$'.repeat(restaurant.price_range)}</td>
                                <td>
                                    {
                                        restaurant.count ?
                                            <div>
                                                <StarRating rating={restaurant.average_rating} />
                                                <span className='text-warning ms-1'>({restaurant.count})</span>
                                            </div>
                                            :
                                            <span className='text-warning ms-1'>0 reviews</span>
                                    }
                                </td>
                                <td><button onClick={event => handleUpdate(event, restaurant.id)} className="btn btn-warning">Update</button></td>
                                <td><button onClick={event => handleDelete(event, restaurant.id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default RestaurantList;