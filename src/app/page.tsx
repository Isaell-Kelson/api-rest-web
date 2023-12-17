"use client";

import React, { useState, useEffect } from "react";
import { api } from "../services/api";

interface Developer {
  id: number;
  name: string;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [devs, setDevs] = useState<Developer[]>([]);

  useEffect(() => {
    LoadDevs();
  }, []);

  async function LoadDevs() {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const response = await api.get("http://localhost:3333/developers");
      setDevs(response.data);
    } catch (error) {
      alert("Erro ao carregar os devs");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddDev() {
    const data = { name: textInput };

    try {
      const response = await api.post("http://localhost:3333/developers", data);
      LoadDevs();
      console.log("Dev cadastrado com sucesso", response);
    } catch (error) {
      alert("Erro ao cadastrar o dev");
    }
  }

  return (
    <main>
      <div>
        <h1>Developers</h1>
        <ul>
          {devs.map((dev) => (
            <li key={dev.id}>{dev.name}</li>
          ))}
        </ul>
        <input          
          onChange={(e) => setTextInput(e.target.value)}
        />
        <button onClick={handleAddDev}>Adicionar</button>
      </div>
      {loading && <p>Carregando...</p>}
    </main>
  );
}
