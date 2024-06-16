import axios from "axios";
import { Card, Button } from "../ui";
import { useState, useEffect } from "react";

export function ListCard() {
  const [limit, setLimit] = useState(20);
  const [listPokemon, setListPokemon] = useState([]);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState({
    firstLoadLoading: false,
    loadMoreLoading: false,
  });

  const getPokemon = async () => {
    setLoading({
      firstLoadLoading: true,
      loadMoreLoading: listPokemon.length > 0,
    });
    try {
      const { data: getData } = await axios(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
      );
      setListPokemon(getData.results);
      setLoading({
        firstLoadLoading: false,
        loadMoreLoading: false,
      });
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setLoading({
        firstLoadLoading: false,
        loadMoreLoading: false,
      });
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
      {loading.firstLoadLoading ? (
        <h1 className="text-center">Loading. . .</h1>
      ) : isError ? (
        <h1 className="text-center">Gagal mengambil daftar Pokemon</h1>
      ) : (
        <>
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
            <Button disabled={loading.loadMoreLoading} onClick={handleLoadMore}>
              {loading.loadMoreLoading ? "Loading. . ." : "Load More"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
