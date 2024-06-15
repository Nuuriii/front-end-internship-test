import axios from "axios";
import { Card, Button } from "../ui/index";
import { useState, useEffect } from "react";

export function ListCard() {
  const [limit, setLimit] = useState(20);
  const [listPokemon, setListPokemon] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPokemon = async () => {
    try {
      const { data: getData } = await axios(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
      );
      setListPokemon(getData.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getPokemon();
  }, [limit]);

  const handleLoadMore = () => {
    setLoading(true);
    setLimit((prevLimit) => prevLimit + 10);
  };

  return (
    <div className="py-[30px]">
      <h1>Pokedex</h1>
      <ul className="grid sm2:grid-cols-2 sm4:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-items-center gap-9">
        {listPokemon?.map((item, index) => (
          <li
            className="w-full sm1:w-[220px] sm2:w-[150px] sm3:w-[184px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md p-0 hover:bg-neutral-100 hover:scale-110 transition-all duration-200"
            key={index}
          >
            <Card
              name={item.name}
              imgUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                index + 1
              }.png`}
            />
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-[30px]">
        <Button disabled={loading} onClick={handleLoadMore}>
          {loading ? "Loading. . ." : "Load More"}
        </Button>
      </div>
    </div>
  );
}
