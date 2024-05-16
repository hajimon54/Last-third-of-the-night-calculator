import Image from "next/image";
import Clock from "/app/components/clock.js";

export default function Home() {
  return (
    <main>
      <header class="bg-white shadow rounded-md">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>

      <div className="card">
        <h3>Last third of the night starts at: </h3>
        <Clock />
      </div>
    </main>
  );
}
