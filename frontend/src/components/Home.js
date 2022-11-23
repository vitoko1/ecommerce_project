import React, { Fragment } from "react";
import MetaData from "./layout/MetaData";
import Pagination from "react-js-pagination";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import { useEffect } from "react";
import Loader from "./layout/Loader";

import Product from "./product/Product";
import { useAlert } from "react-alert";
import { useState } from "react";

import { useParams } from "react-router-dom";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";

// const { createSliderWithTooltip } = Slider;
// const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ match }) => {
  console.log("Search....");

  const [currentPage, setCurrentPage] = useState(1);
  // const { price, setPrice } = useState([1, 1000]);

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  const params = useParams();
  const keyword = params.keyword;

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(keyword, currentPage));
  }, [dispatch, alert, error, keyword, currentPage]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <Fragment>
      {loading ? (
        <h1>
          {" "}
          <Loader></Loader>
        </h1>
      ) : (
        <Fragment>
          <MetaData title={"Buy Whatever you Need Online"} />
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {/* {keyword ? (
                <Fragment>
                  <div className="col-6 col-md3 mt-5 mb-5 ">
                    <div className="px-5">
                      <Range
                        marks={{
                          1: `$1`,
                          1000: `$1000`,
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={(value) => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />
                    </div>
                  </div>
                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products &&
                        products.map((product) => (
                          <Product
                            key={product._id}
                            product={product}
                            col={4}
                          />
                        ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                products &&
                products.map((product) => (
                  <Product key={product._id} product={product} col={3} />
                ))
              )} */}
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} col={3} />
                ))}
            </div>
          </section>

          {resPerPage < productsCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
