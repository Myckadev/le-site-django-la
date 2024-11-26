import React from "react";
import {Outlet} from "react-router-dom";

export function HomePage() {
  return (
    <div className="bg-neonPurple h-screen flex flex-col items-center justify-center">
      {
        <Outlet /> ||
          <>
              <h1 className="text-neonGreen text-5xl font-bold">Bienvenue sur le site Cyberpunk!</h1>
              <p className="text-neonYellow text-xl mt-4">
                  Explorez nos produits futuristes.
              </p>
          </>
      }
    </div>
  )
}