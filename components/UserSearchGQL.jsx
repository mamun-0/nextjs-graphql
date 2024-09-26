"use client";
import { gql, useQuery } from "urql";

const UserQuery = gql`
  query ($id: String!) {
    user(id: $id) {
      id
      firstName
      age
      company {
        name
        description
      }
    }
  }
`;

export default function UserSearchGQL({ searchId }) {
  const [result, reexecuteQuery] = useQuery({
    query: UserQuery,
    variables: { id: searchId },
  });
  const { data, fetching, error } = result;

  if (!searchId) return HandleErrOrLoading("Nothing Search Nothing Found! 😢");
  if (fetching) return HandleErrOrLoading("Loading... 🔃");
  if (error) return HandleErrOrLoading("Something Went Wrong 👎");

  const { id, firstName, age, company } = data.user;

  return (
    <div>
      <div className="flex justify-center flex-col items-center">
        <div className="bg-slate-200 shadow-xl w-1/2 p-4 rounded mt-4">
          <div>
            <p className="text-xl">ID : {id}</p>
            <p className="text-xl">Name : {firstName}</p>
            <p className="text-xl">Age : {age}</p>
            <p className="text-xl">Company Name : {company.name}</p>
            <p className="text-xl">Description : {company.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HandleErrOrLoading(msg) {
  return (
    <div>
      <div className="flex justify-center flex-col items-center">
        <div className="bg-slate-200 shadow-xl w-1/2 p-4 rounded mt-4">
          <div>
            <h2 className="text-xl">{msg}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
