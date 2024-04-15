import Typography from '@material-ui/core/Typography';

const Home = () => {
  return (
    <div>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to the Money Transfer Service
      </Typography>
      <Typography variant="body1" align="center">
        This is a simple and secure platform for transferring money internationally.
      </Typography>
      <Typography variant="body1" align="center">
        Please <a href="/login">login</a> or <a href="/register">register</a> to get started.
      </Typography>
    </div>
  );
};

export default Home;
