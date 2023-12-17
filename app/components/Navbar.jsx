"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <div className="bg-blue-500 p-4 w-1/5">
        <ul className="space-y-2">
          <li className="p-2 cursor-pointer">
            <Link href="/">Home</Link>
          </li>
          {!user ? null : (
            <>
            <li className="p-2 cursor-pointer">
              <Link href="/profile">Profile</Link>
            </li>
            <li className="p-2 cursor-pointer">
            <Link href="/chatbot">Chatbot</Link> {/* Add this line */}
          </li>
          </>
          )}
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {loading ? null : !user ? (
          <div className="flex items-center">
            <button onClick={handleSignIn} className="p-2 cursor-pointer">
              Login
            </button>
            <button onClick={handleSignIn} className="p-2 cursor-pointer">
              Sign up
            </button>
          </div>
        ) : (
          <div>
            <p>Welcome, {user.displayName}</p>
            <p className="cursor-pointer" onClick={handleSignOut}>
              Sign out
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
