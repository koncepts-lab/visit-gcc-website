"use client";  // Add this directive at the top
import React from 'react';
import { useParams } from 'next/navigation'; // Use next/navigation instead of next/router

export default function Page() {
  const params = useParams(); // useParams to get the slug
  const slug = params.slug;

  return (
    <div>
      <h1>Page with slug: {slug}</h1>
      2555555
    </div>
  );
}
