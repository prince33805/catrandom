import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";

const CardList = ({ images }: { images: any[] }) => {
    return (
        <Grid container spacing={1} data-testid="images-list">
            {images.map((image) => (
                <Grid item xs={12} md={4} key={image.id} data-testid="image-item">
                    <Card variant="outlined">
                        <CardMedia
                            component="img"
                            alt={image.id}
                            height={300}
                            width="100%"
                            image={image.url}
                            loading="lazy"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {`Size: ${image.width}x${image.height} `}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default CardList;
