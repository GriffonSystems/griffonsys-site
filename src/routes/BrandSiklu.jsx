import React from "react";
import { Helmet } from "react-helmet";

export default function BrandSiklu() {
  return (
    <>
      <Helmet>
        <title>Siklu Wireless Backhaul | Griffon Systems</title>
        <meta
          name="description"
          content="Siklu millimeter-wave wireless backhaul and point-to-point links deployed by Griffon Systems across municipal, commercial, and industrial environments."
        />
      </Helmet>

      <div className="container py-16">
        <h1 className="text-4xl font-bold mb-6">Siklu Wireless Solutions</h1>
        <p className="text-lg max-w-3xl">
          Griffon Systems designs and installs Siklu 60GHz (Terragraph) and 80GHz 
          wireless backhaul links engineered for multi-gigabit municipal camera 
          networks, manufacturing campuses, and secure long-distance connectivity.
        </p>
      </div>
    </>
  );
}
