"use client";
import { gql, useQuery } from "urql";

const UserQuery = gql`
  query Users(
    $id: String
    $searchKeyword: String
    $orderBy: String
    $orderType: String
    $offset: Int
    $first: Int
    $startDate: Date
    $endDate: Date
    $gender: String
    $status: Boolean
  ) {
    users(
      id: $id
      searchKeyword: $searchKeyword
      orderBy: $orderBy
      orderType: $orderType
      offset: $offset
      first: $first
      startDate: $startDate
      endDate: $endDate
      gender: $gender
      status: $status
    ) {
      edgeCount
      totalCount
      edges {
        node {
          id
          name
          firstName
          lastName
          username
          email
          cpf
          totalBalance
          userpix {
            pixKey
            pixKeyType
          }
          company {
            name
          }
          userprofile {
            image
            dob
            gender {
              id
              nameEn
              namePt
            }
          }
          userwalletSet(isActive: true) {
            edges {
              node {
                id
                isActive
                initialBalance
                availableBalance
                benefit {
                  amount
                  benefit {
                    id
                    image
                    nameEn
                    namePt
                    colorCode
                  }
                }
              }
            }
          }
          transactionSet(lastTransactions: 1) {
            edges {
              node {
                id
                amount
              }
            }
          }
          isActive
        }
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

  // const { id, firstName, age, company } = data.user;
  try {
    const { firstName, lastName, company, id } = data?.users?.edges[0]?.node;
    return (
      <div>
        <div className="flex justify-center flex-col items-center">
          <div className="bg-slate-200 shadow-xl w-1/2 p-4 rounded mt-4">
            <div>
              <p className="text-xl">ID : {id}</p>
              <p className="text-xl">
                Name : {firstName} {lastName}
              </p>
              <p className="text-xl">
                Company Name : {company ? company : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return HandleErrOrLoading("Something Went Wrong 👎");
  }
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
