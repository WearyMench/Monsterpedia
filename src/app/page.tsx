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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
        photo: "/goblin.png",
        description: "A small, mischievous creature."
    },
    {
        id: "2",
        name: "Dragon",
        photo: "/dragon.png",
        description: "A large, fire-breathing reptile."
    },
  {
    id: "3",
    name: "Ogre",
    photo: "/ogre.png",
    description: "A big and ugly creature."
  },
  {
    id: "4",
    name: "Troll",
    photo: "/troll.png",
    description: "A very big and ugly creature."
  },
  {
    id: "5",
    name: "Sprite",
    photo: "/sprite.png",
    description: "A small fairy."
  },
  {
    id: "6",
    name: "Gorgon",
    photo: "/gorgon.png",
    description: "A snake-haired monster."
  },
  {
    id: "7",
    name: "Centaur",
    photo: "/centaur.png",
    description: "A half-man, half-horse creature."
  },
  {
    id: "8",
    name: "Harpy",
    photo: "/harpy.png",
    description: "A bird-woman creature."
  },
  {
    id: "9",
    name: "Phoenix",
    photo: "/phoenix.png",
    description: "A fire bird creature."
  },
  {
    id: "10",
    name: "Basilisk",
    photo: "/basilisk.png",
    description: "A snake creature."
  },
  {
    id: "11",
    name: "Hydra",
    photo: "/hydra.png",
    description: "A multi-headed serpent."
  },
  {
    id: "12",
    name: "Cerberus",
    photo: "/cerberus.png",
    description: "A multi-headed dog."
  },
    {
        id: "13",
        name: "Minotaur",
        photo: "/minotaur.png",
        description: "A creature with the head of a bull and the body of a man."
    },
    {
        id: "14",
        name: "Siren",
        photo: "/siren.png",
        description: "A beautiful but dangerous creature that lures sailors with its enchanting voice."
    },
    {
        id: "15",
        name: "Cyclops",
        photo: "/cyclops.png",
        description: "A giant with a single eye in the middle of its forehead."
    },
    {
        id: "16",
        name: "Chimera",
        photo: "/chimera.png",
        description: "A fire-breathing monster with the head of a lion, a goat's body, and a serpent's tail."
    },
    {
        id: "17",
        name: "Griffin",
        photo: "/griffin.png",
        description: "A legendary creature with the body, tail, and back legs of a lion; the head and wings of an eagle; and an eagle's talons as its front feet."
    },
    {
        id: "18",
        name: "Hippogriff",
        photo: "/hippogriff.png",
        description: "A legendary creature with the front half of an eagle and the hind half of a horse."
    },
    {
        id: "19",
        name: "Kraken",
        photo: "/kraken.png",
        description: "A legendary sea monster of giant size and cephalopod appearance."
    },
    {
        id: "20",
        name: "Leviathan",
        photo: "/leviathan.png",
        description: "A sea monster referenced in the Bible."
    },
    {
        id: "21",
        name: "Roc",
        photo: "/roc.png",
        description: "A legendary enormous bird of prey."
    },
    {
        id: "22",
        name: "Thunderbird",
        photo: "/thunderbird.png",
        description: "A legendary creature in certain North American indigenous cultures' history and culture. It is considered a supernatural being of power and strength."
    },
    {
      id: "23",
      name: "Grendel",
      photo: "/grendel.png",
      description: "A monstrous creature from the epic poem Beowulf."
  },
  {
      id: "24",
      name: "Medusa",
      photo: "/medusa.png",
      description: "A Gorgon with snakes for hair whose gaze could turn men to stone."
  },
  {
      id: "25",
      name: "Banshee",
      photo: "/banshee.png",
      description: "A female spirit in Irish folklore whose wails foretell death."
  },
  {
      id: "26",
      name: "Yeti",
      photo: "/yeti.png",
      description: "A large, ape-like creature said to inhabit the Himalayan region."
  },
  {
      id: "27",
      name: "Vampire",
      photo: "/vampire.png",
      description: "A mythical being who subsists by feeding on the blood of the living."
  },
  {
      id: "28",
      name: "Werewolf",
      photo: "/werewolf.png",
      description: "A person who transforms into a wolf-like creature during a full moon."
  },
  {
      id: "29",
      name: "Zombie",
      photo: "/zombie.png",
      description: "A reanimated corpse, often depicted as feeding on human flesh."
  },
  {
      id: "30",
      name: "Mummy",
      photo: "/mummy.png",
      description: "A deceased human or animal whose body has been preserved."
  },
  {
      id: "31",
      name: "Ghoul",
      photo: "/ghoul.png",
      description: "A monstrous humanoid creature that feeds on corpses."
  },
  {
      id: "32",
      name: "Imp",
      photo: "/imp.png",
      description: "A small, mischievous demon or fairy."
  },
  {
    id: "33",
    name: "Salamander",
    photo: "/salamander.png",
    description: "A mythical creature resembling a lizard, believed to live in fire."
  },
  {
    id: "34",
    name: "Gargoyle",
    photo: "/gargoyle.png",
    description: "A grotesque carved human or animal face or figure projecting from the gutter of a building."
  },
  {
    id: "35",
    name: "Will-o'-the-Wisp",
    photo: "/will-o-the-wisp.png",
    description: "A mysterious light seen by travelers at night, especially over bogs."
  },
  {
    id: "36",
    name: "Baba Yaga",
    photo: "/baba-yaga.png",
    description: "A supernatural being (or one of a trio of sisters with the same name) who appears as a deformed and/or ferocious-looking old woman in Slavic folklore."
  },
  {
    id: "37",
    name: "Leshy",
    photo: "/leshy.png",
    description: "A tutelary deity of the forests in Slavic mythology."
  },
  {
    id: "38",
    name: "Domovoy",
    photo: "/domovoy.png",
    description: "A household spirit in Slavic folklore."
  },
  {
    id: "39",
    name: "Vodyanoy",
    photo: "/vodyanoy.png",
    description: "A male water spirit in Slavic mythology."
  },
  {
    id: "40",
    name: "Rusalka",
    photo: "/rusalka.png",
    description: "A female water spirit in Slavic mythology."
  },
    {
        id: "41",
        name: "Dryad",
        photo: "/dryad.png",
        description: "A tree nymph or tree spirit in Greek mythology."
    },
    {
        id: "42",
        name: "Satyr",
        photo: "/satyr.png",
        description: "A creature that is part man and part goat."
    },
    {
        id: "43",
        name: "Sphinx",
        photo: "/sphinx.png",
        description: "A mythical creature with the head of a human and the body of a lion."
    },
    {
        id: "44",
        name: "Bicorn",
        photo: "/bicorn.png",
        description: "A mythical creature similar to a unicorn, but with two horns."
    },
    {
        id: "45",
        name: "Questing Beast",
        photo: "/questing-beast.png",
        description: "A monster from Arthurian legend with the head and neck of a serpent, the body of a leopard, the haunches of a lion, and the feet of a hart."
    },
    {
        id: "46",
        name: "Kelpie",
        photo: "/kelpie.png",
        description: "A shape-shifting water spirit inhabiting the lochs and pools of Scotland."
    },
    {
        id: "47",
        name: "Manticore",
        photo: "/manticore.png",
        description: "A Persian legendary creature similar to the Egyptian sphinx. It has the body of a red lion, a human head with three rows of sharp teeth, and a trumpet-like voice."
    },
    {
        id: "48",
        name: "Pegasus",
        photo: "/pegasus.png",
        description: "One of the best known creatures in Greek mythology. He is a winged divine stallion usually depicted as pure white."
    },
    {
        id: "49",
        name: "Wyvern",
        photo: "/wyvern.png",
        description: "A dragon-like creature with two legs and a barbed tail."
    },
    {
        id: "50",
        name: "Amarok",
        photo: "/amarok.png",
        description: "A giant wolf in Inuit mythology, said to hunt anyone foolish enough to venture out alone at night."
    },
    {
        id: "51",
        name: "Unicorn",
        photo: "/unicorn.png",
        description: "A mythical creature usually depicted as a white horse with a single, pointed horn projecting from its forehead."
    },
    {
        id: "52",
        name: "Nymph",
        photo: "/nymph.png",
        description: "A mythological spirit of nature imagined as a beautiful maiden inhabiting rivers, woods, or other locations."
    },
    {
        id: "53",
        name: "Salamander",
        photo: "/salamander.png",
        description: "A mythical creature often depicted as a lizard-like animal that lives in fire or has an affinity with fire."
    },
    {
        id: "54",
        name: "Baku",
        photo: "/baku.png",
        description: "A Japanese supernatural being that devours nightmares."
    },
    {
        id: "55",
        name: "Grootslang",
        photo: "/grootslang.png",
        description: "A legendary creature from South African folklore, said to be a primordial being with the features of an elephant and a serpent."
    },
    {
        id: "56",
        name: "Wendigo",
        photo: "/wendigo.png",
        description: "A malevolent, cannibalistic spirit or creature from the folklore of the First Nations Algonquin people."
    },
    {
        id: "57",
        name: "Taniwha",
        photo: "/taniwha.png",
        description: "A supernatural being in Māori culture, often taking the form of a mythical sea creature or reptile."
    },
    {
        id: "58",
        name: "Ahuitzotl",
        photo: "/ahuitzotl.png",
        description: "A mythical creature in Aztec mythology, described as a dog-like creature with human-like hands, a monkey's body, and a long tail ending in a hand."
    },
    {
        id: "59",
        name: "Yacumama",
        photo: "/yacumama.png",
        description: "A legendary giant serpent said to inhabit the Amazon River basin."
    },
    {
        id: "60",
        name: "Tarasque",
        photo: "/tarasque.png",
        description: "A fearsome legendary dragon-like creature from French folklore, said to have terrorized the region of Tarascon."
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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [isSignUp, setIsSignUp] = useState(false);
    const [signUpOpen, setSignUpOpen] = useState(false);
  const [users, setUsers] = useState<{ username: string; password: string; }[]>([]);
  const [signInDialogOpen, setSignInDialogOpen] = useState(false);

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
        const monsterToAdd = { ...newMonster, id: crypto.randomUUID(), createdBy: username };
        setMonsters([...monsters, monsterToAdd]);
        setAddMonsterOpen(false);
    };

    const handleEditMonster = (updatedMonster: Monster) => {
        setMonsters(
            monsters.map((monster) =>
                monster.id === updatedMonster.id ? { ...updatedMonster, createdBy: username } : monster
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
  
  const handleSignIn = () => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      setLoggedIn(true);
      setLoginError(null);
      setSignInDialogOpen(false); // Close the sign-in dialog
    } else {
      setLoginError('Invalid username or password');
      setUsername('');
      setPassword('');
    }
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const handleSignUp = () => {
    // Check if the username already exists
    const userExists = users.some((u) => u.username === username);
    if (userExists) {
      setLoginError('Username already exists. Please sign in.');
      setIsSignUp(false);
      setSignUpOpen(false); // Close the sign-up dialog
    } else if (username && password) {
      // Add the new user to the users array
      setUsers([...users, { username, password }]);
      setLoggedIn(true);
      setLoginError(null);
      setSignUpOpen(false); // Close the sign-up dialog
    } else {
      setLoginError('Username and password are required');
    }
  };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Monsterpedia</h1>
                <div className="flex gap-2 items-center">
                  {!loggedIn ? (
                      <>
                        <Button size="sm" onClick={() => setSignInDialogOpen(true)}>
                          Sign In
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => setSignUpOpen(true)}>
                            Sign Up
                        </Button>
                        {loginError && <p className="text-red-500">{loginError}</p>}
                      </>
                    ) : (
                      <>
                        <span>Welcome, {username}</span>
                        <Button size="sm" onClick={handleSignOut}>
                          Sign Out
                        </Button>
                        <Button onClick={() => setAddMonsterOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Monster
                        </Button>
                      </>
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
                                {loggedIn && (
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
                     {totalPages > 5 ? (
                        <Select value={String(currentPage)} onValueChange={(value) => handlePageChange(Number(value))}>
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Select page..." />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <SelectItem key={page} value={String(page)}>
                                        {page}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ) : (
                        <span>{currentPage} / {totalPages}</span>
                    )}
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

          <AlertDialog open={signUpOpen} onOpenChange={setSignUpOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sign Up</AlertDialogTitle>
                <AlertDialogDescription>
                  Enter a username and password to create an account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sign-up-name" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="sign-up-name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sign-up-password" className="text-right">
                    Password
                  </Label>
                  <Input
                    type="password"
                    id="sign-up-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                {loginError && <p className="text-red-500">{loginError}</p>}
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSignUp}>Sign Up</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog open={signInDialogOpen} onOpenChange={setSignInDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sign In</AlertDialogTitle>
                <AlertDialogDescription>
                  Enter your username and password to sign in.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sign-in-name" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="sign-in-name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sign-in-password" className="text-right">
                    Password
                  </Label>
                  <Input
                    type="password"
                    id="sign-in-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                {loginError && <p className="text-red-500">{loginError}</p>}
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSignIn}>Sign In</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
    );
}
