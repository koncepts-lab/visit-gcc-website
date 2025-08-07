'use client';

import Link from 'next/link';
import Banner from '@components/banner/banner';

export default function NotFound() {
  return (
    <>
    
  <div className="block  text-black text-white text-center" style={{marginTop:'200px', height:'70vh'}}>
      <h1 className="display-1 text-black fw-bold pt-5 mt-5">404</h1>
      <p className="lead mb-4 text-black">This page doesn’t exist</p>
      <Link href="/" className="btn btn-outline-light px-4 py-2 border-1 border-black ">
        Back to Home
      </Link>
    </div>    </>
  );
}
