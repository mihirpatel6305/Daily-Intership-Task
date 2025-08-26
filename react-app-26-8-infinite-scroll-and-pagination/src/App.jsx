import { useInfiniteQuery } from "@tanstack/react-query";
import getData from "./api/getData";
import { useEffect, useRef } from "react";

function App() {
  const lastDiv = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["data"],
      queryFn: getData,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    });

  if (status === "loading")
    return (
      <p className="text-center text-gray-500 text-lg mt-10">Loading...</p>
    );

  if (status === "error")
    return (
      <p className="text-center text-red-500 text-lg mt-10">
        Error fetching data
      </p>
    );

  useEffect(() => {
    if (!lastDiv.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    observer.observe(lastDiv.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
  return (
    <div className="max-w-3xl mx-auto p-4">
      {data?.pages?.map((page, pageIndex) => (
        <div key={pageIndex} className="space-y-4">
          {page.map((repo) => (
            <div
              key={repo.id}
              className="flex flex-col sm:flex-row items-start sm:items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow mt-3 min-h-96"
            >
              <img
                src={repo.owner.avatar_url}
                alt={repo.owner.login}
                className="w-12 h-12 rounded-full mr-4 mb-2 sm:mb-0"
              />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800">
                  {repo.name}
                </h4>
                <p className="text-gray-600 text-sm">
                  {repo.description || "No description"}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  ⭐ {repo.stargazers_count} | Forks: {repo.forks_count}
                </p>
                <a
                  href={repo.html_url}
                  target="_blank"
                  className="text-blue-500 hover:underline text-sm mt-1 inline-block"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div ref={lastDiv} className="flex justify-center mt-6">
        {isFetchingNextPage ? (
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded cursor-not-allowed">
            Loading...
          </button>
        ) : hasNextPage ? (
          <button
            onClick={() => fetchNextPage()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Load More
          </button>
        ) : (
          <div className="text-gray-500">No More Pages</div>
        )}
      </div>
    </div>
  );
}

export default App;
