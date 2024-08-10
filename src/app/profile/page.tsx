"use client";

import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const font = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "600"],
});

const Profile = () => {
  // State to store the bio value
  const [bio, setBio] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Handle change event to update the bio state
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  // Initialize bio after component mounts
  useEffect(() => {
    setBio("Previous bio"); // Set the initial bio value here
    setIsMounted(true); // Ensure the component is mounted
  }, []);

  return (
    <form
      className={cn(
        "w-full max-w-3xl flex flex-col items-start justify-start pb-10",
        font.className
      )}
    >
      <div className="h-[10vh]">
        <h2 className="text-3xl font-semibold text-primary-foreground">
          Profile
        </h2>
        <p className="text-gray-300 pt-2">This is how you will see on your site.</p>
      </div>
      <div className="border-b border-gray-300 my-4 w-full"></div>
      <div className="h-[15vh] w-full">
        <h2 className="text-xl text-primary-foreground">Username</h2>
        <Input type="text" placeholder="name" className="my-2" name="username" />
      </div>
      <div className="h-[15vh] w-full">
        <h2 className="text-xl text-primary-foreground">Email</h2>
        <Input type="email" placeholder="email" className="my-2" name="useremail" />
      </div>
      <div className="h-[20vh] w-full">
        <h2 className="text-xl text-primary-foreground">Bio</h2>
        {isMounted && (
          <Textarea
            className="w-full rounded-md max-h-20"
            rows={2}
            name="bio"
            placeholder="I am a recruiter"
            value={bio}
            onChange={handleBioChange} // Attach the change handler
          />
        )}
      </div>
      <Button type="submit" className="bg-secondary hover:bg-secondary/80">
        Update Profile
      </Button>
    </form>
  );
};

export default Profile;
