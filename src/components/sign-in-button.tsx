
"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast"; // Import useToast hook

export function SignInButton() {
  const { data: session } = useSession();
  const { toast } = useToast(); // Get the toast function

  const handleSignIn = async () => {
    try {
      await signIn("google");
    } catch (error: any) {
      console.error("Sign-in error:", error);
      toast({
        variant: "destructive",
        title: "Sign-in failed",
        description:
          error.message || "An error occurred while trying to sign in.",
      });
    }
  };

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
    <Button size="sm" onClick={handleSignIn}>
      Sign In with Google
    </Button>
  );
}
