"use client";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";

interface MonsterDetailDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    monster: { id: string; name: string; photo: string; description: string };
}

export function MonsterDetailDialog({
    open,
    onOpenChange,
    monster,
}: MonsterDetailDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{monster.name}</AlertDialogTitle>
                </AlertDialogHeader>
                <Card className="w-full">
                    <CardContent className="flex flex-col items-center">
                        <img
                            src={monster.photo}
                            alt={monster.name}
                            className="rounded-md mb-4 w-full h-48 object-cover"
                        />
                        <AlertDialogDescription>{monster.description}</AlertDialogDescription>
                    </CardContent>
                </Card>
            </AlertDialogContent>
        </AlertDialog>
    );
}
