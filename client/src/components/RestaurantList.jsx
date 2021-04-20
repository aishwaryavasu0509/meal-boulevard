import React, {useEffect,useContext} from 'react'
import RestaurantFinder from "../apis/RestaurantFinder"
import { RestaurantsContext } from '../context/RestaurantsContext'
import {useHistory} from "react-router-dom";
import StarRating from './StarRating';

const RestaurantList = (props) => {

    const {restaurants,setRestaurants} = useContext(RestaurantsContext);
    let history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/")
                console.log(response.data.data);
                setRestaurants(response.data.data.restaurants);
            } catch (err) {}
        };
        
        fetchData();
    },[])


    const handleDelete = async (e,id) => {
        e.stopPropagation();
        try {

            const response = await RestaurantFinder.delete('/${id}');
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }))

        } catch(err) {
            console.log(err);
        }

    }

    const handleUpdate =(e,id) => {
        e.stopPropagation();
        history.push('/restaurants/${id}/update')
    }

    const handleRestaurantSelect = (id) => {
        history.push('/restaurants/${id}')
    }
    
    const renderRating = (restaurant) => {
        if(!restaurant.count){
            return <spam className="text-warning">0 reviews</spam>
        }
        return (
            <>
            <StarRating rating={restaurant.id}/>
            <spam className="text-warning ml-1">({restaurant.count})</spam>
            </>
        );
    }
    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Locationt</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map(restaurant => {
                        return (
                            <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{"$".repeat(restaurant.price_range)}</td>
                            <td>renderRating(restaurant)</td>
                            <td>
                                <button onClick={() => handleUpdate(restaurant.id)} className="btn btn-warning">Update</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(restaurant.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                        )
                        
                    })}
                   <tr>
                        <td>mcdonalds</td>
                        <td>New York</td>
                        <td>$$$$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-warning">Update</button>
                        </td>
                        <td><button className="btn btn-danger">Delete</button>
                        </td>
                    </tr>

                    <tr>
                        <td>tacobell</td>
                        <td>sanfrans</td>
                        <td>$$$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-warning">Update</button>
                        </td>
                        <td><button className="btn btn-danger">Delete</button>
                        </td>
                    </tr> 
                    <tr>
                        <td>taco bell</td>
                        <td>New York</td>
                        <td>$$$$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-warning">Update</button>
                        </td>
                        <td><button className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>cheesecake factory</td>
                        <td>dallas</td>
                        <td>$$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-warning">Update</button>
                        </td>
                        <td><button className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>cheesecake factory</td>
                        <td>dallas</td>
                        <td>$$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-warning">Update</button>
                        </td>
                        <td><button className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            
        </div>
    )
}

export default RestaurantList
