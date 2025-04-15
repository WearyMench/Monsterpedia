"use client";

import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditMonsterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  monster: { id: string; name: string; photo: string; description: string };
  onEditMonster: (monster: {
    id: string;
    name: string;
    photo: string;
    description: string;
  }) => void;
}

export function EditMonsterDialog({
  open,
  onOpenChange,
  monster,
  onEditMonster,
}: EditMonsterDialogProps) {
  const [name, setName] = useState(monster.name);
  const [photo, setPhoto] = useState(monster.photo);
  const [description, setDescription] = useState(monster.description);

  useEffect(() => {
    if (monster) {
      setName(monster.name);
      setPhoto(monster.photo);
      setDescription(monster.description);
    }
  }, [monster]);

  const handleEdit = () => {
    onEditMonster({ id: monster.id, name, photo, description });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Monster</AlertDialogTitle>
          <AlertDialogDescription>
            Edit the details for the monster.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="photo" className="text-right">
              Photo URL
            </Label>
            <Input
              id="photo"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleEdit}>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
