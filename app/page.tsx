import React from "react";

type Data = {
  latititude: number;
  longitude: number;
  timezone: string;
  elevation: number;
};

async function getData() {
  console.log(process.env.NEXT_APP_OPENWEATHER_API);
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=Prague&limit=5&appid=${process.env.NEXT_APP_OPENWEATHER_API}`
  );
  return res.json();
}

function Index() {
  return (
    <form action="" className="flex flex-col w-1/2 m-auto">
      <input
        type="text"
        placeholder="Enter a name"
        className="outline-none m-2 p-2 border border-gray-400"
      />
      <input
        type="text"
        placeholder="Enter a text"
        className="outline-none m-2 p-2 border border-gray-400"
      />
      <div className="m-auto">
        <button className="bg-blue-500 m-2 p-2 text-white rounded-md">
          Save text
        </button>
      </div>
    </form>
  );
}

export default Index;