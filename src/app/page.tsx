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
import { SignInButton } from "@/components/sign-in-button";
import { useSession } from "next-auth/react";

interface Monster {
    id: string;
    name: string;
    photo: string;
    description: string;
    createdBy?: string;
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
  },
    {
        id: "13",
        name: "Minotaur",
        photo: "https://picsum.photos/200/300",
        description: "A creature with the head of a bull and the body of a man."
    },
    {
        id: "14",
        name: "Siren",
        photo: "https://picsum.photos/200/300",
        description: "A beautiful but dangerous creature that lures sailors with its enchanting voice."
    },
    {
        id: "15",
        name: "Cyclops",
        photo: "https://picsum.photos/200/300",
        description: "A giant with a single eye in the middle of its forehead."
    },
    {
        id: "16",
        name: "Chimera",
        photo: "https://picsum.photos/200/300",
        description: "A fire-breathing monster with the head of a lion, a goat's body, and a serpent's tail."
    },
    {
        id: "17",
        name: "Griffin",
        photo: "https://picsum.photos/200/300",
        description: "A legendary creature with the body, tail, and back legs of a lion; the head and wings of an eagle; and an eagle's talons as its front feet."
    },
    {
        id: "18",
        name: "Hippogriff",
        photo: "https://picsum.photos/200/300",
        description: "A legendary creature with the front half of an eagle and the hind half of a horse."
    },
    {
        id: "19",
        name: "Kraken",
        photo: "https://picsum.photos/200/300",
        description: "A legendary sea monster of giant size and cephalopod appearance."
    },
    {
        id: "20",
        name: "Leviathan",
        photo: "https://picsum.photos/200/300",
        description: "A sea monster referenced in the Bible."
    },
    {
        id: "21",
        name: "Roc",
        photo: "https://picsum.photos/200/300",
        description: "A legendary enormous bird of prey."
    },
    {
        id: "22",
        name: "Thunderbird",
        photo: "https://picsum.photos/200/300",
        description: "A legendary creature in certain North American indigenous cultures' history and culture. It is considered a supernatural being of power and strength."
    },
    {
      id: "23",
      name: "Grendel",
      photo: "https://picsum.photos/200/300",
      description: "A monstrous creature from the epic poem Beowulf."
  },
  {
      id: "24",
      name: "Medusa",
      photo: "https://picsum.photos/200/300",
      description: "A Gorgon with snakes for hair whose gaze could turn men to stone."
  },
  {
      id: "25",
      name: "Banshee",
      photo: "https://picsum.photos/200/300",
      description: "A female spirit in Irish folklore whose wails foretell death."
  },
  {
      id: "26",
      name: "Yeti",
      photo: "https://picsum.photos/200/300",
      description: "A large, ape-like creature said to inhabit the Himalayan region."
  },
  {
      id: "27",
      name: "Vampire",
      photo: "https://picsum.photos/200/300",
      description: "A mythical being who subsists by feeding on the blood of the living."
  },
  {
      id: "28",
      name: "Werewolf",
      photo: "https://picsum.photos/200/300",
      description: "A person who transforms into a wolf-like creature during a full moon."
  },
  {
      id: "29",
      name: "Zombie",
      photo: "https://picsum.photos/200/300",
      description: "A reanimated corpse, often depicted as feeding on human flesh."
  },
  {
      id: "30",
      name: "Mummy",
      photo: "https://picsum.photos/200/300",
      description: "A deceased human or animal whose body has been preserved."
  },
  {
      id: "31",
      name: "Ghoul",
      photo: "https://picsum.photos/200/300",
      description: "A monstrous humanoid creature that feeds on corpses."
  },
  {
      id: "32",
      name: "Imp",
      photo: "https://picsum.photos/200/300",
      description: "A small, mischievous demon or fairy."
  },
  {
    id: "33",
    name: "Salamander",
    photo: "https://picsum.photos/200/300",
    description: "A mythical creature resembling a lizard, believed to live in fire."
  },
  {
    id: "34",
    name: "Gargoyle",
    photo: "https://picsum.photos/200/300",
    description: "A grotesque carved human or animal face or figure projecting from the gutter of a building."
  },
  {
    id: "35",
    name: "Will-o'-the-Wisp",
    photo: "https://picsum.photos/200/300",
    description: "A mysterious light seen by travelers at night, especially over bogs."
  },
  {
    id: "36",
    name: "Baba Yaga",
    photo: "https://picsum.photos/200/300",
    description: "A supernatural being (or one of a trio of sisters with the same name) who appears as a deformed and/or ferocious-looking old woman in Slavic folklore."
  },
  {
    id: "37",
    name: "Leshy",
    photo: "https://picsum.photos/200/300",
    description: "A tutelary deity of the forests in Slavic mythology."
  },
  {
    id: "38",
    name: "Domovoy",
    photo: "https://picsum.photos/200/300",
    description: "A household spirit in Slavic folklore."
  },
  {
    id: "39",
    name: "Vodyanoy",
    photo: "https://picsum.photos/200/300",
    description: "A male water spirit in Slavic mythology."
  },
  {
    id: "40",
    name: "Rusalka",
    photo: "https://picsum.photos/200/300",
    description: "A female water spirit in Slavic mythology."
  },
    {
        id: "41",
        name: "Dryad",
        photo: "https://picsum.photos/200/300",
        description: "A tree nymph or tree spirit in Greek mythology."
    },
    {
        id: "42",
        name: "Satyr",
        photo: "https://picsum.photos/200/300",
        description: "A creature that is part man and part goat."
    },
    {
        id: "43",
        name: "Sphinx",
        photo: "https://picsum.photos/200/300",
        description: "A mythical creature with the head of a human and the body of a lion."
    },
    {
        id: "44",
        name: "Bicorn",
        photo: "https://picsum.photos/200/300",
        description: "A mythical creature similar to a unicorn, but with two horns."
    },
    {
        id: "45",
        name: "Questing Beast",
        photo: "https://picsum.photos/200/300",
        description: "A monster from Arthurian legend with the head and neck of a serpent, the body of a leopard, the haunches of a lion, and the feet of a hart."
    },
    {
        id: "46",
        name: "Kelpie",
        photo: "https://picsum.photos/200/300",
        description: "A shape-shifting water spirit inhabiting the lochs and pools of Scotland."
    },
    {
        id: "47",
        name: "Manticore",
        photo: "https://picsum.photos/200/300",
        description: "A Persian legendary creature similar to the Egyptian sphinx. It has the body of a red lion, a human head with three rows of sharp teeth, and a trumpet-like voice."
    },
    {
        id: "48",
        name: "Pegasus",
        photo: "https://picsum.photos/200/300",
        description: "One of the best known creatures in Greek mythology. He is a winged divine stallion usually depicted as pure white."
    },
    {
        id: "49",
        name: "Wyvern",
        photo: "https://picsum.photos/200/300",
        description: "A dragon-like creature with two legs and a barbed tail."
    },
    {
        id: "50",
        name: "Amarok",
        photo: "https://picsum.photos/200/300",
        description: "A giant wolf in Inuit mythology, said to hunt anyone foolish enough to venture out alone at night."
    }
];

const PAGE_SIZE = 8;

export default function Home() {
    const [monsters, setMonsters] = useState<Monster[]>(initialMonsters);
    const [addMonsterOpen, setAddMonsterOpen] = useState(false);
    const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
    const [editMonsterOpen, setEditMonsterOpen] = useState(false);
    const [deleteMonsterOpen, setDeleteMonsterOpen] = useState(false);
    const [monsterDetailOpen, setMonsterDetailOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMonsters, setFilteredMonsters] = useState<Monster[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { data: session } = useSession();

    const totalPages = Math.ceil(filteredMonsters.length / PAGE_SIZE);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const pagedMonsters = filteredMonsters.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );


    useEffect(() => {
        // Filter monsters based on search term
        const results = monsters.filter(monster =>
            monster.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMonsters(results);
        setCurrentPage(1); // Reset to first page on search
    }, [searchTerm, monsters]);


    const handleAddMonster = (newMonster: Omit<Monster, 'id'>) => {
        const monsterToAdd = { ...newMonster, id: crypto.randomUUID(), createdBy: session?.user?.name };
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
                    <SignInButton />
                    {session && (
                        <Button onClick={() => setAddMonsterOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Monster
                        </Button>
                    )}
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
                                {session && (
                                    <>
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
                                    </>
                                )}
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
