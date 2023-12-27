import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AllTurfs() {
    const [turfs, setTurfs] = useState([]);

    useEffect(() => {
        fetchTurfs();
    }, []);

    const fetchTurfs = async () => {
        const res = await axios.get('http://localhost:3000/turfs');
        setTurfs((oldTurfs) => {
            return res.data;
        })
    };


    return (
        <div>
            <h1>All Turfs</h1>
            <ul>
                {turfs.map((turf) => {
                    return <li key={turf._id}><Link to={`/turfs/${turf._id}`} >{turf.name}</Link></li>
                })}
            </ul>
            <Link to='/turfs/new'>Add Turf</Link>
        </div>
    );
}