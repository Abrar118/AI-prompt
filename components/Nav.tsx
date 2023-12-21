"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";
import "@styles/nav.css";

const Nav = () => {
  const {data: session} = useSession();
  const [providers, setProviders] = useState(null) as any;
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };

    fetchProviders();
  }, []);

  return (
    <nav className="navbar">
      <Link href={"/"} className="navbar-logo-container">
        <Image
          src={"/assets/images/logo.svg"}
          alt="LogoMain"
          width={30}
          height={30}
          className="logo-main"
        />
        <p className="logo-text">Prompt Finder</p>
      </Link>

      <div className="desktop-navigation">
        {session?.user ? (
          <div className="desktop-links">
            <Link href={"/create-post"} className="black_btn">
              Crete Post
            </Link>

            <button
              type="button"
              className="outline_btn"
              onClick={() => signOut()}
            >
              Sign Out
            </button>

            <Link href={"/profile"}>
              <Image
                src={session?.user.image as string}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile picture"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  key={provider.name}
                  type="button"
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      <div className="mobile-navigation">
        {session?.user ? (
          <div className="mobile-links">
            <Image
              src={session?.user.image as string}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile picture"
              onClick={() => {
                setDropdown((prev) => !prev);
              }}
            />

            {dropdown && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => {
                    setDropdown(false);
                  }}
                >
                  Profile
                </Link>

                <Link
                  href={"/create-post"}
                  className="dropdown_link"
                  onClick={() => {
                    setDropdown(false);
                  }}
                >
                  Create Post
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setDropdown(false);
                    signOut();
                  }}
                  className="mobile-button black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  key={provider.name}
                  type="button"
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
