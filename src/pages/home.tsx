import React, { useState } from "react";
import {
    Box,
    Button,
    LinearProgress,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import CardList from "../components/cardList";
import axios from 'axios';

const Home = () => {
    const [images, setImages] = useState<any[]>([]);
    const [imageCount, setImageCount] = useState<number>(1);
    const [inputError, setInputError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const apiKey = 'live_UMIEHUqwTGnUFY8TiJrv60nSuK36A42ddgNtFcb9YWb4lsQgXUJGvfJ4xcJfnlqA';

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        setImageCount(newValue);
    };


    const fetchImages = async () => {
        try {
            // console.log("imageCount", imageCount)
            if (imageCount < 1 || imageCount > 10) {
                setInputError(true);
                setImages([]);
            } else {
                setInputError(false);
                setIsLoading(true);
                const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${imageCount}&breed_ids=beng&api_key=${apiKey}`);
                const data = response.data;
                setImages(data);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    return (
        <Stack spacing={2} padding={1} data-testid="main">
            <Typography variant="h3" component="h1">
                Cat Gallery
            </Typography>
            <Stack>
                <TextField
                    fullWidth
                    inputProps={{
                        "data-testid": "images-number-field",
                    }}
                    label="Images Number"
                    type="number"
                    value={imageCount}
                    onChange={handleInputChange}
                    error={inputError}
                    helperText={"Number should be between 1 and 10"}
                />
                <Button
                    data-testid="random-image-btn"
                    disableElevation
                    variant="contained"
                    fullWidth
                    onClick={fetchImages}
                >
                    Random
                </Button>
            </Stack>
            {isLoading && (
                <Box sx={{ width: "100%" }} data-testid="loading-indicator">
                    <LinearProgress />
                </Box>
            )}
            <CardList images={images} />
        </Stack>
    );
};

export default Home;
