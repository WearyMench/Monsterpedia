"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SignInButton() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { data: session } = useSession();

  const handleSignIn = async () => {
    try {
      if (username === "user" && password === "password") {
        // Mock authentication success
        const mockSession = {
          user: {
            name: "User",
            email: "user@example.com",
            image: null,
          },
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Expires in 24 hours
        };
        // Use signIn with a provider that doesn't exist to trigger the session update
        signIn("credentials", mockSession);
      } else {
        setError("Invalid username or password");
        toast({
          variant: "destructive",
          title: "Sign-in failed",
          description: "Invalid username or password.",
        });
      }
    } catch (e: any) {
      setError(e.message);
      toast({
        variant: "destructive",
        title: "Sign-in failed",
        description: e.message || "An error occurred while trying to sign in.",
      });
    }
  };

  const handleSignOut = async () => {
    signOut();
  };

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User"} />
          <AvatarFallback>{session.user?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <span>{session.user?.name}</span>
        <Button variant="outline" size="sm" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button size="sm" onClick={handleSignIn}>
        Sign In
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
