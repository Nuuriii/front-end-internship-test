import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./index";
import DefaultImg from "@/assets/defaultImg.svg";
import axios from "axios";
import { LuShield, LuHeart, LuSword, LuChevronsUp } from "react-icons/lu";
import { BsFire } from "react-icons/bs";
import {
  GiFeatheredWing,
  GiHighGrass,
  GiPoisonGas,
  GiStoneSphere,
  GiPunchBlast,
  GiEarthCrack,
  GiChestArmor,
  GiWaterDrop,
  GiElectric,
  GiPsychicWaves,
  GiSpikedDragonHead,
  GiFairyWand,
  GiCircle,
} from "react-icons/gi";
import { PiStarFour } from "react-icons/pi";
import { IoBugOutline } from "react-icons/io5";
import { FaGhost } from "react-icons/fa";
import { IoIosSnow } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";

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
      <DialogContent className="w-[300px] rounded-md">
        <div className="flex flex-col items-center">
          <div className="w-full flex items-center justify-start gap-2">
            <div className="flex items-center gap-1">
              <PiStarFour size={20} />
              <p>{pokemonData?.base_experience}</p>
            </div>
            <h1 className="font-semibold text-[20px]">{name}</h1>
          </div>
          <img
            height={0}
            width={0}
            sizes="100vw"
            className={`${backgroundImgColor(
              pokemonData?.types[0].type.name
            )} my-[10px] rounded-sm border-[1px] border-solid border-neutral-600 h-[250px] w-[250px]`}
            src={imgUrl}
            alt=""
          />
          <div className="flex gap-[5px] items-center">
            {pokemonData?.types.map((item, index) => (
              <div
                className={`outline outline-[1px] ${outlineColor(
                  item.type.name
                )} flex items-center gap-1 py-[2px] px-[6px] rounded-sm`}
                key={index}
              >
                {typeIcon(`${item.type.name}`)}
              </div>
            ))}
          </div>

          <div className="mt-[20px] grid grid-cols-2 gap-3">
            <p className="flex border-[1.5px] border-solid border-neutral-600 py-[3px] rounded-sm px-[20px] items-center gap-1">
              <LuHeart size={18} />
              <span className="text-[16px]">
                {pokemonData?.stats[0].base_stat}
              </span>
            </p>
            <p className="flex border-[1.5px] border-solid border-neutral-600 py-[3px] rounded-sm px-[20px] items-center gap-1">
              <LuSword size={18} />
              <span className="text-[16px]">
                {pokemonData?.stats[1].base_stat}
              </span>
            </p>
            <p className="flex border-[1.5px] border-solid border-neutral-600 py-[3px] rounded-sm px-[20px] items-center gap-1">
              <LuShield size={18} />
              <span className="text-[16px]">
                {pokemonData?.stats[2].base_stat}
              </span>
            </p>
            <p className="flex border-[1.5px] border-solid border-neutral-600 py-[3px] rounded-sm px-[20px] items-center gap-1">
              <LuChevronsUp size={18} />{" "}
              <span className="text-[16px]">
                {pokemonData?.stats[5].base_stat}
              </span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function outlineColor(type) {
  switch (type) {
    case "fire":
      return "outline-orange-500";
    case "flying":
      return "outline-purple-600";
    case "grass":
      return "outline-green-600";
    case "poison":
      return "outline-fuchsia-800";
    case "fighting":
      return "outline-red-500";
    case "ground":
      return "outline-yellow-900";
    case "rock":
      return "outline-stone-500";
    case "bug":
      return "outline-amber-500";
    case "water":
      return "outline-blue-500";
    case "normal":
      return "outline-neutral-600";
    case "ghost":
      return "outline-indigo-500";
    case "electric":
      return "outline-yellow-500";
    case "psychic":
      return "outline-pink-700";
    case "ice":
      return "outline-cyan-400";
    case "dragon":
      return "outline-violet-500";
    case "fairy":
      return "outline-pink-400";
    case "dark":
      return "outline-zinc-900";
    case "steel":
      return "outline-slate-500";
    default:
      break;
  }
}

function backgroundImgColor(type) {
  switch (type) {
    case "fire":
      return "bg-orange-100";
    case "flying":
      return "bg-purple-100";
    case "grass":
      return "bg-green-100";
    case "poison":
      return "bg-fuchsia-100";
    case "fighting":
      return "bg-red-100";
    case "ground":
      return "bg-[#D8D5C7]";
    case "rock":
      return "bg-stone-200";
    case "bug":
      return "bg-amber-100";
    case "water":
      return "bg-blue-100";
    case "normal":
      return "bg-neutral-200";
    case "ghost":
      return "bg-indigo-200";
    case "electric":
      return "bg-yellow-100";
    case "psychic":
      return "bg-[#DCC6DB]";
    case "ice":
      return "bg-cyan-100";
    case "dragon":
      return "bg-violet-100";
    case "fairy":
      return "bg-pink-100";
    case "dark":
      return "bg-zinc-300";
    case "steel":
      return "bg-slate-200";
    default:
      break;
  }
}

function typeIcon(type) {
  switch (type) {
    case "fire":
      return (
        <>
          <BsFire size={12} className="text-orange-500" />
          <span className="font-semibold text-orange-500 text-[13px]">
            Fire
          </span>
        </>
      );
    case "flying":
      return (
        <>
          <GiFeatheredWing size={12} className="text-purple-500" />
          <span className="font-semibold text-purple-500 text-[13px]">
            Flying
          </span>
        </>
      );
    case "grass":
      return (
        <>
          <GiHighGrass size={12} className="text-green-600" />
          <span className="font-semibold text-green-600 text-[13px]">
            Grass
          </span>
        </>
      );
    case "poison":
      return (
        <>
          <GiPoisonGas size={16} className="text-fuchsia-800" />
          <span className="font-semibold text-fuchsia-800 text-[13px]">
            Poison
          </span>
        </>
      );
    case "fighting":
      return (
        <>
          <GiPunchBlast size={16} className="text-red-500" />
          <span className="font-semibold text-red-500 text-[13px]">
            Fighting
          </span>
        </>
      );
    case "ground":
      return (
        <>
          <GiEarthCrack size={16} className="text-yellow-900" />
          <span className="font-semibold text-yellow-900 text-[13px]">
            Ground
          </span>
        </>
      );
    case "rock":
      return (
        <>
          <GiStoneSphere size={16} className="text-stone-500" />
          <span className="font-semibold text-stone-500 text-[13px]">Rock</span>
        </>
      );
    case "bug":
      return (
        <>
          <IoBugOutline size={16} className="text-amber-500" />
          <span className="font-semibold text-amber-500 text-[13px]">Bug</span>
        </>
      );
    case "water":
      return (
        <>
          <GiWaterDrop size={16} className="text-blue-500" />
          <span className="font-semibold text-blue-500 text-[13px]">Water</span>
        </>
      );
    case "normal":
      return (
        <>
          <GiCircle size={16} className="text-neutral-600" />
          <span className="font-semibold text-neutral-600 text-[13px]">
            Normal
          </span>
        </>
      );
    case "ghost":
      return (
        <>
          <FaGhost size={16} className="text-indigo-500" />
          <span className="font-semibold text-indigo-500 text-[13px]">
            Ghost
          </span>
        </>
      );
    case "electric":
      return (
        <>
          <GiElectric size={16} className="text-yellow-500" />
          <span className="font-semibold text-yellow-500 text-[13px]">
            Electric
          </span>
        </>
      );
    case "psychic":
      return (
        <>
          <GiPsychicWaves size={16} className="text-pink-700" />
          <span className="font-semibold text-pink-700 text-[13px]">
            Psychic
          </span>
        </>
      );
    case "ice":
      return (
        <>
          <IoIosSnow size={16} className="text-cyan-400" />
          <span className="font-semibold text-cyan-400 text-[13px]">Ice</span>
        </>
      );
    case "dragon":
      return (
        <>
          <GiSpikedDragonHead size={16} className="text-violet-500" />
          <span className="font-semibold text-violet-500 text-[13px]">
            Dragon
          </span>
        </>
      );
    case "fairy":
      return (
        <>
          <GiFairyWand size={16} className="text-pink-400" />
          <span className="font-semibold text-pink-400 text-[13px]">Fairy</span>
        </>
      );
    case "dark":
      return (
        <>
          <MdDarkMode size={16} className="text-zinc-900" />
          <span className="font-semibold text-zinc-900 text-[13px]">Dark</span>
        </>
      );
    case "steel":
      return (
        <>
          <GiChestArmor size={16} className="text-slate-500" />
          <span className="font-semibold text-slate-500 text-[13px]">
            Steel
          </span>
        </>
      );
    default:
      break;
  }
}
