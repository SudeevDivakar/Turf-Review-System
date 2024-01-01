import { Card, CardContent, Rating, Button } from "@mui/material";

export default function Review({ review, deleteComment }) {
  return (
    <Card sx={{ width: '30rem', mb: 1}}>
      <CardContent>
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Rating
            name="read-only"
            value={review.rating || 0}
            precision={0.5}
            readOnly
          />
          <p style={{textAlign:'left'}}>{review.review}</p>
          <Button variant='contained' color='error' onClick={() => deleteComment(review._id)} sx={{width: '30%'}}>Delete</Button>
        </div>
      </CardContent>
    </Card>
  );
}
