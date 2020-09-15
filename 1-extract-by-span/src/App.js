import React, { useState, useEffect } from "react";
import ReactCursorPosition from "react-cursor-position";
import "./App.css";

import { pdfjs, Document, Page } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function App() {
  const onDocumentLoadSuccess = () => {};

  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [topPercent, setTopPercent] = useState("");
  const [leftPercent, setLeftPercent] = useState("");
  const [transform, setTransform] = useState("");

  const [quoteText, setQuoteText] = useState("");
  const [showInputBox, setShowInputBox] = useState(false);
  const [textViewMode, setTextViewMode] = useState(false);
  const [lastMouseUpCoords, setLastMouseUpCoords] = useState([]);

  const getPage = (canvas, textLayer, window) => {
    if (canvas && textLayer) {
      /*
      
      console.log(textLayer.offsetHeight);
      console.log(textLayer.offsetWidth);
      console.log(textLayer.style); 
      
      */

      const textLayerComputedStyle = window.getComputedStyle(textLayer);

      setHeight(textLayer.offsetHeight);
      setWidth(textLayer.offsetWidth);
      setTopPercent(textLayer.style.top);
      setLeftPercent(textLayer.style.left);
      setTransform(textLayerComputedStyle.transform);

      if (!document.justOnce) {
        document.justOnce = true;
        document.addEventListener(
          "keydown",
          event => {
            if (event.code === "KeyA") {
              setTextViewMode(prevState => {
                if (!prevState) {
                  canvas.style.display = "none";
                  textLayer.style.display = "block";
                  textLayer.style.color = "black";
                } else {
                  canvas.style.display = "block";
                  textLayer.style.display = "none";
                  textLayer.style.color = "transparent";
                }
                return !prevState;
              });
            }
          },
          false
        );

        document.addEventListener(
          "keydown",
          event => {
            const { ctrlKey, code } = event;
            if (code === "KeyC" && ctrlKey) {
              setQuoteText(window.getSelection().toString());
              setShowInputBox(true);
            }
          },
          false
        );

        document.addEventListener(
          "mouseup",
          event => {
            const { clientX, clientY } = event;
            setLastMouseUpCoords([clientX, clientY]);
          },
          false
        );
      }
    }
  };

  function handlePageClick(event) {
    const { clientX, clientY } = event;
    console.log(clientX, clientY);
    console.log("moootyyyyyy");
  }

  return (
    <div className="App">
      <Document
        renderMode="canvas"
        onLoadSuccess={onDocumentLoadSuccess}
        file="http://localhost:3000/Kenny2010MalthusianTrap.pdf"
      >
        <Page
          className="pdf-page"
          key="12d2q4r"
          style={{ height: "9000px", width: "9000px" }}
          pageNumber={8}
          inputRef={ref =>
            ref
              ? getPage(ref.children[0], ref.children[1], window, document)
              : null
          }
          onClick={handlePageClick}
        >
          {showInputBox ? (
            <InputBox quoteText={quoteText} coords={lastMouseUpCoords} />
          ) : (
            ""
          )}
          {/* <div
            style={{
              position: "absolute",
              height: height + "px",
              width: width + "px",
              top: topPercent,
              left: leftPercent,
              transform: transform,
              backgroundColor: "red",
              opacity: "0.5"
            }}
            className="overlay"
          > */}
        </Page>
      </Document>
    </div>
  );
}

function Mousey(props) {
  const {
    point: { x, y }
  } = props;
  console.log(x, y, "   moooo");
  return <div>{x}</div>;
}

function InputBox(props) {
  const [quoteText, setQuoteText] = useState("");

  useEffect(() => {
    const { quoteText } = props;
    setQuoteText(quoteText);
  }, []);

  const { coords = [] } = props;
  console.log(coords);
  return (
    <div
      className="input-box"
      style={{
        position: "absolute",
        width: "30vw",
        top: `${coords[1]}px`,
        left: `${coords[0]}px`,
        background: "rgba(120,180,255,0.8)",
        border: "blue solid 1px",
        borderRadius: "0.2rem",
        padding: "0.4rem"
      }}
    >
      <div className="quote" style={{ background: "white" }}>
        <div style={{ fontSize: "0.6rem" }}>QUOTE</div>
        {quoteText}
      </div>
    </div>
  );
}

export default App;
