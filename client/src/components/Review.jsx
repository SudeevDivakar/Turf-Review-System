import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Rating, Button, Typography } from "@mui/material";

export default function Review({ review, deleteComment }) {
  const [isUser, setIsUser] = useState(false);
    useEffect(() => {
        async function isLoggedIn() {
            const user = await axios.get('http://localhost:3000/profile', {withCredentials: true}); 
            if(!user.data){
                setIsUser(false);
            }
            else if(review.author.username === user.data.username){
                setIsUser(true);
            }
            else{
              setIsUser(false);
            }
        }
        isLoggedIn();
    })
  return (
    <Card sx={{ width: '30rem', mb: 1.5 }}>
      <CardContent>
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Rating
            name="read-only"
            value={review.rating || 0}
            precision={0.5}
            readOnly
            sx={{mb: 1.2, mt: 1}}
          />
          <Typography variant="body1" textAlign="left" fontSize={12} color='text.secondary' sx={{mb: 2}} gutterBottom>
            Review by - <b>{review.author.username}</b>
          </Typography>
          <Typography variant="body1" textAlign="left" sx={{mb: 2}}>
            "{review.review}"
          </Typography>
          {isUser && <Button variant='contained' color='error' onClick={() => deleteComment(review._id)} sx={{ width: '30%' }}>Delete</Button>}
        </div>
      </CardContent>
    </Card>
  );
}
