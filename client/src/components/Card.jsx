import { useEffect } from "react";
import style from "../styles/Card.module.css";

import { Link } from "react-router-dom";
import { useState } from "react";

import { connect } from "react-redux";
import { addFav, removeFav } from "../redux/actions";

function Card({ char, onClose, myFavorites, removeFav, addFav, inFav }) {
  // obj
  const [isFav, setIsFav] = useState(false);
  console.log(":::::::", myFavorites);
  const { id, name, gender, species, origin, image, status } = char;
  const handleFavorite = function () {
    if (isFav) {
      setIsFav(false);
      // despachar remove
      removeFav(id);
    } else {
      setIsFav(true);
      // despachar addFav
      addFav(char);
    }
  };


  useEffect(() => {
    myFavorites.forEach((fav) => {
      if (fav.id === id) {
        setIsFav(true);
      }
    });
  }, [myFavorites]);

  return (
    <div className={style.card}>
      <div className={style.close}>
        {isFav ? (
          <button onClick={handleFavorite}>❤️</button>
        ) : (
          <button onClick={handleFavorite}>🤍</button>
        )}
        {inFav ? null : <button onClick={() => onClose(id)}>X</button>}
      </div>
      <div className={style.info}>
        <Link className={style.link} to={`/detail/${id}`}>
          <h2>{name.slice(0, 16)}</h2>
          {/* <h2>{status}</h2> */}
          <h2>{species}</h2>
          {/* <h2>{gender}</h2>
         <h2>{origin?.name}</h2> */}
          <img src={image} alt={name} />
        </Link>
      </div>
    </div>
  );
}
// namePepe: nombre.
// status: status.
// species: especie.
// gender: género.
// origin: origen (ten en cuenta que el nombre del origen viene dentro de otra propiedad llamada name).
// image: imagen.

function mapState(state) {
  return {
    myFavorites: state.myFavorites,
  };
}
function mapDispatch(dispatch) {
  return {
    addFav: function (char) {
      dispatch(addFav(char));
    },
    removeFav: function (id) {
      dispatch(removeFav(id));
    },
  };
}

export default connect(mapState, mapDispatch)(Card);

//* Redux -> invoca mapState(state) <- le pasa el state y crea props en Card
//* con lo que retorna el mapState

// export default connect(mapState, {addFav,removeFav})(Card)
