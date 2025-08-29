let posts = [
  // { id: 1, title: "First Post", body: "This is the first post." },
  // { id: 2, title: "Second Post", body: "This is the second post." },
];

// Helper to simulate network latency and random failure
function simulateNetworkCall(response) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.1; // 10% chance to fail
      if (shouldFail) reject(new Error("Network Error!"));
      else resolve(response);
    }, 1000 + Math.random() * 1000); // 1–2s delay
  });
}

export const fetchPosts = () => simulateNetworkCall([...posts]);

export const addPost = (newPost) => {
  const post = { ...newPost, id: Date.now() };
  return simulateNetworkCall(post).then((res) => {
    posts.push(res); // ✅ only update after success
    return res;
  });
};

export const updatePost = ({ id, editedData }) => {
  return simulateNetworkCall({ ...editedData }).then((updated) => {
    posts = posts.map((p) => (p.id === id ? { ...p, ...updated } : p));
    return updated;
  });
};

export const deletePost = (id) => {
  return simulateNetworkCall({ success: true }).then(() => {
    posts = posts.filter((p) => p.id !== id);
    return { success: true };
  });
};
