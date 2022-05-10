import React, { useEffect, useState } from 'react';
import { Post } from '../src/components/Post';

const print2aApiHost = "https://print2a.com";
const print2aApiPort = "5757";
const print2aApiEndpoint = `${print2aApiHost}:${print2aApiPort}`;
let count = 0;

const GetLatest = () => {
  const [latest, setLatest] = useState([{title: "LOADING...", tags: "LOADING...", link: "#"}]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      async function getLatest() {
        const req = await fetch(`${print2aApiEndpoint}/LatestProjects`);
        const res = await req.json();
        setLatest(res);
      }
      if (count <= 0) {
        getLatest();
        count = 1;
      }
    }
  }, [latest]);
  return (
    latest.map((file, index) => (
    <Post
      key={index}
      audio={{ silent: index > 4 }}
      data={{ ...file, id: 'file' + index }}
    />
    ))
  )
};
export default GetLatest;
