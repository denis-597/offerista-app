import { useSelector, useDispatch } from "react-redux";
import { getFlyers } from "../state/flyer/flyerSlice";
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { toggleFlyerToFav } from "../utils/flyerUtils";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const flyers = useSelector((state) => state.flyer.data);
  const flyerStatus = useSelector((state) => state.flyer.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFlyers({ page: currentPage, limit: pageSize }));
  }, [dispatch, currentPage, pageSize]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={flyerStatus === 'loading'}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {flyerStatus === 'failed' && <>Failed</>}

      <Box p={2}
        style={{ textAlign: 'start' }}
      >
        <Grid container spacing={2}>

          {flyers && flyerStatus === 'successful' && flyers.map((flyer, k) => (
            <Grid item xs={6} md={3} key={k}>
              <Box p={2}
                style={{ textAlign: 'start' }}
              >

                <Card sx={{ maxWidth: 345 }} >
                  <CardMedia
                    sx={{ height: 140 }}
                    image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">
                      {flyer[5]}
                    </Typography>
                    <Typography variant="body" color="text.secondary" fontWeight={"bold"}>
                      {flyer[1]}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {flyer[6]}
                    </Typography>
                  </CardContent>

                  <IconButton
                    size="large"
                    color="inherit"
                    onClick={() => toggleFlyerToFav(flyer)}
                  >
                    <FavoriteIcon />
                  </IconButton>

                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box mt={2} display="flex" justifyContent="center">
          <Button disabled={currentPage === 1} onClick={handlePrevPage}>Prev</Button>
          <Typography variant="subtitle2">{`Page ${currentPage}`}</Typography>
          <Button disabled={flyers.length < pageSize} onClick={handleNextPage}>Next</Button>
        </Box>

      </Box>

    </div >
  );
};

export default Home;
