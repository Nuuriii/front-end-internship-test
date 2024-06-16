# Test Front End Developer Internship di PT. Langgeng Inovasi Teknologi (LANGIT)

## Setup Pengembangan Local

```sh
# Install semua dependensi
npm install

# Jalankan server
npm run dev
```

## Struktur Folder

### `src/` (Root Folder)

- **`assets`**: Folder yang digunakan untuk menyimpan assets seperti icon dan gambar.
- **`components`**: Terdapat dua folder didalamnya. Folder `element` berisi Komponen yang berfungsi untuk mengatur struktur dan tata letak website, dan untuk Folder `ui` berisi komponen - komponen kecil yang bersifat reusable.
- **`app.jsx`**: Komponen utama yang digunakan untuk mengatur tata letak website.
- **`index.css`**: File CSS untuk mendefinisikan gaya global (termasuk import Tailwind CSS).
- **`main.jsx`**: Entry point aplikasi yang merender komponen `App` ke dalam DOM.

## Integrasi API

- Menggunakan Library Axios agar fetching data lebih mudah.
- Menggunakan Asynchronous Function agar function yang digunakan untuk mangambil data bisa lebih mudah untuk dipahami.
- Menggunakan `try`/`catch` agar penanganan error saat mengambil data bisa lebih mudah.

## Implementasi Saat Menggunakan API PokeAPI

Implementasi penggunaan API PokeAPI di React Komponen

```jsx
import { useState, useEffect } from "react";
import axios from "axios";

export function ListPokemon() {
  const [listPokemon, setListPokemon] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPokemon = async () => {
    setLoading(true);
    try {
      const { data: getData } = await axios(
        `https://pokeapi.co/api/v2/pokemon?limit=20`
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
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading. . .</h1>
      ) : (
        <ul>
          {listPokemon?.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### 1. Import depedensi yang diperlukan

```jsx
import { useState, useEffect } from "react";
import axios from "axios";
```

- useState dan useEffect diimpor dari React Hooks untuk mengelola state komponen dan efek samping.
- axios diimpor untuk melakukan permintaan HTTP ke API PokeAPI.

### 2. Deklarasi Komponen

```jsx
export function ListPokemon()
```

- Deklarasi komponen ListPokemon sebagai sebuah function Komponen.

### 3. Inisialisasi State

```jsx
const [listPokemon, setListPokemon] = useState([]);
const [loading, setLoading] = useState(false);
```

- `listPokemon` : State untuk menyimpan daftar Pokemon yang berhasil diambil dari API.
- `loading` : State untuk mengecek apakah sedang dalam proses mengambil data dari API atau tidak.

### 4. Fungsi untuk mendapatkan Daftar Pokemon

```jsx
const getPokemon = async () => {
  setLoading(true);
  try {
    const { data: getData } = await axios(
      `https://pokeapi.co/api/v2/pokemon?limit=20`
    );
    setListPokemon(getData.results);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};
```

- `getPokemon` : Fungsi asynchronous yang menggunakan axios untuk mengirim permintaan GET ke API PokeAPI dengan parameter limitnya 20.
- Mengubah nilai dari state `loading` ke true agar bisa mendeteksi jika proses pengambilan data dari API baru berjalan.
- Dalam blok `try`, daftar pokemon dari API diambil dan disimpan dalam state `listPokemon` dengan menggunakan kode `setListPokemon(getData.results)`.
- Setelah daftar pokemon dari API berhasil disimpan ke state, nilai dari state `loading` diubah ke false, sehingga menandakan kalau pengambilan daftar pokemon dari api telah selesai dan berhasil disimpan.
- Dalam blok `catch`, jika terjadi kesalahan saat melakukan pengambilan daftar pokemon, `setLoading(false)` tetap dipanggil untuk menghentikan loading, dan kesalahan dicetak ke konsol dengan `console.log(error)`.

### 4. UseEffect Hook

```jsx
useEffect(() => {
  getPokemon();
}, []);
```

- useEffect: Hook yang menjalankan fungsi getPokemon saat komponen pertama kali dirender (mounting).
- []: Array dependensi kosong memastikan bahwa getPokemon hanya dipanggil sekali saat komponen pertama kali dimuat.

### 4. Return Komponen

```jsx
  return (
    <div>
      {loading ? (
        <h1>Loading. . .</h1>
      ) : (
        <ul>
          {listPokemon?.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

```

- Dalam return, komponen merender sebuah `<div>`.
- Ternary operator digunakan untuk merender teks `"Loading..."` jika `loading` bernilai true.
- Jika `loading` bernilai false, sebuah `<ul>` dirender yang berisi daftar nama Pokemon.
- `listPokemon?.map((item, index) => ( ... ))` Iterasi melalui array listPokemon dan menampilkan nama setiap Pokemon sebagai `<li>`.
