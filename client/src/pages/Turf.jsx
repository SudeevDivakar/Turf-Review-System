import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Turf(){
    const navigate = useNavigate();
    const [turf, setTurf] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetchTurf();
    },[]);

    const fetchTurf = async () => {
        const res = await axios.get(`http://localhost:3000/turfs/${id}`);
        setTurf((oldTurf) => {
            return res.data;
        });
    }

    const handleDelete = async () => {
        try{
            const res = await axios.delete(`http://localhost:3000/turfs/${id}`);
            navigate('/turfs');
        }
        catch{
            console.log('Error in Deleting Turf');
        }
    }

    return(
        <div>
            <h1>{turf.name}</h1>
            <h3>{turf.location}</h3>
            <p>{turf.review}</p>
            <Link to={`/turfs/edit/${id}`}>Edit Turf</Link>
            <button onClick={handleDelete}>Delete Turf</button>
            <Link to='/turfs'>Back To Turfs</Link>
        </div>
    )
}