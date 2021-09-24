// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import SubTitle from "./SubTitle";
// import ArrLeft from "../img/arrow_left.svg";
// import ArrRight from "../img/arrow_right.svg";
// import "../css/MainNew.css";

// const MainNew = () => {
//   const [docs, setDocs] = useState([]);
//   const [page, setPage] = useState(0);
//   console.log(window.innerWidth);
//   // const nextBook = Math.ceil(window.innerWidth / 236) + 1;
//   const getData = async () => {
//     const {
//       data: { items },
//     } = await axios.get(`${process.env.REACT_APP_API}/books/info/`, {
//       params: {
//         sort: "new",
//         limit: 20,
//       },
//     });
//     setDocs([...items.slice(-1), ...items, ...items.slice(0, 7)]);
//   };
//   useEffect(getData, []);
//   const onNext = () => {
//     let index = page;
//     if (index === docs.length - 9) {
//       index = -1;
//     }
//     index += 1;
//     setPage(index);
//   };

//   const onPrev = () => {
//     let index = page;
//     if (index === 0) {
//       index = docs.length - 8;
//     }
//     index -= 1;
//     setPage(index);
//   };
//   const transNum = -6608 - 92 + (216 + 20) * (docs.length - page);
//   return (
//     <section className="main-new">
//       <div className="main-new__title-wrapper">
//         <SubTitle
//           subTitle="집현전에 새로 들어온 신작을 확인해보세요"
//           description="책을 클릭하면 더 자세한 정보를 확인할 수 있습니다."
//           alignItems="center"
//         />
//       </div>

//       <div className="main-new__booklist">
//         <button className="main-new__arrow" onClick={onPrev} type="button">
//           <img src={ArrLeft} alt="" />
//         </button>
//         <button
//           className="main-new__arrow right"
//           onClick={onNext}
//           type="button"
//         >
//           <img src={ArrRight} alt="" />
//         </button>
//         <div
//           className="main-new__books"
//           style={{ transform: `translate(${transNum}px)` }}
//         >
//           {docs.map(item => (
//             /* 상세 페이지로 연결되어야 하는 부분 */
//             <Link
//               to={{
//                 pathname: `/info/${item.id}`,
//               }}
//             >
//               <img className="main-new__book" src={item.image} alt="popular" />
//             </Link>
//             /* 상세페이지로 연결되어야 하는 부분 끝 */
//           ))}
//         </div>
//         {/* 
        
//         {        <div className="main-new_books_pagination">
//           <ul className="main-new_books_pag_circlebox">
//             <li className="main-new_books_pag_circle" />
//             <li className="main-new_books_pag_circle selected" />
//             <li className="main-new_books_pag_circle" />
//             <li className="main-new_books_pag_circle" />
//           </ul>
//         </div>} */}
//       </div>
//     </section>
//   );
// };

// export default MainNew;

// 덕성ver.
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useResizeDetector } from 'react-resize-detector';
import { Link } from "react-router-dom";
import SubTitle from "./SubTitle";
import ArrLeft from "../img/arrow_left.svg";
import ArrRight from "../img/arrow_right.svg";
import "../css/MainNew.css";

const getBookCountsInScreen = (containerWidth) => {
  if (!containerWidth) {
    return 0;
  }

  if (containerWidth > 1500) {
    return 7;
  }

  if (containerWidth > 1200) {
    return 6;
  }

  return 5;
}

const MainNew = () => {
  const [books, setBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 요거 많이씀
  const { ref: containerRef, width: containerWidth } = useResizeDetector();

  const bookCountsInScreen = getBookCountsInScreen(containerWidth);
  const bookWidth = containerWidth ? (containerWidth - 100 * 2) / bookCountsInScreen : 0;

  useEffect(() => {
    const fetchBooks = async () => {
      const {
        data: { items },
      } = await axios.get(`${process.env.REACT_APP_API}/books/info/`, {
        params: {
          sort: "new",
          limit: 20,
        },
      });

      setBooks(items);
    };

    fetchBooks();    
  }, []);

  const onNext = () => {
    setCurrentIndex(prev => {
      const remain = books.length - prev - bookCountsInScreen;
      
      if (remain < 1) {
        return prev
      }

      if (remain >= bookCountsInScreen) {
        return prev + bookCountsInScreen;
      }

      return prev + remain;
    });
  };

  const onPrev = () => {
    setCurrentIndex(prev => {
      const remain = prev;
      
      if (remain < 0) {
        return prev;
      }

      if (remain >= bookCountsInScreen) {
        return prev - bookCountsInScreen;
      }

      return prev - remain;
    });
  };
  return (
    <section className="main-new">
      <div className="main-new__title-wrapper">
        <SubTitle
          subTitle="집현전에 새로 들어온 신작을 확인해보세요"
          description="책을 클릭하면 더 자세한 정보를 확인할 수 있습니다."
          alignItems="center"
        />
      </div>

      <div className="main-new__booklist">
        <button className="main-new__arrow left" onClick={onPrev} type="button">
          <img src={ArrLeft} alt="" />
        </button>
        <button
          className="main-new__arrow right"
          onClick={onNext}
          type="button"
        >
          <img src={ArrRight} alt="" />
        </button>
        <div
          className="main-new__books-container"
          ref={containerRef}
        >
          <div 
            className="main-new__books-slide"
            style={{
              transform: `translate(${100 - bookWidth * currentIndex}px)`
            }}
          >
            {books.map(item => (
              /* 상세 페이지로 연결되어야 하는 부분 */
              <div className="main-new__book-wrapper" style={{ width: bookWidth }}>
                <Link
                  to={{
                    pathname: `/info/${item.id}`,
                  }}
                >
                  <img className="main-new__book" src={item.image} alt="popular" />
                </Link>
              </div>
              /* 상세페이지로 연결되어야 하는 부분 끝 */
            ))}
          </div>
        </div>
        {/* 
        
        {        <div className="main-new_books_pagination">
          <ul className="main-new_books_pag_circlebox">
            <li className="main-new_books_pag_circle" />
            <li className="main-new_books_pag_circle selected" />
            <li className="main-new_books_pag_circle" />
            <li className="main-new_books_pag_circle" />
          </ul>
        </div>} */}
      </div>
    </section>
  );
};

export default MainNew;
