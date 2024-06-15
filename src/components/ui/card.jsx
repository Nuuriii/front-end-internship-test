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

  const getDetailPokemon = async () => {
    try {
      const { data: pokemonDetail } = await axios(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (openModal) {
      getDetailPokemon();
    }
  }, [openModal]);

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
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
