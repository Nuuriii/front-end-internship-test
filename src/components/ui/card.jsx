import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./index";
import DefaultImg from "@/assets/defaultImg.svg";
import axios from "axios";

export function Card({ name, imgUrl }) {
  const [openModal, setOpenModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [pokemonData, setPokemonData] = useState();

  const getDetailPokemon = async () => {
    try {
      const { data: pokemonDetail } = await axios(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      setPokemonData(pokemonDetail);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (openModal) {
      getDetailPokemon();
    }
  }, [openModal]);

  console.log(pokemonData);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger className="w-full h-full flex flex-col items-center py-[30px]">
        <div>
          <img
            className={`h-[90px] w-[90px] sm3:h-[120px] sm3:w-[120px] ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } transition-all duration-500`}
            src={imageLoaded ? imgUrl : DefaultImg}
            alt=""
            onLoad={() => setImageLoaded(true)}
          />
          <span>{name}</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <div>
          <h1>{name}</h1>
          <img className="h-[180px] w-[180px]" src={imgUrl} alt="" />
          <p>Exp: {pokemonData?.base_experience}</p>
          <p>
            Type:{" "}
            {pokemonData?.types.map((item, index) => (
              <span key={index}>
                {item.type.name} {"   "}
              </span>
            ))}
          </p>
          <p>Hp: {pokemonData?.stats[0].base_stat}</p>
          <p>Attack: {pokemonData?.stats[1].base_stat}</p>
          <p>Defense: {pokemonData?.stats[2].base_stat}</p>
          <p>Speed: {pokemonData?.stats[5].base_stat}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
