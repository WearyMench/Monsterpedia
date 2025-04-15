"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddMonsterDialog } from "@/components/add-monster-dialog";
import { EditMonsterDialog } from "@/components/edit-monster-dialog";
import { DeleteMonsterDialog } from "@/components/delete-monster-dialog";
import { MonsterDetailDialog } from "@/components/monster-detail-dialog";
import { useState, useEffect } from 'react';
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";

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
    },
  {
    id: "3",
    name: "Ogre",
    photo: "https://picsum.photos/200/300",
    description: "A big and ugly creature."
  },
  {
    id: "4",
    name: "Troll",
    photo: "https://picsum.photos/200/300",
    description: "A very big and ugly creature."
  },
  {
    id: "5",
    name: "Sprite",
    photo: "https://picsum.photos/200/300",
    description: "A small fairy."
  },
  {
    id: "6",
    name: "Gorgon",
    photo: "https://picsum.photos/200/300",
    description: "A snake-haired monster."
  },
  {
    id: "7",
    name: "Centaur",
    photo: "https://picsum.photos/200/300",
    description: "A half-man, half-horse creature."
  },
  {
    id: "8",
    name: "Harpy",
    photo: "https://picsum.photos/200/300",
    description: "A bird-woman creature."
  },
  {
    id: "9",
    name: "Phoenix",
    photo: "https://picsum.photos/200/300",
    description: "A fire bird creature."
  },
  {
    id: "10",
    name: "Basilisk",
    photo: "https://picsum.photos/200/300",
    description: "A snake creature."
  },
  {
    id: "11",
    name: "Hydra",
    photo: "https://picsum.photos/200/300",
    description: "A multi-headed serpent."
  },
  {
    id: "12",
    name: "Cerberus",
    photo: "https://picsum.photos/200/300",
    description: "A multi-headed dog."
  }
];

const PAGE_SIZE = 8;

export default function Home() {
    const [monsters, setMonsters] = useState<Monster[]>([]);
    const [addMonsterOpen, setAddMonsterOpen] = useState(false);
    const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
    const [editMonsterOpen, setEditMonsterOpen] = useState(false);
    const [deleteMonsterOpen, setDeleteMonsterOpen] = useState(false);
    const [monsterDetailOpen, setMonsterDetailOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMonsters, setFilteredMonsters] = useState<Monster[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(filteredMonsters.length / PAGE_SIZE);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const pagedMonsters = filteredMonsters.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );


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

    useEffect(() => {
        // Filter monsters based on search term
        const results = monsters.filter(monster =>
            monster.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMonsters(results);
        setCurrentPage(1); // Reset to first page on search
    }, [searchTerm, monsters]);


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
                <div className="flex gap-2 items-center">
                  <Button onClick={() => setAddMonsterOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Monster
                  </Button>
                  <ThemeToggle />
                </div>
            </div>

            {/* Search Input */}
            <Input
                type="text"
                placeholder="Search monsters..."
                className="mb-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {pagedMonsters.map((monster) => (
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

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-4 gap-2">
                    <Button
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Previous
                    </Button>
                    <span>{currentPage} / {totalPages}</span>
                    <Button
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                        <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )}

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
