import { useRouter } from "next/navigation";
import React from "react";

import PocketBase from "pocketbase";
import Task from "../components/Task";
import InsertTask from "../components/InsertTask";

async function getData() {
  const client = new PocketBase("http://127.0.0.1:8090");
  const records = await client.records.getFullList("post", 200, {
    sort: "-created",
  });
  return records;
}

async function Index() {
  const data = await getData();
  console.log(data);

  return (
    <div className="">
      <div className="grid grid-cols-4 gap-4 content-end">
        {data.map((data) => (
          <Task
            key={data.id}
            name={data.name}
            text={data.text}
            id={data.id}
            created={data.created}
          />
        ))}
      </div>
      <div>
        <InsertTask />
      </div>
    </div>
  );
}

export default Index;
