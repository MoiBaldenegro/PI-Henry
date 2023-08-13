import { connect } from "react-redux";
import Card from "../card/card";
import { useUserContext } from "../../UserContext";

const Favorites = ({ myfavorites }) => {
  const { userid } = useUserContext();

  const userFavorites = myfavorites.filter(
    (favorite) => favorite.userid === userid
  );

  return (
    <div className="cards-container">
      <div className="cards">
        {userFavorites?.map(
          ({ id, userid, name, releasedate, rating, platforms, image }) => {
            return (
              <Card
                name={name}
                id={id}
                releasedate={releasedate}
                rating={rating}
                platforms={platforms}
                image={image}
                userid={userid}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    myfavorites: state.myfavorites,
  };
};

export default connect(mapStateToProps)(Favorites);
