"use client";
export default function User({ searchId, setSearchId }) {
  return (
    <div className="flex justify-center">
      <div className="bg-slate-300 w-1/2 p-2 shadow-lg rounded-md">
        <form>
          <label className="text-xl mr-2" htmlFor="userid">
            User Id :
          </label>
          <input
            className="border border-black p-1 rounded-md"
            id="userid"
            placeholder="user search id"
            type="text"
            value={searchId}
            onChange={(e) => {
              setSearchId(e.target.value);
            }}
          />
        </form>
      </div>
    </div>
  );
}
