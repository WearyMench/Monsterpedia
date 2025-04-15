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
        photo: "https://th.bing.com/th/id/R.6287a313888bdad6ef83b370c5fadea7?rik=8WG4WM%2b2uZ%2b%2bHQ&riu=http%3a%2f%2fimg05.deviantart.net%2f1c21%2fi%2f2014%2f210%2f7%2f2%2fgoblin_by_aaronflorento-d7srkrg.jpg&ehk=o5bYZPUgufr2yqOVoGZ8NRdEvSCZHCmxicTB6Nn7Xc8%3d&risl=&pid=ImgRaw&r=0",
        description: "A small, mischievous creature."
    },
    {
        id: "2",
        name: "Dragon",
        photo: "https://i.etsystatic.com/40277972/r/il/802088/4606144863/il_fullxfull.4606144863_4vx9.jpg",
        description: "A large, fire-breathing reptile."
    },
  {
    id: "3",
    name: "Ogre",
    photo: "https://i.pinimg.com/originals/35/d3/05/35d305e6cc776ef738ea8272ed68738e.jpg",
    description: "A big and ugly creature."
  },
  {
    id: "4",
    name: "Troll",
    photo: "https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2022/12/02/troll-2-netflix.jpg",
    description: "A very big and ugly creature."
  },
  {
    id: "5",
    name: "Sprite",
    photo: "https://cdn.pixabay.com/photo/2023/03/06/16/59/sprite-7833913_1280.png",
    description: "A small fairy."
  },
  {
    id: "6",
    name: "Gorgon",
    photo: "https://as1.ftcdn.net/v2/jpg/05/68/92/90/1000_F_568929057_lNrA7Ur0jYkGiMmOeGqmBEaHzGWgHrFQ.jpg",
    description: "A snake-haired monster."
  },
  {
    id: "7",
    name: "Centaur",
    photo: "https://i.pinimg.com/originals/76/e1/21/76e121c2774bf362edb348f562012302.jpg",
    description: "A half-man, half-horse creature."
  },
  {
    id: "8",
    name: "Harpy",
    photo: "https://i.pinimg.com/736x/6f/46/e2/6f46e242927a223cda71af0a7542d299.jpg",
    description: "A bird-woman creature."
  },
  {
    id: "9",
    name: "Phoenix",
    photo: "https://i.etsystatic.com/39938216/r/il/4cd53b/4478579574/il_fullxfull.4478579574_fd3t.jpg",
    description: "A fire bird creature."
  },
  {
    id: "10",
    name: "Basilisk",
    photo: "https://cdna.artstation.com/p/assets/images/images/000/055/992/large/Katelyn-Malmsten-Basilisk.jpg?1399322477",
    description: "A snake creature."
  },
  {
    id: "11",
    name: "Hydra",
    photo: "https://wallpaperaccess.com/full/169714.jpg",
    description: "A multi-headed serpent."
  },
  {
    id: "12",
    name: "Cerberus",
    photo: "https://i.pinimg.com/originals/37/5d/47/375d475d08d3808acff7b4436dbadc28.jpg",
    description: "A multi-headed dog."
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
