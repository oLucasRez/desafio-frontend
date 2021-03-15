//---------------------------------------------------------------< interfaces >
import IStock from "../../interfaces/IStock";
//---------------------------------------------------------------< components >
import {
  AiFillStar as FillStarIcon,
  AiOutlineStar as OutlineStarIcon,
} from "react-icons/ai";
import Graph from "./Graph";
//--------------------------------------------------------------------< hooks >
import { useMemo } from "react";
//--------------------------------------------------------------------< redux >
import { addFavorite, removeFavorite } from "../../store/favorite/actions";
//-------------------------------------------------------------------< styles >
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
//--------------------------------------------------------------------< types >
import { RootState } from "../../store";
type StockProps = {
  stock: IStock;
};
//================================================================[ < Stock > ]
export default function Stock({ stock }: StockProps) {
  //-------------------------------------------------------------< properties >
  const favorite = useSelector((state: RootState) => state.favorite);
  const dispatch = useDispatch();
  //---------------------------------------------------------------------------
  const isFavorite = useMemo(() => favorite.stocks.includes(stock), [
    favorite,
    stock,
  ]);
  //----------------------------------------------------------------< methods >
  function onFavorite() {
    dispatch(addFavorite(stock));
  }

  function onUnfavorite() {
    dispatch(removeFavorite(stock));
  }
  //-----------------------------------------------------------------< return >
  return (
    <li className="stock-container">
      <header>
        <h1>
          {stock.stock}
          <p>{stock.company}</p>
        </h1>
        {isFavorite ? (
          <FillStarIcon onClick={onUnfavorite} />
        ) : (
          <OutlineStarIcon onClick={onFavorite} />
        )}
      </header>
      <Graph chart={stock.chart} />
      <footer>
        <h3>R$ {stock.price.toFixed(2)}</h3>
        <span className={stock.variation >= 0 ? "increase" : "decrease"}>
          R$ {stock.variation.toFixed(2)}
        </span>
      </footer>
    </li>
  );
}
