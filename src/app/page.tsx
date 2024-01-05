"use client";
import { cube } from "./cube";
import { line } from "./line";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div>
          <h1 className="text-center">3D Web</h1>
        </div>
        <div>
          {cube()}
        </div>
        <div>
          {line()}
        </div>
      </div>
    </main>
  )
}
