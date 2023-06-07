import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import "rc-slider/assets/index.css";

const Home = () => {
  const [price, setPrice] = useState([1, 1000]);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );
  const [currentPage, setCurrentPage] = useState(1);

  const numPage = Math.ceil(productsCount / resPerPage);
  const keyword = useParams();
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price));
  }, [dispatch, alert, error, currentPage, keyword, price]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products Online"} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
            </div>
          </section>
          {resPerPage <= productsCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                pageRangeDisplayed={numPage}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                lastPageText={"Last"}
                firstPageText={"First"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </>
  );
};

export default Home;
