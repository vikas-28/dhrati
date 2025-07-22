import React from "react";
import { Link } from "react-router-dom";
import "./404NotFound.css";

const NotFound = () => {
  return (
    // <div className="not-found-container">
    //   <h1>404 - Page Not Found</h1>
    //   <p>Oops! The page you're looking for doesn't exist.</p>
    //   <Link to="/" className="go-home">
    //     Go Back Home
    //   </Link>
    // </div>
    <section class="page_404">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 ">
            <div class="col-sm-10 col-sm-offset-1  text-center">
              <div class="four_zero_four_bg">
                <h1 class="text-center text_404">404</h1>
              </div>

              <div class="contant_box_404">
                <h3 class="h2">look's like you're lost</h3>
                <p>the page you are looking for is not avaible!</p>

                <Link to="/" class="link_404">
                  Go back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
