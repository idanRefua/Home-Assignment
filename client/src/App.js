import { useEffect, useState, useRef } from "react";
import "./App.css";
import ImageProduct from "./component/ImageProductComponent/ImageProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchImgs } from "./store/imgsSlice";

function App() {
  const dispatch = useDispatch();
  const img = useSelector((state) => state.imgs);

  const [category, setCategory] = useState("flowers");
  const [imgs, setImgs] = useState([]);
  const [categoriesBox, setCategoriesBox] = useState(false);
  const currentPage = useRef();
  const [pageCount, setPageCount] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  //

  useEffect(() => {
    dispatch(fetchImgs());
  }, []);

  useEffect(() => {
    currentPage.current = 1;
    getPageCount();
  }, [category]);

  const getPageCount = () => {
    fetch(
      `http://localhost:8000/imgs/${category}?page=${currentPage.current}&limit=9`
    )
      .then((data) => data.json())
      .then((res) => {
        setPageCount(res.pageCount);
        setImgs(res.ourResults);
        setTotalPages(res.countPage);
      })
      .catch(() => alert("cant find"));
  };

  const nextPage = () => {
    // go to next page on api - next 9 pictures
    currentPage.current = currentPage.current + 1;
    getPageCount();
  };

  const prevPage = () => {
    // go to prev page on api - prev 9 pictures
    currentPage.current = currentPage.current - 1;
    getPageCount();
  };

  const openBoxCategory = () => {
    // choose category that call api search that category
    setCategoriesBox(true);
  };

  const changeCategory = (e) => {
    // set category and call api
    setCategory(e.target.value);
    setCategoriesBox(false);
  };

  return (
    <div className="App">
      <div className="main-box container">
        <h1 className="d-flex justify-content-center home-title">
          Home Assignment
        </h1>
        <br />

        <div className="d-flex justify-content-center">
          <button className="btn btn-info" onClick={openBoxCategory}>
            Change Category Images
          </button>
        </div>
        <div className="row">
          <div className="col-6 d-flex justify-content-start">
            {currentPage.current === 1 ? (
              <button onClick={prevPage} disabled>
                Previos
              </button>
            ) : (
              <button onClick={prevPage}>Previos</button>
            )}
          </div>
          <div className=" col-6 d-flex justify-content-end">
            {currentPage.current === totalPages ? (
              <button onClick={nextPage} disabled>
                Next
              </button>
            ) : (
              <button onClick={nextPage}>Next</button>
            )}
          </div>
        </div>
        <p className=" d-flex justify-content-center">
          {currentPage.current}/{totalPages}
        </p>
        {imgs.map((img) => {
          // map the imgs array
          return (
            <ImageProduct
              key={img.id}
              id={img.id}
              previewURL={img.previewURL}
              views={img.views}
              downloads={img.downloads}
              likes={img.likes}
              collections={img.collections}
              comments={img.comments}
              user={img.user}
            />
          );
        })}
      </div>

      {categoriesBox && (
        // box-html with all category options
        <div className="category-modal-box">
          <div className="category-modal-box-content d-flex justify-content-center">
            <div className="category-btns">
              <button
                className="btn btn-primary m-2"
                value="flowers"
                onClick={changeCategory}
              >
                Flowers
              </button>
              <button
                className="btn btn-primary m-2"
                value="food"
                onClick={changeCategory}
              >
                Food
              </button>
              <button
                className="btn btn-primary m-2"
                value="sport "
                onClick={changeCategory}
              >
                Sport
              </button>
              <button
                className="btn btn-primary m-2"
                value="bikes"
                onClick={changeCategory}
              >
                Bikes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
