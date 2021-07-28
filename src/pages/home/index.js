import React, { useState } from "react";
import "./index.css";

// Data
// import Gif from '../../data/gif'
// import Gifs from '../../data/gifs'

// Components
import SearchBar from "../../components/search-bar";
import ListItem from "../../components/list-item";
// import ChildrenItem from '../../components/children-item'

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getImageGifs } from "../../slices/giphy-slices";

const index = () => {
  const dispatch = useDispatch();
  const Gifs = useSelector((state) => state.giphy.value);
  // const Gifs = [];
  console.log(Gifs);
  const [input, setInput] = useState("");

  const handleChange = (e) => setInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    getGifs();
  };

  const getGifs = async () => {
    const api_key = process.env.REACT_APP_GIPHY_KEY;
    const q = input;
    const limit = 12;
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${q}&limit=${limit}`;

    const dataGif = await fetch(endpoint).then((res) => res.json());
    dispatch(getImageGifs(dataGif.data));
  };

  const listGifs = Gifs.map(
    (gif) =>
      gif.rating == "g" && (
        <ListItem
          key={gif.id}
          url={gif.images.original.url}
          alt={gif.title}
          rating={gif.rating}
        />
      )
  );

  return (
    <>
      <SearchBar
        input={input}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      {/* {listGifs} */}

      <div className="list">
        {/* {Gifs.filter((gif) => gif.rating === 'g').map((gif) => {
                    return(
                        <ListItem key={gif.id} url={gif.url} alt={gif.title} rating={gif.rating} />
                    )
                })} */}

        {listGifs}
      </div>

      {/* <ChildrenItem color="blue">
        <h1>Contoh Children</h1>
        <p>Tes</p>
    </ChildrenItem> */}
    </>
  );
};

export default index;
