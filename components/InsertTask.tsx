"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import PocketBase from "pocketbase";

async function newPost(name: string, text: string, refresh: any) {
  const client = new PocketBase("http://127.0.0.1:8090");
  const data = { name, text };
  const record = await client.records.create("post", data);

  refresh();
}

type FormData = {
  text: string;
  name: string;
};

function InsertTask() {
  const router = useRouter();
  const { register, setValue, handleSubmit, watch } = useForm<FormData>();
  const onSubmit = handleSubmit(async (formData) => {
    await newPost(formData.name, formData.text, router.refresh);
    setValue("name", "");
    setValue("text", "");
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col w-1/2 m-auto">
      <input
        {...register("name", { required: true })}
        type="text"
        placeholder="Enter a name"
        className="outline-none m-2 p-2 border border-gray-400"
      />
      <input
        {...register("text", { required: true })}
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

export default InsertTask;
