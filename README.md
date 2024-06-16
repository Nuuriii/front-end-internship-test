# Test Front End Developer Internship di PT. Langgeng Inovasi Teknologi (LANGIT)

Halaman Web sederhana menggunakan Tailwind CSS dan Reactjs yang mengintegrasikan API dari PokeAPI

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
- **`lib`**: Folder untuk tempat penyimpanan berbagai utilitas, fungsi, atau modul yang digunakan di seluruh aplikasi
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
  const [isError, setIsError] = useState(false);

  const getPokemon = async () => {
    setLoading(true);
    try {
      const { data: getData } = await axios(
        `https://pokeapi.co/api/v2/pokemon?limit=20`
      );
      setListPokemon(getData.results);
      setLoading(false);
      setIsError(false);
    } catch (error) {
      setIsError(true);
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
      ) : isError ? (
        <h1>Gagal Mengambil daftar pokemon</h1>
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
const [isError, setIsError] = useState(false);
```

- `listPokemon` : State untuk menyimpan daftar Pokemon yang berhasil diambil dari API.
- `loading` : State yang menunjukkan apakah aplikasi sedang dalam proses memuat data, dimulai dengan nilai awal false.
- `isError`: State yang menunjukkan apakah terjadi kesalahan selama proses pengambilan data, dimulai dengan nilai awal false.

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
    setIsError(false);
  } catch (error) {
    setIsError(true);
    setLoading(false);
    console.log(error);
  }
};
```

- `setLoading(true)`: Mengatur state loading menjadi true saat permintaan dimulai untuk menunjukkan jika pengambilan data dari api baru berjalan.
- `try`: Blok yang mencoba mengirim permintaan GET ke URL API https://pokeapi.co/api/v2/pokemon?limit=20 menggunakan axios.
- `await axios(...)`: Menunggu hasil dari permintaan HTTP.
- `const { data: getData } = await axios(...)`: Destructuring untuk mengambil properti data dari respons API dan menamainya getData.
- `setListPokemon(getData.results)`: Mengubah nilai state `listPokemon` dengan daftar Pokemon yang diterima dari API.
- `setLoading(false)`: Mengubah nilai state `loading` menjadi false setelah data berhasil dimuat.
- `setIsError(false)`: Mengubah nilai state `isError` menjadi false jika data berhasil dimuat tanpa kesalahan.
- `catch (error)`: Menangkap kesalahan yang terjadi selama permintaan.
- `setIsError(true)`: Mengubah nilai state `isError` menjadi true jika terjadi kesalahan.
- `setLoading(false)`: Mengubah nilai state `loading` menjadi false jika terjadi kesalahan.
- `console.log(error)`: Mencetak kesalahan ke konsol.

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
    ) : isError ? (
      <h1>Gagal Mengambil daftar pokemon</h1>
    ) : (
      <ul>
        {listPokemon?.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    )}
  </div>
);
```

- Dalam return, komponen merender sebuah `<div>`.
- Menggunakan ternary operator untuk menentukan apa yang harus dirender berdasarkan state `loading` dan `isError`.
- Jika state `loading` bernilai true, teks "Loading..." ditampilkan.
- Jika state `isError` bernilai true, teks "Gagal Mengambil daftar pokemon" ditampilkan.
- Jika state `loading` dan `isError` bernilai false, sebuah `<ul>` dirender yang berisi daftar nama Pokemon.
- `listPokemon?.map((item, index) => ( ... ))` Iterasi melalui array listPokemon dan menampilkan nama setiap Pokemon sebagai `<li>`
- Menambahkan properti `key` yang unik untuk setiap item dalam state `listPokemon` agar React dapat melakukan pembaruan DOM dengan lebih efisien karena `key` memberikan identitas unik untuk setiap item dalam state `listPokemon`. Ini memungkinkan React untuk meminimalkan perubahan yang diperlukan di DOM.
