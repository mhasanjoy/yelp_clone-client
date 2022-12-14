import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../api/RestaurantFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantDetailPage = () => {
    const { id } = useParams();
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);
    const [render, setRender] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`);
                console.log(response);
                setSelectedRestaurant(response.data.data);
            }
            catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [render]);
    console.log(render);

    return (
        <div className='container'>
            {
                selectedRestaurant &&
                <>
                    <h1 className='text-center display-1'>{selectedRestaurant.restaurant.name}</h1>
                    <div className="text-center">
                        <StarRating rating={selectedRestaurant.restaurant.average_rating} />
                        <span className='text-warning ms-1'>
                            {selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})` : '(0)'}
                        </span>
                    </div>
                    <div className="mt-3">
                        <Reviews reviews={selectedRestaurant.reviews} />
                        <AddReview render={render} setRender={setRender} />
                    </div>
                </>
            }
        </div>
    );
};

export default RestaurantDetailPage;