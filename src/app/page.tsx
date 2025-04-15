"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddMonsterDialog } from "@/components/add-monster-dialog";
import { EditMonsterDialog } from "@/components/edit-monster-dialog";
import { DeleteMonsterDialog } from "@/components/delete-monster-dialog";
import { MonsterDetailDialog } from "@/components/monster-detail-dialog";
import { useState, useEffect } from 'react';
import { Plus } from "lucide-react";

interface Monster {
  id: string;
  name: string;
  photo: string;
  description: string;
}

const initialMonsters: Monster[] = [
  {
    id: "1",
    name: "Goblin",
    photo: "https://picsum.photos/200/300",
    description: "A small, mischievous creature."
  },
  {
    id: "2",
    name: "Dragon",
    photo: "https://picsum.photos/200/300",
    description: "A large, fire-breathing reptile."
  }
];

export default function Home() {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [addMonsterOpen, setAddMonsterOpen] = useState(false);
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
  const [editMonsterOpen, setEditMonsterOpen] = useState(false);
  const [deleteMonsterOpen, setDeleteMonsterOpen] = useState(false);
    const [monsterDetailOpen, setMonsterDetailOpen] = useState(false);


    useEffect(() => {
        // Load initial monsters from local storage or initial data
        const storedMonsters = localStorage.getItem('monsters');
        if (storedMonsters) {
            setMonsters(JSON.parse(storedMonsters));
        } else {
            setMonsters(initialMonsters);
            localStorage.setItem('monsters', JSON.stringify(initialMonsters));
        }
    }, []);

    useEffect(() => {
        // Save monsters to local storage whenever the list changes
        localStorage.setItem('monsters', JSON.stringify(monsters));
    }, [monsters]);


  const handleAddMonster = (newMonster: Omit<Monster, 'id'>) => {
    const monsterToAdd = { ...newMonster, id: crypto.randomUUID() };
    setMonsters([...monsters, monsterToAdd]);
    setAddMonsterOpen(false);
  };

  const handleEditMonster = (updatedMonster: Monster) => {
    setMonsters(
      monsters.map((monster) =>
        monster.id === updatedMonster.id ? updatedMonster : monster
      )
    );
    setEditMonsterOpen(false);
  };

  const handleDeleteMonster = () => {
    if (selectedMonster) {
      setMonsters(monsters.filter((monster) => monster.id !== selectedMonster.id));
      setDeleteMonsterOpen(false);
      setSelectedMonster(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Monsterpedia</h1>
        <Button onClick={() => setAddMonsterOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Monster
        </Button>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {monsters.map((monster) => (
          <Card
            key={monster.id}
            className="hover:shadow-md transition-shadow duration-200"
          >
            <CardHeader>
              <CardTitle>{monster.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <img
                src={monster.photo}
                alt={monster.name}
                className="rounded-md mb-2 w-full h-48 object-cover"
              />
              <CardDescription>{monster.description}</CardDescription>
            </CardContent>
            <div className="flex justify-between items-center p-4">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setSelectedMonster(monster);
                  setMonsterDetailOpen(true);
                }}
              >
                Details
              </Button>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedMonster(monster);
                    setEditMonsterOpen(true);
                  }}
                  className="bg-accent text-accent-foreground hover:bg-accent/80"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    setSelectedMonster(monster);
                    setDeleteMonsterOpen(true);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AddMonsterDialog
        open={addMonsterOpen}
        onOpenChange={setAddMonsterOpen}
        onAddMonster={handleAddMonster}
      />

      {selectedMonster && (
        <EditMonsterDialog
          open={editMonsterOpen}
          onOpenChange={setEditMonsterOpen}
          monster={selectedMonster}
          onEditMonster={handleEditMonster}
        />
      )}

      {selectedMonster && (
        <DeleteMonsterDialog
          open={deleteMonsterOpen}
          onOpenChange={setDeleteMonsterOpen}
          monsterName={selectedMonster.name}
          onDeleteMonster={handleDeleteMonster}
        />
      )}

            {selectedMonster && (
                <MonsterDetailDialog
                    open={monsterDetailOpen}
                    onOpenChange={setMonsterDetailOpen}
                    monster={selectedMonster}
                />
            )}
    </div>
  );
}

