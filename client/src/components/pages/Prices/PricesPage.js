import { Alert, Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getConcerts, loadConcertsRequest} from '../../../redux/concertsRedux';


const Prices = ( ) => {

  const dispatch = useDispatch();
  const concerts = useSelector(getConcerts)

  useEffect(() => {
    dispatch(loadConcertsRequest())
  }, [dispatch]);

  const convert = day => {
    const days = ['one', 'two', 'three', 'four', 'fife', 'six', 'seven'];
    return days[(day - 1)]
  }

  return (

      <Container>
      <h1>Prices</h1>
      <p>Prices may differ according the day of the festival. Remember that ticket includes not only the star performance, but also 10+ workshops. We gathered several genre teachers to help you increase your vocal skills, as well as self confidence.</p>

      <Alert color="info">
          Attention! <strong>Children under 4 can go freely with you without any other fee!</strong>
      </Alert>

        <section>
          {concerts.map(con => 
          <div key={ con._id }>
            <h2>Day { convert(con.day) }</h2>
            <p>Price: { con.price }$</p>
            <p>Workshops: {con.workshops.map(workshop => `"${ workshop.name }", `)}</p>
          </div>
          )}
        </section>

      </Container> 
  );
}



export default Prices;