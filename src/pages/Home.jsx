import React, { useContext, useEffect } from 'react'
import ProductsCard from '../components/ProductsCard/ProductsCard'
import { ItemsContext, UPLOAD_ITEMS } from '../context/itemsContext';
import { getProducts } from '../services/axios.config';
import "./Home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bannerImage from '../assets/images/banner.png';
import UpdateStock from '../components/UpdateStock/UpdateStock';
import CreateCategory from '../components/CreateCategory/CreateCategory';

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  const { items, dispatch } = useContext(ItemsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts();
        dispatch({ type: UPLOAD_ITEMS, payload: response.data });
      } catch (error) {
        console.error("Error al procesar la respuesta del servicio:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="home__container">
      <img src={bannerImage} alt="Banner de inicio" className="home__banner-image" />
      <div className="home__product-list">
        <Slider {...settings}>
          {items.map(product => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </Slider>
      </div>
      <CreateCategory/>
      <UpdateStock />
    </div>
  );
}
