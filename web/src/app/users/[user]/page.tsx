/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface User {
  avatar_url: string;
  bio: string;
  blog: string;
  company: string;
  created_at: string;
  email: string | null;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable: boolean | null;
  html_url: string;
  id: number;
  location: string;
  login: string;
  name: string;
  node_id: string;
  organizations_url: string;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  twitter_username: string | null;
  type: string;
  updated_at: string;
  url: string;
}

export default function User({ params }: { params: { user: string } }) {
  const [user, setUser] = useState<User>();

  const fetchUser = async () => {
    const response = await axios(`https://api.github.com/users/${params.user}`);

    setUser(response.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <p>{user?.name}</p>
      <p>{user?.bio}</p>
      <p>{user?.company}</p>
      <p>{user?.email}</p>
      <p>{user?.twitter_username}</p>
      <p>{user?.followers}</p>
      <img src={user?.avatar_url} />
    </div>
  );
}
