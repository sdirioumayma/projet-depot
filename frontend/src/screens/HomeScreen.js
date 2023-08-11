import { useEffect, useReducer } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import BackgroundImage1 from "../img/slider_1.png";
import BackgroundImage2 from "../img/slider_2.jpg";
import BackgroundImage3 from "../img/slider_3.png";
import { Carousel } from "react-bootstrap";
// import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
        console.log(err)

      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>The Adress</title>
      </Helmet>
      <Carousel>
        <Carousel.Item>
          <div
            className="d-block main_slider"
            style={{
              backgroundImage: `url(${BackgroundImage1})`,
            }}
          >
            <div className="container fill_height">
              <div className="row align-items-center fill_height">
                <div className="col">
                  <div className="main_slider_content" data-aos="fade-right">
                    <div className="red_button shop_now_button">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className="d-block w-100 main_slider"
            style={{
              backgroundImage: `url(${BackgroundImage2})`,
            }}
          >
            <div className="container fill_height">
              <div className="row align-items-center fill_height">
                <div className="col">
                  <div className="main_slider_content" data-aos="fade-right">
                    <div className="red_button shop_now_button">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className="d-block w-100 main_slider"
            style={{
              backgroundImage: `url(${BackgroundImage3})`,
            }}
          >
            <div className="container fill_height">
              <div className="row align-items-center fill_height">
                <div className="col">
                  <div className="main_slider_content" data-aos="fade-right">
                    <div className="red_button shop_now_button">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
      <h1>Products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
