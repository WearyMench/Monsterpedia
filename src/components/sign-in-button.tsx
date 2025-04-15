
"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SignInButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User"} />
          <AvatarFallback>{session.user?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <span>{session.user?.name}</span>
        <Button variant="outline" size="sm" onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button size="sm" onClick={() => signIn("google")}>
      Sign In with Google
    </Button>
  );
}

    