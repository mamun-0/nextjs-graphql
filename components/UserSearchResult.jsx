"use client";

import { useState } from "react";
import User from "./Forms/User";
import UserSearchGQL from "./UserSearchGQL";

export default function UserSearchResult() {
  const [searchId, setSearchId] = useState("");
  return (
    <div className="mt-10">
      {/* userid input form */}
      <User searchId={searchId} setSearchId={setSearchId} />
      <UserSearchGQL searchId={searchId} />
    </div>
  );
}
