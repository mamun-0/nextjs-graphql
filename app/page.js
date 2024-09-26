"use client";
import { Provider } from "urql";
import UserSearchResult from "@/components/UserSearchResult";
import client from "@/graphQLClient";
export default function Home() {
  return (
    <Provider value={client}>
      <UserSearchResult />
    </Provider>
  );
}
