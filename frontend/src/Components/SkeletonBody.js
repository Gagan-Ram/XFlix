import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const data = [
  {}

];

function Media(props) {
  const { loading = false } = props;

  return (
    <Grid container wrap="nowrap" >
      {
        (
          loading ?
            Array.from(new Array(4)) : data).map((item, index) => (
              <Box key={index} sx={{ width: 250, marginRight: 10, my: 5 }}>

                <Skeleton sx={{ bgcolor: 'grey.800' }} variant="rectangular" width={300} height={160} />

                <Box sx={{ pt: 0.5 }}>
                  <Skeleton width="120%" sx={{ bgcolor: 'grey.800' }} />
                  <Skeleton width="120%" sx={{ bgcolor: 'grey.800' }} />
                </Box>
              </Box>
            ))}
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function SkeletonBody() {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Media loading />
    </Box>
  );
}
